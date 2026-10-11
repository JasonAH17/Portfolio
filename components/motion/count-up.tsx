"use client";

import { useEffect, useRef } from "react";

const DURATION = 1200;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts a numeric readout up from zero the first time it scrolls into view.
 * Writes textContent directly (no React state per frame). Non-numeric values
 * like "UI/UX" render as-is. The server renders the real value, so no-JS and
 * reduced-motion users always see the final number.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const target = Number(value);
    if (!node || !Number.isFinite(target) || target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const decimals = value.includes(".") ? value.split(".")[1].length : 0;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        node.textContent = (target * easeOutCubic(progress)).toFixed(decimals);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    // Already on screen at mount: leave the real value (counting from zero here would flash).
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.textContent = (0).toFixed(decimals);
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
