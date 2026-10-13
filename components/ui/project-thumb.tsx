import Image from "next/image";
import type { ChannelColor, Project } from "@/lib/data/projects";
import { ImagePlaceholder } from "./image-placeholder";
import { hasImage } from "./site-image";

/** CSS colour for a project's accent. */
export const accentVar = (color: ChannelColor) => `var(--color-ch-${color})`;

/** The image that best represents a project: its chosen thumbnail, else its cover, else its first screenshot. */
export function projectImage(project: Project) {
  const chosen = project.thumbSrc && project.gallery?.find((image) => image.src === project.thumbSrc);
  if (chosen && hasImage(chosen.src)) return chosen;
  if (hasImage(project.cover.src)) return project.cover;
  return (project.gallery ?? []).find((image) => hasImage(image.src));
}

type ProjectThumbProps = {
  project: Project;
  /** Width / height of the frame; the screenshot is cropped to fill it from the top. */
  aspect?: string;
  sizes: string;
  className?: string;
};

/** A project's real screenshot in a fixed frame. Zooms gently on hover of a parent `.live-group`. */
export function ProjectThumb({ project, aspect = "16 / 10", sizes, className = "" }: ProjectThumbProps) {
  const image = projectImage(project);
  if (!image) return <ImagePlaceholder width={1600} height={1000} className={className} />;

  return (
    <div
      className={`thumb relative overflow-hidden rounded-card border border-border bg-panel ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={image.src}
        alt={`${project.title} screenshot`}
        fill
        sizes={sizes}
        className="thumb__img object-cover object-top"
        style={project.thumbFocus ? { objectPosition: project.thumbFocus } : undefined}
      />
    </div>
  );
}
