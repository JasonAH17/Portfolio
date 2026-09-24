import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { TimelineItem } from "@/components/ui/timeline-item";
import { achievements } from "@/lib/data/achievements";

export function AchievementsSection() {
  return (
    <Section id="achievements">
      <h2 className="text-2xl">Achievements</h2>
      <div className="mt-8">
        {achievements.map((entry, index) => (
          <TimelineItem
            key={entry.title}
            date={entry.date}
            title={entry.title}
            subtitle={entry.category}
            photo
            isLast={index === achievements.length - 1}
          >
            {entry.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>
                <RichText segments={paragraph} />
              </p>
            ))}
          </TimelineItem>
        ))}
      </div>
    </Section>
  );
}
