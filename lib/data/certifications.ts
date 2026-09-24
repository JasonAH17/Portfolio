import type { ImageAsset } from "./projects";

export type CertificationEntry = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  image: ImageAsset;
  description: string;
};

// content/certifications.md has no real entries yet — only the template
// format for adding future certificates. Keep this empty until entries
// are added there; the section renders an explicit empty state instead.
export const certifications: CertificationEntry[] = [];
