export type ExperienceKind = "Experience" | "Volunteer";

export type ExperienceEntry = {
  kind: ExperienceKind;
  dateRange: string;
  title: string;
  organization: string;
  body: string;
};

export const experience: ExperienceEntry[] = [
  {
    kind: "Volunteer",
    dateRange: "April 2025 — May 2025",
    title: "PAUD Teaching Volunteer",
    organization: "Teach For Indonesia (TFI)",
    body: "Volunteered as a Teaching Volunteer in Teach For Indonesia (TFI), conducting fun learning activities for preschool students (PAUD). Collaborated with team members and teachers to prepare interactive educational activities that created an engaging and supportive learning environment for young learners.",
  },
];
