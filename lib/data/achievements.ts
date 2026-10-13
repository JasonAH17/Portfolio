import type { ImageAsset } from "./projects";
import type { RichSegment } from "./rich-text";

export type AchievementEntry = {
  date: string;
  title: string;
  category: string;
  paragraphs: RichSegment[][];
  photos?: ImageAsset[];
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
    photos: [
      {
        src: "/images/achievements/grand-final.jpg",
        width: 881,
        height: 1101,
        caption: "Team ORCA Pura Pura Ninja at CAU Tech Summit 26, Central Asian University.",
      },
      {
        src: "/images/achievements/hackathon-delegation.jpg",
        width: 1018,
        height: 833,
        caption: "BINUS University students at the AI in Healthcare Hackathon 2026, Uzbekistan, 26–29 March 2026 (photo: BINUS SOCS).",
      },
    ],
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
