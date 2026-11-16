import type { ImageAsset } from "./projects";

export type ExperienceKind = "Experience" | "Volunteer";

export type ExperienceEntry = {
  kind: ExperienceKind;
  dateRange: string;
  title: string;
  organization: string;
  body: string;
  photo?: ImageAsset;
  /** Further photos, stacked behind `photo` and shown in the viewer when it is clicked. */
  morePhotos?: ImageAsset[];
};

export const experience: ExperienceEntry[] = [
  {
    kind: "Volunteer",
    dateRange: "May 2025",
    title: "Climate Change Education Volunteer",
    organization: "BINUS University with Teach For Indonesia (TFI), at SD Negeri 23 Palmerah",
    body: "Taught a fifth-grade class at SD Negeri 23 Palmerah, West Jakarta, about climate change as part of a Character Building Pancasila project on SDG 13 (Climate Action). Our team ran an interactive session on what climate change is, how it affects daily life, and simple things the students can do for the environment, then observed the class and interviewed students and teachers for the project article.",
    photo: {
      src: "/images/experience/climate-class.jpg",
      width: 1600,
      height: 899,
      caption: "With the fifth-grade class at SD Negeri 23 Palmerah.",
    },
    morePhotos: [
      {
        src: "/images/experience/climate-team.jpg",
        width: 530,
        height: 921,
        caption: "The BINUS team outside the school.",
      },
    ],
  },
  {
    kind: "Volunteer",
    dateRange: "April 2025 - May 2025",
    title: "PAUD Teaching Volunteer",
    organization: "Teach For Indonesia (TFI)",
    body: "Volunteered as a Teaching Volunteer in Teach For Indonesia (TFI), conducting fun learning activities for preschool students (PAUD). Collaborated with team members and teachers to prepare interactive educational activities that created an engaging and supportive learning environment for young learners.",
    photo: {
      src: "/images/experience/paud-tfi.jpg",
      width: 1280,
      height: 960,
      caption: "With the PAUD students and teachers.",
    },
  },
];
