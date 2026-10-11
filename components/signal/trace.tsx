import type { CSSProperties } from "react";
import {
  VIEW_H,
  VIEW_W,
  bandPath,
  bars,
  barsPath,
  dotsPath,
  ecg,
  envelope,
  linePath,
  sigmoid,
  sparse,
  stepPath,
  steps,
  type SignalKind,
} from "@/lib/signals";
import { InView } from "./in-view";

import type { ChannelColor } from "@/lib/data/projects";

export type { ChannelColor };

export const channelVar = (color: ChannelColor) => `var(--color-ch-${color})`;

type TraceProps = {
  signal: SignalKind;
  color: ChannelColor;
  seed?: number;
  className?: string;
  /** "reveal": sweep once on enter, loop on hover of a parent .live-group. "live": loop always. */
  mode?: "reveal" | "live";
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  vectorEffect: "non-scaling-stroke",
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

function Shapes({ signal, seed }: { signal: SignalKind; seed: number }) {
  switch (signal) {
    case "ecg":
      return <path d={linePath(ecg(6, 90, seed))} {...stroke} strokeWidth={1.6} />;
    case "sparse":
      return (
        <>
          {sparse(seed).map((series, i) => (
            <g key={i} opacity={1 - i * 0.22}>
              <path d={stepPath(series)} {...stroke} strokeWidth={1} opacity={0.35} />
              <path d={dotsPath(series)} {...stroke} strokeWidth={4.5} />
            </g>
          ))}
        </>
      );
    case "envelope": {
      const points = envelope(seed);
      return (
        <>
          <path d={bandPath(points)} fill="currentColor" opacity={0.12} />
          <path d={bandPath(points)} {...stroke} strokeWidth={1.2} />
        </>
      );
    }
    case "bars":
      return (
        <>
          <path
            d={`M0 ${VIEW_H * 0.5}H${VIEW_W}`}
            {...stroke}
            strokeWidth={1}
            strokeDasharray="4 5"
            opacity={0.5}
          />
          <path d={barsPath(bars(seed))} {...stroke} strokeLinecap="butt" strokeWidth={3} />
        </>
      );
    case "sigmoid": {
      const { curve, samples } = sigmoid(seed);
      return (
        <>
          <path d={dotsPath(samples)} {...stroke} strokeWidth={4} opacity={0.55} />
          <path d={linePath(curve)} {...stroke} strokeWidth={1.8} />
        </>
      );
    }
    case "steps":
      return <path d={stepPath(steps(seed))} {...stroke} strokeWidth={1.6} />;
  }
}

export function Trace({ signal, color, seed = 11, className = "", mode = "reveal" }: TraceProps) {
  return (
    <InView
      className={`trace ecg-grid rounded-card ${className}`}
      style={{ color: channelVar(color) } as CSSProperties}
      live={mode === "live"}
    >
      <svg
        className="trace__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
      >
        <g className="phosphor">
          <Shapes signal={signal} seed={seed} />
        </g>
      </svg>
      <span className="trace__cover" />
      <span className="trace__gap" />
    </InView>
  );
}
