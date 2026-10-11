import type { CSSProperties } from "react";

type RevealKind = "" | "mask" | "wipe" | "rail";

/**
 * Props that opt an element into the scroll reveal (see RevealObserver and globals.css).
 * `i` staggers siblings by 70ms each; it is capped so long lists never feel slow.
 */
export function reveal(i = 0, kind: RevealKind = "") {
  return {
    "data-reveal": kind,
    style: { "--i": Math.min(i, 6) } as CSSProperties,
  };
}
