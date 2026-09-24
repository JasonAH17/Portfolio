import type { RichSegment } from "./rich-text";

export type AchievementEntry = {
  date: string;
  title: string;
  category: string;
  paragraphs: RichSegment[][];
};

export const achievements: AchievementEntry[] = [
  {
    date: "March 2026",
    title: "Grand Finalist, Hackathon Uzbekistan",
    category: "International AI Hackathon",
    paragraphs: [
      [
        "Advanced to the Grand Final of an international AI hackathon as one of two teams from Indonesia. Collaborated to develop an AI powered solution under time constraints while competing alongside participants from various countries.",
      ],
      [
        "This ties directly to the ",
        { label: "Sepsis Guard", href: "/projects/sepsis-guard" },
        " project, which was the elimination round submission for this hackathon. See the Projects page for full details.",
      ],
    ],
  },
];
