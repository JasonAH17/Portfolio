import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/data/projects";
import { reveal } from "@/components/motion/reveal";
import { PhotoStack } from "./photo-stack";
import { hasImage, SiteImage } from "./site-image";

type LogEntryProps = {
  id?: string;
  date: string;
  kind: "Achievement" | "Experience" | "Volunteer";
  title: string;
  subtitle?: string;
  /** Photos for the entry, stacked in the side column; each renders a placeholder at the same size until the file exists. */
  photos?: ImageAsset[];
  /** Show the photos as one stack (first on top) that opens a viewer, instead of side by side. */
  stacked?: boolean;
  isLast?: boolean;
  children: ReactNode;
};

const kindColor = {
  Achievement: "var(--color-signal)",
  Experience: "var(--color-ch-pleth)",
  Volunteer: "var(--color-ch-resp)",
};

/** One event in the log: timestamp column, rail with marker, entry content. */
export function LogEntry({ id, date, kind, title, subtitle, photos, stacked = false, isLast = false, children }: LogEntryProps) {
  // A stack needs at least two real files; otherwise the entry falls back to the plain layouts.
  const present = stacked ? (photos ?? []).filter((photo) => hasImage(photo.src)) : [];
  const stack = present.length > 1 ? present : null;

  return (
    <li id={id} className="grid grid-cols-[1rem_1fr] gap-x-5 sm:grid-cols-[10rem_1rem_1fr] sm:gap-x-6">
      <p {...reveal()} className="type-label hidden pt-1 text-ink/70 sm:block">
        {date}
      </p>
      {/* The rail draws downward and the marker settles in once the entry scrolls into view. */}
      <div {...reveal(0, "rail")} className="flex flex-col items-center">
        <span className="rail-marker mt-1 h-3 w-3 shrink-0 border-2" style={{ borderColor: kindColor[kind] }} />
        {!isLast && <span className="rail-line mt-2 w-px flex-1 bg-border" />}
      </div>
      <div {...reveal(1)} className={isLast ? "" : "pb-12"}>
        <p className="type-label text-ink/70 sm:hidden">{date}</p>
        {/* The tag only adds information where a section mixes kinds (Experience vs Volunteer). */}
        {kind !== "Achievement" && (
          <p className="type-label mb-2 mt-1 sm:mt-0" style={{ color: kindColor[kind] }}>
            {kind}
          </p>
        )}
        <h3 className="text-2xl type-title sm:text-3xl">
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-ink/70">{subtitle}</p>}
        {stack ? (
          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_20rem]">
            <div className="max-w-xl space-y-3 leading-relaxed text-ink/85">{children}</div>
            {/* Extra right and bottom room for the photo that peeks out behind. */}
            <figure {...reveal(2)} className="w-full max-w-sm pr-3 md:max-w-none">
              <PhotoStack photos={stack} alt={title} />
              {stack[0].caption && <figcaption className="mt-4 text-sm leading-snug text-ink/70">{stack[0].caption}</figcaption>}
            </figure>
          </div>
        ) : photos && photos.length > 1 ? (
          <>
            <div className="mt-5 max-w-2xl space-y-3 leading-relaxed text-ink/85">{children}</div>
            {/* Several photos: one row under the text, all the same height, each as wide as its aspect ratio allows. */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              {photos.map((photo, i) => (
                <figure
                  key={photo.src}
                  {...reveal(2 + i, "wipe")}
                  className="min-w-0"
                  style={{ flex: `${photo.width / photo.height} 1 0%` }}
                >
                  <SiteImage
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.caption ?? title}
                    sizes="(min-width: 768px) 480px, 100vw"
                  />
                  {photo.caption && <figcaption className="mt-2 text-sm leading-snug text-ink/70">{photo.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_20rem]">
            <div className="max-w-xl space-y-3 leading-relaxed text-ink/85">{children}</div>
            {photos?.[0] && (
              <figure {...reveal(2, "wipe")} className="w-full max-w-sm md:max-w-none">
                <SiteImage
                  src={photos[0].src}
                  width={photos[0].width}
                  height={photos[0].height}
                  alt={photos[0].caption ?? title}
                  sizes="(min-width: 768px) 320px, 100vw"
                />
                {photos[0].caption && (
                  <figcaption className="mt-2 text-sm leading-snug text-ink/70">{photos[0].caption}</figcaption>
                )}
              </figure>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
