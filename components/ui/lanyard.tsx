"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The real BINUS student card on a drawn lanyard. The card is a photo (ID numbers covered);
 * the strap, buckle, ring and hook are a few flat shapes.
 *
 * The server renders it hanging still, which is all phones, reduced motion and no-JS get.
 * On desktop with a fine pointer it upgrades after mount: the strap becomes a short rope
 * simulation and the card can be dragged and swung. Positions are written straight to the
 * DOM through refs, and the frame loop only runs while something is moving.
 */

const CARD_W = 200;
const CARD_H = 126; // 1000 × 631 photo
const HOLDER_PAD = 7;
const HOLDER_W = CARD_W + HOLDER_PAD * 2;
const TAB_H = 14;
const HARDWARE_H = 76;
const STRAP_W = 14;

const POINTS = 10;
const GRAVITY = 0.5; // px per step², at 60 steps a second
const DAMPING = 0.975;
const ITERATIONS = 12;
const END_INV_MASS = 0.3; // the card is heavier than the strap
const MAX_TWIST = 25; // degrees of rotateY from sideways speed
const MAX_TILT = 1.2; // radians (about 69°)
const MIN_REACH = 0.6; // while dragging, the card stays at least this share of the strap from the anchor
const MIN_DROP = 0.3; // ...and at least this share of the strap below it, since a real strap can't hold it up
const MAX_SPEED = 11; // px per step; caps a fling so a swing tops out around horizontal
const STEP_MS = 1000 / 60;

/** Desktop upgrade; matches the xl breakpoint where the hanging version is shown. */
const LIVE_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1280px)";

type Point = { x: number; y: number; px: number; py: number };

function restPoints(anchorX: number, segment: number): Point[] {
  return Array.from({ length: POINTS }, (_, i) => ({ x: anchorX, y: i * segment, px: anchorX, py: i * segment }));
}

/** Two strands that start apart at the top and meet at the card end, offset along the rope's normal. */
function strandPaths(points: Point[], spread: number): [string, string] {
  const last = points.length - 1;
  const build = (side: number) => {
    const pts = points.map((p, i) => {
      // The top stays level with the section edge however the rope swings.
      if (i === 0) return { x: p.x + side * spread, y: p.y };
      const a = points[Math.max(0, i - 1)];
      const b = points[Math.min(last, i + 1)];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const offset = side * spread * (1 - i / last);
      // Normal chosen so a hanging rope offsets along x with the same sign as the top point.
      return { x: p.x + (dy / len) * offset, y: p.y + (-dx / len) * offset };
    });
    // A short vertical lead-in keeps the strap's cut end horizontal, tucked against the section's top hairline.
    let d = `M${pts[0].x.toFixed(1)} ${(pts[0].y - 3).toFixed(1)} L${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    d += ` L${pts[last].x.toFixed(1)} ${pts[last].y.toFixed(1)}`;
    return d;
  };
  return [build(-1), build(1)];
}

function pendantTransform(x: number, y: number, angle: number, twist: number) {
  return `translate(${(x - HOLDER_W / 2).toFixed(2)}px, ${y.toFixed(2)}px) rotate(${angle.toFixed(4)}rad) perspective(900px) rotateY(${twist.toFixed(2)}deg)`;
}

type LanyardProps = {
  /** Length of the strap above the buckle, in px. */
  strap: number;
  /** Width of the box the strap hangs in; the anchor is its centre. */
  width?: number;
  /** Allow the desktop upgrade (dragging and swinging). */
  interactive?: boolean;
  /** The processed card photo (1000 × 631). */
  src: string;
  alt: string;
};

export function Lanyard({ strap, width = HOLDER_W, interactive = false, src, alt }: LanyardProps) {
  const anchorX = width / 2;
  const segment = strap / (POINTS - 1);
  const spread = Math.min(16, width / 2 - STRAP_W);
  const height = strap + HARDWARE_H + TAB_H + CARD_H + HOLDER_PAD * 2;

  const boxRef = useRef<HTMLDivElement>(null);
  const pendantRef = useRef<HTMLDivElement>(null);
  const strandRefs = useRef<(SVGPathElement | null)[]>([]);

  const rest = restPoints(anchorX, segment);
  const [restA, restB] = strandPaths(rest, spread);

  useEffect(() => {
    if (!interactive) return;
    const box = boxRef.current;
    const pendant = pendantRef.current;
    if (!box || !pendant) return;

    const live = window.matchMedia(LIVE_QUERY);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const points = restPoints(anchorX, segment);
    const ropeLength = strap;
    let dragging = false;
    let target = { x: 0, y: 0 };
    let grab = { x: 0, y: 0 };
    let twistSpeed = 0;
    let frame = 0;
    let lastTime = 0;
    let carry = 0;
    let stillSteps = 0;
    let enabled = false;

    const draw = () => {
      const [a, b] = strandPaths(points, spread);
      // Refs are [strand A, its dash, strand B, its dash].
      strandRefs.current.forEach((el, i) => el?.setAttribute("d", i < 2 ? a : b));
      const end = points[POINTS - 1];
      const prev = points[POINTS - 2];
      // Tilt follows the last strap segment while the strap is taut. As it goes slack, it
      // blends toward the anchor-to-card line, so a folded strap never twists the card sideways.
      const segAngle = Math.atan2(-(end.x - prev.x), end.y - prev.y);
      const chordAngle = Math.atan2(-(end.x - anchorX), end.y);
      const taut = Math.max(0, Math.min(1, (Math.hypot(end.x - anchorX, end.y) / strap - 0.6) / 0.35));
      let diff = segAngle - chordAngle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      const angle = Math.max(-MAX_TILT, Math.min(MAX_TILT, chordAngle + diff * taut));
      const twist = Math.max(-MAX_TWIST, Math.min(MAX_TWIST, twistSpeed * 2.2));
      pendant.style.transform = pendantTransform(end.x, end.y, angle, twist);
    };

    const step = () => {
      const end = POINTS - 1;
      for (let i = 1; i < POINTS; i++) {
        const p = points[i];
        let vx = (p.x - p.px) * DAMPING;
        let vy = (p.y - p.py) * DAMPING;
        const speed = Math.hypot(vx, vy);
        if (speed > MAX_SPEED) {
          vx *= MAX_SPEED / speed;
          vy *= MAX_SPEED / speed;
        }
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }
      if (dragging) {
        // The card end follows the pointer, but the strap never stretches, and it is never
        // pushed close enough to the anchor to crumple into a heap.
        const dx = target.x - anchorX;
        const dy = target.y;
        const floor = ropeLength * MIN_DROP;
        let y = Math.max(dy, floor);
        let x = dx;
        const dist = Math.hypot(x, y);
        const k = Math.min(ropeLength, Math.max(ropeLength * MIN_REACH, dist)) / dist;
        x *= k;
        y *= k;
        if (y < floor) {
          y = floor;
          x = Math.sign(x) * Math.sqrt(ropeLength ** 2 - floor ** 2);
        }
        points[end].x = anchorX + x;
        points[end].y = y;
      }
      for (let n = 0; n < ITERATIONS; n++) {
        for (let i = 0; i < end; i++) {
          const a = points[i];
          const b = points[i + 1];
          const wa = i === 0 ? 0 : 1;
          const wb = i + 1 === end ? (dragging ? 0 : END_INV_MASS) : 1;
          if (wa + wb === 0) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const diff = (d - segment) / d / (wa + wb);
          a.x += dx * diff * wa;
          a.y += dy * diff * wa;
          b.x -= dx * diff * wb;
          b.y -= dy * diff * wb;
        }
      }
      twistSpeed = twistSpeed * 0.85 + (points[end].x - points[end].px) * 0.15;

      let motion = 0;
      for (const p of points) motion += Math.abs(p.x - p.px) + Math.abs(p.y - p.py);
      stillSteps = !dragging && motion < 0.05 ? stillSteps + 1 : 0;
    };

    const tick = (time: number) => {
      carry += Math.min(time - (lastTime || time), 64);
      lastTime = time;
      while (carry >= STEP_MS) {
        step();
        carry -= STEP_MS;
      }
      draw();
      if (stillSteps > 30) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      stillSteps = 0;
      if (!frame) {
        lastTime = 0;
        carry = STEP_MS;
        frame = requestAnimationFrame(tick);
      }
    };

    const local = (event: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const at = local(event);
      const end = points[POINTS - 1];
      grab = { x: at.x - end.x, y: at.y - end.y };
      target = { x: end.x, y: end.y };
      dragging = true;
      pendant.setPointerCapture(event.pointerId);
      pendant.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      wake();
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const at = local(event);
      target = { x: at.x - grab.x, y: at.y - grab.y };
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      pendant.style.cursor = "grab";
      document.body.style.userSelect = "";
    };

    // One small push the first time it scrolls into view, so it is clearly alive.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        points[POINTS - 1].px -= 4;
        wake();
      },
      { threshold: 0.6 },
    );

    const enable = () => {
      if (enabled) return;
      enabled = true;
      pendant.style.cursor = "grab";
      pendant.style.touchAction = "none";
      pendant.addEventListener("pointerdown", onDown);
      pendant.addEventListener("pointermove", onMove);
      pendant.addEventListener("pointerup", onUp);
      pendant.addEventListener("pointercancel", onUp);
      observer.observe(box);
    };
    const disable = () => {
      if (!enabled) return;
      enabled = false;
      onUp();
      cancelAnimationFrame(frame);
      frame = 0;
      observer.disconnect();
      pendant.removeEventListener("pointerdown", onDown);
      pendant.removeEventListener("pointermove", onMove);
      pendant.removeEventListener("pointerup", onUp);
      pendant.removeEventListener("pointercancel", onUp);
      pendant.style.cursor = "";
      pendant.style.touchAction = "";
      // Back to the still, server-rendered pose.
      points.splice(0, POINTS, ...restPoints(anchorX, segment));
      twistSpeed = 0;
      draw();
    };
    const sync = () => (live.matches && !reduce.matches ? enable() : disable());

    sync();
    live.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      live.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      disable();
    };
  }, [interactive, anchorX, segment, spread, strap]);

  return (
    <div ref={boxRef} className="relative" style={{ width, height }}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-visible"
        width={width}
        height={height}
      >
        {[restA, restB].map((d, i) => (
          <g key={i}>
            <path
              ref={(el) => {
                strandRefs.current[i * 2] = el;
              }}
              d={d}
              fill="none"
              stroke="var(--strap)"
              strokeWidth={STRAP_W}
            />
            {/* A faint dash along the middle hints at the printed text without trying to be readable. */}
            <path
              ref={(el) => {
                strandRefs.current[i * 2 + 1] = el;
              }}
              d={d}
              fill="none"
              stroke="rgb(255 255 255 / 0.22)"
              strokeWidth={1.5}
              strokeDasharray="5 9"
            />
          </g>
        ))}
      </svg>

      <div
        ref={pendantRef}
        className="pointer-events-auto absolute top-0 left-0 origin-top select-none"
        style={{ width: HOLDER_W, transform: pendantTransform(anchorX, strap, 0, 0) }}
      >
        <Hardware />
        {/* Clear plastic holder: a tab with a slot for the hook, then the card. */}
        <div className="mx-auto grid h-[14px] w-16 place-items-center rounded-t-control border border-b-0 border-ink/15 bg-panel/70">
          <span className="h-1 w-8 rounded-full bg-ink/15" />
        </div>
        <div className="rounded-card border border-ink/15 bg-panel/70" style={{ padding: HOLDER_PAD }}>
          <Image
            src={src}
            width={1000}
            height={631}
            alt={alt}
            sizes={`${CARD_W}px`}
            draggable={false}
            className="block h-auto w-full rounded-control"
          />
        </div>
      </div>
    </div>
  );
}

/** Strap end with rivet, breakaway buckle, short tab, ring and swivel hook, after the real lanyard. */
function Hardware() {
  const metal = "#9aa1a8";
  return (
    <svg aria-hidden="true" className="mx-auto block" width={40} height={HARDWARE_H} viewBox={`0 0 40 ${HARDWARE_H}`}>
      <rect x={12} y={0} width={16} height={14} fill="var(--strap)" />
      <circle cx={20} cy={7} r={2.6} fill={metal} />
      <rect x={9} y={12} width={22} height={20} rx={3} fill="#141414" />
      <rect x={13} y={17} width={14} height={4} rx={1} fill="#3a3a3a" />
      <rect x={10.5} y={31} width={19} height={12} rx={2.5} fill="#1f1f1f" />
      <rect x={13} y={43} width={14} height={13} fill="var(--strap)" />
      <circle cx={20} cy={50} r={2.4} fill={metal} />
      <ellipse cx={20} cy={59} rx={7} ry={3.6} fill="none" stroke={metal} strokeWidth={2} />
      <rect x={17.5} y={60} width={5} height={5} rx={1} fill={metal} />
      <path d="M20 64.5 C25 66.5 25 74 20 76 C15 74 15 66.5 20 64.5Z" fill="none" stroke={metal} strokeWidth={2.2} />
    </svg>
  );
}
