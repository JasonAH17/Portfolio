type ImagePlaceholderProps = {
  width: number;
  height: number;
  label?: string;
  className?: string;
};

export function ImagePlaceholder({
  width,
  height,
  label,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-border bg-ink/[0.03] ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span className="font-mono text-xs tracking-wide text-ink/50">
        {label ?? `${width} × ${height}`}
      </span>
    </div>
  );
}
