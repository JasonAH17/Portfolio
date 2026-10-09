import Link from "next/link";
import { LogSectionShell, sortKey } from "@/components/ui/log-section-shell";
import { RichText } from "@/components/ui/rich-text";
import { LogEntry } from "@/components/ui/timeline-item";
import { achievements, type AchievementEntry } from "@/lib/data/achievements";

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

export function AchievementsSection() {
  const entries = [...achievements].sort((a, b) => sortKey(b.date) - sortKey(a.date));

  return (
    <LogSectionShell
      id="achievements"
      label="Achievements"
      title="Achievements"
      intro="Competitions and recognition, most recent first."
      color="var(--color-signal)"
    >
      {entries.map((entry, index) => (
        <LogEntry
          key={entry.title}
          date={entry.date}
          kind="Achievement"
          title={entry.title}
          subtitle={entry.category}
          photo
          isLast={index === entries.length - 1}
        >
          {entry.precededBy && (
            <LinkedPair before={entry.precededBy} after={`${entry.date} · ${entry.shortTitle ?? entry.title}`} />
          )}
          {entry.paragraphs.map((paragraph, i) => (
            <p key={i}>
              <RichText segments={paragraph} />
            </p>
          ))}
        </LogEntry>
      ))}
    </LogSectionShell>
  );
}
