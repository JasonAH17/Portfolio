"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

function useJakartaClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 15_000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);
  return active;
}

export function StatusBar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const time = useJakartaClock();
  const active = useActiveSection(onHome);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-2.5 sm:h-[var(--status-bar-h)] sm:flex-nowrap sm:px-6 sm:py-0">
        <Link href="/" className="type-label text-ink/80 hover:text-ink">
          Jason A. H. <span className="hidden text-ink/40 sm:inline">· CS/AI · BINUS</span>
        </Link>

        <div className="flex items-center gap-4 sm:order-last">
          <p className="type-label flex items-center gap-2 text-ink/60">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="tabular-nums" suppressHydrationWarning>
              {time}
            </span>
            WIB
          </p>
          <ThemeToggle />
        </div>

        <nav aria-label="Sections" className="-mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0">
          <ul className="flex gap-x-5 whitespace-nowrap sm:gap-x-6">
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
