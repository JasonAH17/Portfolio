import { Section } from "@/components/ui/section";
import { TimelineItem } from "@/components/ui/timeline-item";
import { experience } from "@/lib/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <h2 className="text-2xl">Experience</h2>
      <div className="mt-8">
        {experience.map((entry, index) => (
          <TimelineItem
            key={entry.title}
            date={entry.dateRange}
            title={entry.title}
            subtitle={entry.organization}
            photo
            isLast={index === experience.length - 1}
          >
            <p>{entry.body}</p>
          </TimelineItem>
        ))}
      </div>
    </Section>
  );
}
