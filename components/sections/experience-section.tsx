import { LogSectionShell, sortKey } from "@/components/ui/log-section-shell";
import { LogEntry } from "@/components/ui/timeline-item";
import { experience } from "@/lib/data/experience";

export function ExperienceSection() {
  const entries = [...experience].sort((a, b) => sortKey(b.dateRange) - sortKey(a.dateRange));

  return (
    <LogSectionShell
      id="experience"
      label="Experience"
      title={
        <>
          Experience <span className="whitespace-nowrap">&amp; Volunteer</span>
        </>
      }
      intro="Work and volunteering, most recent first."
      color="var(--color-ch-pleth)"
    >
      {entries.map((entry, index) => (
        <LogEntry
          key={entry.title}
          date={entry.dateRange}
          kind={entry.kind}
          title={entry.title}
          subtitle={entry.organization}
          photo
          isLast={index === entries.length - 1}
        >
          <p>{entry.body}</p>
        </LogEntry>
      ))}
    </LogSectionShell>
  );
}
