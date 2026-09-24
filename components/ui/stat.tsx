import type { ReactNode } from "react";

export function Stat({ children }: { children: ReactNode }) {
  return <span className="font-mono text-amber">{children}</span>;
}
