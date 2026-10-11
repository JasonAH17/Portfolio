"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks [data-reveal] elements with [data-revealed] the first time they scroll into view.
 * CSS in globals.css owns the actual animation, so this only flips an attribute.
 * Re-runs on route change so client-side navigations get their reveals too.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      // Fire a little before the element is fully on screen, but not while it's still below the fold.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
