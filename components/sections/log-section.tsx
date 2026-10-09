import Link from "next/link";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { LogEntry } from "@/components/ui/timeline-item";
import { achievements, type AchievementEntry } from "@/lib/data/achievements";
import { experience, type ExperienceEntry } from "@/lib/data/experience";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "March 2026" or "April 2025 — May 2025" → sortable number from the first date. */
function sortKey(date: string) {
  const [month, year] = date.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(month.toLowerCase());
}

type Event =
  | { kind: "Achievement"; date: string; entry: AchievementEntry }
  | { kind: "Experience"; date: string; entry: ExperienceEntry };

function LinkedPair({ before, after }: { before: NonNullable<AchievementEntry["precededBy"]>; after: string }) {
  return (
    <div className="type-label flex flex-wrap items-center gap-x-3 gap-y-1 border border-border px-3 py-2 text-ink/60">
      <Link href={before.href} className="link-hover text-signal">
        {before.date} · {before.label}
      </Link>
      <span aria-hidden="true">→</span>
      <span>{after}</span>
    </div>
  );
}

export function LogSection() {
  const events: Event[] = [
    ...achievements.map((entry) => ({ kind: "Achievement" as const, date: entry.date, entry })),
    ...experience.map((entry) => ({ kind: "Experience" as const, date: entry.dateRange, entry })),
  ].sort((a, b) => sortKey(b.date) - sortKey(a.date));

  const firstOf = (kind: Event["kind"]) => events.findIndex((event) => event.kind === kind);

  return (
    <Section id="log" className="py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <SectionLabel color="var(--color-ch-pleth)">Event log</SectionLabel>
          <h2 className="type-display mt-4 text-[clamp(3rem,9vw,5.5rem)]">Log</h2>
          <p className="mt-4 max-w-xs text-sm text-ink/60">Experience and achievements, most recent first.</p>
        </div>

        <ol className="lg:col-span-9">
          {events.map((event, index) => {
            const id =
              index === firstOf("Achievement") ? "achievements" : index === firstOf("Experience") ? "experience" : undefined;
            const isLast = index === events.length - 1;

            if (event.kind === "Achievement") {
              const { entry } = event;
              return (
                <LogEntry key={entry.title} id={id} date={entry.date} kind="Achievement" title={entry.title} subtitle={entry.category} photo isLast={isLast}>
                  {entry.precededBy && <LinkedPair before={entry.precededBy} after={`${entry.date} · ${entry.shortTitle ?? entry.title}`} />}
                  {entry.paragraphs.map((paragraph, i) => (
                    <p key={i}>
                      <RichText segments={paragraph} />
                    </p>
                  ))}
                </LogEntry>
              );
            }

            const { entry } = event;
            return (
              <LogEntry key={entry.title} id={id} date={entry.dateRange} kind="Experience" title={entry.title} subtitle={entry.organization} photo isLast={isLast}>
                <p>{entry.body}</p>
              </LogEntry>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
