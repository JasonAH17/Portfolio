import type { ReactNode } from "react";
import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { Section } from "./section";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "March 2026" or "April 2025 — May 2025" → sortable number from the first date. */
export function sortKey(date: string) {
  const [month, year] = date.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(month.toLowerCase());
}

type LogSectionShellProps = {
  id: string;
  title: ReactNode;
  children: ReactNode;
};

/** Shared frame for the chronological sections: heading row on top, timeline below. */
export function LogSectionShell({ id, title, children }: LogSectionShellProps) {
  return (
    <Section id={id} className="py-14 sm:py-20">
      <h2 {...reveal(0, "mask")} className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
        <Mask>{title}</Mask>
      </h2>
      <ol className="mt-8 sm:mt-10">{children}</ol>
    </Section>
  );
}
