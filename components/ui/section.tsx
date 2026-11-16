import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Classes for the full-width <section> itself (className styles the inner content frame). */
  outerClassName?: string;
  /** Hairline on top. Sections choose their own header treatment; this is only the frame. */
  rule?: boolean;
};

export function Section({ id, children, className = "", outerClassName = "", rule = true }: SectionProps) {
  const outer = [rule ? "border-t border-border" : "", outerClassName].filter(Boolean).join(" ");
  return (
    <section id={id} className={outer || undefined}>
      <div className={`mx-auto w-full max-w-6xl px-4 text-left sm:px-6 ${className}`}>
        {children}
      </div>
    </section>
  );
}
