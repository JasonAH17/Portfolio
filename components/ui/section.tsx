import type { ReactNode } from "react";
import { Divider } from "./divider";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
  compact?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  divider = true,
  compact = false,
}: SectionProps) {
  return (
    <>
      {divider && <Divider />}
      <section
        id={id}
        className={`mx-auto w-full max-w-4xl px-6 text-left ${compact ? "py-14 sm:py-16" : "py-20 sm:py-24"} ${className}`}
      >
        {children}
      </section>
    </>
  );
}
