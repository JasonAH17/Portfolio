import type { ReactNode } from "react";

/** A highlighted figure inside running text: same font as the sentence, set apart by colour and weight. */
export function Stat({ children }: { children: ReactNode }) {
  return <span className="font-medium text-amber">{children}</span>;
}
