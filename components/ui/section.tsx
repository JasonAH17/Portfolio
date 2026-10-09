import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Hairline on top. Sections choose their own header treatment; this is only the frame. */
  rule?: boolean;
};

export function Section({ id, children, className = "", rule = true }: SectionProps) {
  return (
    <section id={id} className={rule ? "border-t border-border" : undefined}>
      <div className={`mx-auto w-full max-w-6xl px-4 text-left sm:px-6 ${className}`}>
        {children}
      </div>
    </section>
  );
}
