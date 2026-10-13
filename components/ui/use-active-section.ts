"use client";

import { useEffect, useState } from "react";

// The site footer counts as the last section, so "Contact" stays lit at the bottom of the page.
const FOOTER_ID = "site-footer";

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * Shared by the status bar nav and the desktop section rail.
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return;
    const list = key.split(",");
    const last = list[list.length - 1];
    const sections = [...list, FOOTER_ID]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === FOOTER_ID ? last : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key, enabled]);

  return active;
}
