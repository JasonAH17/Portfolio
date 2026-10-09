"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ALERT_THRESHOLD,
  STATIC_FRAME,
  demoFrames,
  statusFor,
  type DemoStatus,
} from "@/lib/data/sepsis-demo";

/** Recreated Sepsis Guard risk monitor. Values are simulated (see lib/data/sepsis-demo.ts). */

const statusColor: Record<DemoStatus, string> = {
  Stable: "var(--color-ch-ecg)",
  Moderate: "var(--color-ch-resp)",
  "High risk": "var(--color-amber)",
  Critical: "var(--color-amber)",
};

// 240° gauge arc, opening at the bottom.
const CX = 60;
const CY = 60;
const R = 46;
const START = 150;
const SWEEP = 240;
const ARC_LEN = (R * SWEEP * Math.PI) / 180;

function polar(deg: number, r = R) {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)] as const;
}

const [ax, ay] = polar(START);
const [bx, by] = polar(START + SWEEP);
const ARC = `M${ax.toFixed(2)} ${ay.toFixed(2)}A${R} ${R} 0 1 1 ${bx.toFixed(2)} ${by.toFixed(2)}`;
const tickAngle = START + SWEEP * ALERT_THRESHOLD;
const [t1x, t1y] = polar(tickAngle, R - 7);
const [t2x, t2y] = polar(tickAngle, R + 7);

// Two identical ECG cycles side by side; the strip scrolls -50% for a seamless loop.
function ecgCycle(beats: number, width: number, height: number) {
  const waves = [
    { at: 0.2, amp: 0.1, w: 0.03 },
    { at: 0.37, amp: -0.12, w: 0.009 },
    { at: 0.4, amp: 1, w: 0.011 },
    { at: 0.43, amp: -0.25, w: 0.011 },
    { at: 0.66, amp: 0.26, w: 0.045 },
  ];
  const samples = beats * 80;
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const phase = (i / 80) % 1;
    let v = 0;
    for (const wave of waves) v += wave.amp * Math.exp(-((phase - wave.at) ** 2) / (2 * wave.w ** 2));
    const x = (i / samples) * width;
    const y = height * (0.72 - 0.6 * v);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const ECG_STRIP = ecgCycle(4, 400, 64);

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedServer = () => false;

export function SepsisMonitor({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion) return;

    let visible = true;
    let timer: number | undefined;

    const sync = () => {
      const run = visible && document.visibilityState === "visible";
      setPaused(!run);
      if (run && timer === undefined) {
        timer = window.setInterval(
          () => setFrameIndex((i) => (i + 1) % demoFrames.length),
          1000,
        );
      } else if (!run && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [reducedMotion]);

  const frame = demoFrames[reducedMotion ? STATIC_FRAME : frameIndex];
  const status = statusFor(frame.risk);
  const alerting = frame.risk >= ALERT_THRESHOLD;
  const color = statusColor[status];
  const prevSofa = demoFrames[0].sofa;

  return (
    <Link
      ref={ref}
      href="/projects/sepsis-guard"
      aria-label="Sepsis Guard: a recreated ICU risk monitor showing simulated demo data. View the project."
      className={`monitor group block border border-border bg-panel/80 ${className}`}
      data-paused={paused ? "" : undefined}
    >
      <div aria-hidden="true">
        {/* Header strip */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-border px-3 py-2.5 sm:px-4">
          <p className="type-label text-ink/80">
            <span className="text-ch-ecg">Sepsis Guard</span> · ICU risk monitor
          </p>
          <p className="type-label text-ink/45">Simulated · Demo data</p>
        </div>

        <div className="grid grid-cols-[minmax(0,8.5rem)_1fr] gap-x-3 px-3 pt-3 sm:grid-cols-[minmax(0,10.5rem)_1fr] sm:gap-x-5 sm:px-4 sm:pt-4">
          {/* Probability gauge */}
          <div className="relative">
            <svg viewBox="0 0 120 112" className="block w-full">
              <path d={ARC} fill="none" stroke="var(--color-border)" strokeWidth={7} />
              <path
                d={ARC}
                fill="none"
                stroke={color}
                strokeWidth={7}
                strokeDasharray={ARC_LEN}
                strokeDashoffset={ARC_LEN * (1 - frame.risk)}
                className="gauge-arc phosphor"
              />
              <line
                x1={t1x}
                y1={t1y}
                x2={t2x}
                y2={t2y}
                stroke="var(--color-ink)"
                strokeOpacity={0.6}
                strokeWidth={1.5}
              />
            </svg>
            <div className="absolute inset-x-0 top-[30%] text-center">
              <p className="type-readout text-[2.6rem] sm:text-[3.25rem]" style={{ color }}>
                {Math.round(frame.risk * 100)}
                <span className="type-label ml-0.5 align-top">%</span>
              </p>
              <p className="type-label mt-1 text-[0.625rem] text-ink/55">P(sepsis) · 6h</p>
            </div>
          </div>

          {/* Readouts */}
          <div className="flex flex-col justify-center gap-2.5">
            <p
              className={`type-label inline-flex w-fit items-center gap-1.5 border px-1.5 py-0.5 ${alerting ? "alert-blink" : ""}`}
              style={{ color, borderColor: color }}
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {alerting ? "Alert · " : ""}
              {status}
            </p>
            <MiniReadout label="SOFA" value={String(frame.sofa)} delta={frame.sofa - prevSofa} />
            <MiniReadout
              label="Time to alert"
              value={alerting ? "NOW" : frame.toAlert}
              unit={alerting ? undefined : "h"}
              highlight={alerting}
            />
            <MiniReadout label="HR" value={String(frame.hr)} unit="bpm" className="hidden min-[400px]:flex" />
          </div>
        </div>

        {/* Scrolling ECG strip */}
        <div className="mx-3 mt-3 mb-3 sm:mx-4 sm:mb-4">
          <div className="ecg-grid relative h-16 overflow-hidden border border-border text-ch-ecg">
            <span className="type-label absolute top-1 left-1.5 z-10 text-[0.625rem] text-ink/50">II</span>
            <div className="strip-scroll flex h-full w-[200%]" style={{ animationDuration: "2600ms" }}>
              {[0, 1].map((copy) => (
                <svg
                  key={copy}
                  viewBox="0 0 400 64"
                  preserveAspectRatio="none"
                  className="phosphor block h-full w-1/2"
                >
                  <path
                    d={ECG_STRIP}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MiniReadout({
  label,
  value,
  unit,
  delta,
  highlight = false,
  className = "flex",
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: number;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={`${className} items-baseline justify-between gap-2 border-t border-border pt-1.5`}>
      <span className="type-label text-[0.625rem] text-ink/55">{label}</span>
      <span className="flex items-baseline gap-1">
        <span
          className="type-readout text-[1.6rem] sm:text-[1.9rem]"
          style={{ color: highlight ? "var(--color-amber)" : undefined }}
        >
          {value}
        </span>
        {unit && <span className="type-label text-[0.625rem] text-ink/55">{unit}</span>}
        {delta !== undefined && delta > 0 && (
          <span className="type-label text-[0.625rem] text-amber">▲{delta}</span>
        )}
      </span>
    </div>
  );
}
