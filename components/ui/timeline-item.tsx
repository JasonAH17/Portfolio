import type { ReactNode } from "react";
import { ImagePlaceholder } from "./image-placeholder";

type TimelineItemProps = {
  date: string;
  title: string;
  subtitle?: string;
  photo?: boolean;
  isLast?: boolean;
  children: ReactNode;
};

export function TimelineItem({
  date,
  title,
  subtitle,
  photo = false,
  isLast = false,
  children,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
        {!isLast && <span className="mt-2 w-px flex-1 bg-border" />}
      </div>
      <div className={`flex-1 ${isLast ? "" : "pb-12"}`}>
        <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
          {date}
        </p>
        <h3 className="mt-1 text-xl">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-ink/70">{subtitle}</p>}
        {photo && (
          <ImagePlaceholder width={800} height={600} className="mt-4 max-w-sm" />
        )}
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/90">
          {children}
        </div>
      </div>
    </div>
  );
}
