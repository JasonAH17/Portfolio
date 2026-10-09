import type { ReactNode } from "react";
import { ImagePlaceholder } from "./image-placeholder";

type LogEntryProps = {
  id?: string;
  date: string;
  kind: "Achievement" | "Experience";
  title: string;
  subtitle?: string;
  photo?: boolean;
  isLast?: boolean;
  children: ReactNode;
};

const kindColor = {
  Achievement: "var(--color-signal)",
  Experience: "var(--color-ch-pleth)",
};

/** One event in the log: timestamp column, rail with marker, entry content. */
export function LogEntry({ id, date, kind, title, subtitle, photo = false, isLast = false, children }: LogEntryProps) {
  return (
    <li id={id} className="grid grid-cols-[1rem_1fr] gap-x-5 sm:grid-cols-[10rem_1rem_1fr] sm:gap-x-6">
      <p className="type-label hidden pt-1 text-ink/55 sm:block">{date}</p>
      <div className="flex flex-col items-center">
        <span className="mt-1 h-3 w-3 shrink-0 border-2" style={{ borderColor: kindColor[kind] }} />
        {!isLast && <span className="mt-2 w-px flex-1 bg-border" />}
      </div>
      <div className={isLast ? "" : "pb-16"}>
        <p className="type-label text-ink/55 sm:hidden">{date}</p>
        <p className="type-label mt-1 sm:mt-0" style={{ color: kindColor[kind] }}>
          {kind}
        </p>
        <h3 className="mt-2 text-2xl font-semibold sm:text-3xl" style={{ fontStretch: "80%" }}>
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-ink/65">{subtitle}</p>}
        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_16rem]">
          <div className="max-w-xl space-y-3 leading-relaxed text-ink/85">{children}</div>
          {photo && <ImagePlaceholder width={800} height={600} className="w-full max-w-64" />}
        </div>
      </div>
    </li>
  );
}
