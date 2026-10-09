import { Section } from "@/components/ui/section";
import { contact } from "@/lib/data/contact";

export function ContactSection() {
  return (
    <Section id="contact">
      <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
        Get in touch
      </p>
      <h2 className="mt-2 text-4xl sm:text-5xl">Let&apos;s talk.</h2>
      <p className="mt-3 max-w-md text-base text-ink/70">
        Open to internships, research collaborations, and interesting
        problems in AI.
      </p>

      <ul className="mt-10 grid max-w-2xl gap-x-10 gap-y-1 sm:grid-cols-2">
        {contact.map((entry) => {
          const isExternal = entry.href.startsWith("http");
          return (
            <li
              key={entry.label}
              className="flex items-baseline justify-between gap-4 border-b border-border py-3"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
                {entry.label}
              </span>
              <a
                href={entry.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="link-hover font-mono text-sm text-teal"
              >
                {entry.value}
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
