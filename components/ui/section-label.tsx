import type { ReactNode } from "react";

/** Small channel-style marker: colored tick + mono label. */
export function SectionLabel({ children, color = "var(--color-signal)" }: { children: ReactNode; color?: string }) {
  return (
    <p className="type-label flex items-center gap-2 text-ink/60">
      <span className="inline-block h-2 w-2" style={{ background: color }} />
      {children}
    </p>
  );
}
