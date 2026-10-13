"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "./icons";

/**
 * Floating back-to-top button. Appears once the first screen has scrolled away,
 * watched with an IntersectionObserver on a sentinel (no scroll listeners).
 */
export function BackToTop() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Spans the first screen; once it leaves the viewport, the button shows. */}
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-screen w-px" />
      <a
        href="#"
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        data-visible={visible ? "" : undefined}
        className="back-to-top press fixed right-4 bottom-4 z-40 grid h-11 w-11 place-items-center rounded-control border border-border bg-panel/90 text-ink backdrop-blur-md hover:border-signal hover:text-signal sm:right-6 sm:bottom-6"
      >
        <ArrowUpIcon className="nudge nudge--up text-lg" />
      </a>
    </>
  );
}
