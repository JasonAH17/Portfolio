"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type InViewProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  live?: boolean;
};

/** Sets data-inview once the element scrolls into view; CSS runs the sweep from there. */
export function InView({ className, style, children, live = false }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.setAttribute("data-inview", "");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-sweep=""
      data-live={live ? "" : undefined}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
