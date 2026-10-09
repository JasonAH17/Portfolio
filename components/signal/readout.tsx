import type { CSSProperties } from "react";
import { channelVar, type ChannelColor } from "./trace";

type ReadoutProps = {
  value: string;
  unit: string;
  label?: string;
  approx?: boolean;
  color?: ChannelColor;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-[2rem]",
  md: "text-[clamp(2.5rem,6vw,3.75rem)]",
  lg: "text-[clamp(3rem,8vw,5.5rem)]",
};

/** A monitor parameter: big condensed numeral, unit set small and top-aligned beside it. */
export function Readout({
  value,
  unit,
  label,
  approx = false,
  color,
  size = "md",
  className = "",
}: ReadoutProps) {
  return (
    <div
      className={className}
      style={{ color: color ? channelVar(color) : undefined } as CSSProperties}
    >
      {label && <p className="type-label text-ink/55">{label}</p>}
      <p className="mt-1 flex items-start gap-1.5">
        <span className={`type-readout ${sizes[size]}`}>
          {approx && <span className="opacity-60">≈</span>}
          {value}
        </span>
        <span className="type-label mt-1 opacity-80">{unit}</span>
      </p>
    </div>
  );
}
