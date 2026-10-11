import type { CSSProperties, ReactNode } from "react";

/** A line of display type that slides up from behind a mask (see .mask in globals.css). */
export function Mask({ children, line = 0, className = "" }: { children: ReactNode; line?: number; className?: string }) {
  return (
    <span className={`mask ${className}`}>
      <span className="mask__inner" style={{ "--line": line } as CSSProperties}>
        {children}
      </span>
    </span>
  );
}
