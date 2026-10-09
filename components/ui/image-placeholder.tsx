import type { CSSProperties } from "react";

type ImagePlaceholderProps = {
  width: number;
  height: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export function ImagePlaceholder({ width, height, label, className = "", style }: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-border bg-panel ${className}`}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
    >
      <span className="font-mono text-xs tracking-wide text-ink/45">{label ?? `${width} × ${height}`}</span>
    </div>
  );
}
