import type { ImageAsset } from "./projects";

export type CertificationEntry = {
  name: string;
  issuer: string;
  date: string;
  /** Short fact under the name, e.g. the certificate type or a related project. */
  detail?: string;
  /** Internal link for the detail, e.g. the project the certificate relates to. */
  detailHref?: string;
  /** Public verification page, when the issuer provides one. */
  link?: string;
  image: ImageAsset;
};

export type CertificationGroup = { title: string; entries: CertificationEntry[] };

const cert = (file: string, width: number, height: number): ImageAsset => ({
  src: `/images/certifications/${file}`,
  width,
  height,
});

// Transcribed from content/certifications.md. Most recent first within each group.
export const certificationGroups: CertificationGroup[] = [
  {
    title: "Competitions",
    entries: [
      {
        name: "AI Innovation Challenge, COMPFEST 18",
        issuer: "COMPFEST",
        date: "Jul-Sep 2026",
        detail: "Participant",
        image: cert("compfest-18.jpg", 1400, 990),
      },
      {
        name: "International AI Healthcare Hackathon 2026",
        issuer: "Central Asian University, Tashkent",
        date: "March 2026",
        detail: "Semi-finalist with Sepsis Guard",
        detailHref: "/projects/sepsis-guard",
        image: cert("cau-tech-hack-26.jpg", 904, 1280),
      },
    ],
  },
  {
    title: "IT & AI",
    entries: [
      {
        name: "Unleashing the Power of AI Agents",
        issuer: "IBM SkillsBuild",
        date: "May 2026",
        image: cert("ibm-ai-agents.jpg", 1400, 866),
      },
      {
        name: "AI in Healthcare: Improving Care and Efficiency",
        issuer: "IBM SkillsBuild",
        date: "May 2026",
        image: cert("ibm-ai-in-healthcare.jpg", 1400, 867),
      },
      {
        name: "Self-Paced Azure AI Basic Fundamental",
        issuer: "Microsoft elevAIte Indonesia",
        date: "March 2026",
        image: cert("azure-ai-fundamentals.jpg", 1400, 990),
      },
    ],
  },
  {
    title: "Language",
    entries: [
      {
        name: "English, CEFR C2.2",
        issuer: "Beelingua, BINUS University",
        date: "July 2026",
        detail: "Market Research & Business Communication",
        image: cert("beelingua-c22.jpg", 1400, 990),
      },
    ],
  },
];
