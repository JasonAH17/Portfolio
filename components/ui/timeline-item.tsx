import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/data/projects";
import { reveal } from "@/components/motion/reveal";
import { SiteImage } from "./site-image";

type LogEntryProps = {
  id?: string;
  date: string;
  kind: "Achievement" | "Experience" | "Volunteer";
  title: string;
  subtitle?: string;
  /** Photo for the entry; renders a placeholder at the same size until the file exists. */
  photo?: ImageAsset;
  isLast?: boolean;
  children: ReactNode;
};

const kindColor = {
  Achievement: "var(--color-signal)",
  Experience: "var(--color-ch-pleth)",
  Volunteer: "var(--color-ch-resp)",
};

/** One event in the log: timestamp column, rail with marker, entry content. */
export function LogEntry({ id, date, kind, title, subtitle, photo, isLast = false, children }: LogEntryProps) {
  return (
    <li id={id} className="grid grid-cols-[1rem_1fr] gap-x-5 sm:grid-cols-[10rem_1rem_1fr] sm:gap-x-6">
      <p {...reveal()} className="type-label hidden pt-1 text-ink/55 sm:block">
        {date}
      </p>
      {/* The rail draws downward and the marker settles in once the entry scrolls into view. */}
      <div {...reveal(0, "rail")} className="flex flex-col items-center">
        <span className="rail-marker mt-1 h-3 w-3 shrink-0 border-2" style={{ borderColor: kindColor[kind] }} />
        {!isLast && <span className="rail-line mt-2 w-px flex-1 bg-border" />}
      </div>
      <div {...reveal(1)} className={isLast ? "" : "pb-16"}>
        <p className="type-label text-ink/55 sm:hidden">{date}</p>
        <p className="type-label mt-1 sm:mt-0" style={{ color: kindColor[kind] }}>
          {kind}
        </p>
        <h3 className="mt-2 text-2xl type-title sm:text-3xl">
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-ink/65">{subtitle}</p>}
        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_20rem]">
          <div className="max-w-xl space-y-3 leading-relaxed text-ink/85">{children}</div>
          {photo && (
            <figure {...reveal(2, "wipe")} className="w-full max-w-sm md:max-w-none">
              <SiteImage
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.caption ?? title}
                sizes="(min-width: 768px) 320px, 100vw"
              />
              {photo.caption && <figcaption className="mt-2 text-sm leading-snug text-ink/60">{photo.caption}</figcaption>}
            </figure>
          )}
        </div>
      </div>
    </li>
  );
}
