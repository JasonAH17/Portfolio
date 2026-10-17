"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useActiveSection } from "./use-active-section";

const links = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

// Track every home section (not just the nav ones) so no link stays lit while you read a section without one.
const navIds = ["home", "about", ...links.map((link) => link.id)];

export function StatusBar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(navIds, onHome);
  const navRef = useRef<HTMLElement>(null);

  // On phones the nav scrolls sideways; keep the active link in view.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const link = nav.querySelector<HTMLElement>(`a[href="/#${active}"]`);
    if (!link) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    const target = nav.scrollLeft + (linkBox.left - navBox.left) - (navBox.width - linkBox.width) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-2.5 sm:h-[var(--status-bar-h)] sm:flex-nowrap sm:px-6 sm:py-0">
        <Link href="/" className="type-title text-lg text-ink transition-colors hover:text-signal">
          Jason A. H.
        </Link>

        <div className="flex items-center gap-4 sm:order-last">
          <ThemeToggle />
        </div>

        <nav ref={navRef} aria-label="Sections" className="-mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0">
          <ul className="flex w-max gap-x-5 whitespace-nowrap pr-4 sm:w-auto sm:gap-x-6 sm:pr-0">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`link-hover text-[0.9rem] transition-colors ${isActive ? "text-signal" : "text-ink/70 hover:text-ink"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
