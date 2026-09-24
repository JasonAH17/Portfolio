import type { ReactNode } from "react";
import { Divider } from "./divider";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  divider = true,
}: SectionProps) {
  return (
    <>
      {divider && <Divider />}
      <section
        id={id}
        className={`mx-auto w-full max-w-4xl px-6 py-20 text-left sm:py-24 ${className}`}
      >
        {children}
      </section>
    </>
  );
}
