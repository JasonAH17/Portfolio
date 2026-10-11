import type { ImageAsset } from "./projects";
import type { RichSegment } from "./rich-text";

export type AchievementEntry = {
  date: string;
  title: string;
  category: string;
  paragraphs: RichSegment[][];
  photo?: ImageAsset;
  /** Short name used in the linked pair, e.g. "Grand Final". */
  shortTitle?: string;
  /** Earlier event this achievement grew out of, drawn as a linked pair in the log. */
  precededBy?: { date: string; label: string; href: string };
};

export const achievements: AchievementEntry[] = [
  {
    date: "March 2026",
    title: "Grand Finalist, Hackathon Uzbekistan",
    category: "International AI Hackathon",
    shortTitle: "Grand Final",
    photo: { src: "/images/achievements/grand-final.jpg", width: 800, height: 600 },
    precededBy: {
      date: "February 2026",
      label: "Elimination round · Sepsis Guard",
      href: "/projects/sepsis-guard",
    },
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
