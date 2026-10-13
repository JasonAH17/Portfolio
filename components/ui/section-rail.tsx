"use client";

import { usePathname } from "next/navigation";
import { useActiveSection } from "./use-active-section";

const sections = [
  { id: "home", label: "Intro" },
  { id: "about", label: "Education & skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const ids = sections.map((section) => section.id);

/**
 * Desktop-only dot rail on the right edge of the home page: one dot per section,
 * the current one filled, its label shown beside it (all labels on hover).
 */
export function SectionRail() {
  const onHome = usePathname() === "/";
  const active = useActiveSection(ids, onHome);
  if (!onHome) return null;

  return (
    <nav aria-label="Page sections" className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="relative flex flex-col gap-4">
        {/* The line the dots sit on. */}
        <span aria-hidden="true" className="absolute top-1 right-[5px] bottom-1 w-px bg-border" />
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className="rail-link group relative flex items-center justify-end gap-3"
            >
              <span className="rail-label type-label rounded-chip border border-border bg-panel/90 px-2 py-0.5 whitespace-nowrap text-ink/80 backdrop-blur-sm">
                {section.label}
              </span>
              <span className="rail-dot relative block h-[11px] w-[11px] rounded-full border" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
