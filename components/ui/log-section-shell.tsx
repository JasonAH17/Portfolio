import type { ReactNode } from "react";
import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { Section } from "./section";
import { SectionLabel } from "./section-label";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "March 2026" or "April 2025 — May 2025" → sortable number from the first date. */
export function sortKey(date: string) {
  const [month, year] = date.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(month.toLowerCase());
}

type LogSectionShellProps = {
  id: string;
  label: string;
  title: ReactNode;
  intro: string;
  color: string;
  children: ReactNode;
};

/** Shared frame for the chronological sections: heading row on top, timeline below. */
export function LogSectionShell({ id, label, title, intro, color, children }: LogSectionShellProps) {
  return (
    <Section id={id} className="py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <div {...reveal()}>
            <SectionLabel color={color}>{label}</SectionLabel>
          </div>
          <h2 {...reveal(0, "mask")} className="type-display mt-4 text-[clamp(2.75rem,10vw,6rem)]">
            <Mask>{title}</Mask>
          </h2>
        </div>
        <p {...reveal(2)} className="max-w-xs pb-2 text-sm text-ink/60">
          {intro}
        </p>
      </div>
      <ol className="mt-12 sm:mt-16">{children}</ol>
    </Section>
  );
}
