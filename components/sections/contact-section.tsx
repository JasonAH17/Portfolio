import { Section } from "@/components/ui/section";
import { contact } from "@/lib/data/contact";

export function ContactSection() {
  return (
    <Section id="contact">
      <h2 className="text-2xl">Contact</h2>
      <ul className="mt-8 max-w-md divide-y divide-border">
        {contact.map((entry) => {
          const isExternal = entry.href.startsWith("http");
          return (
            <li
              key={entry.label}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
                {entry.label}
              </span>
              <a
                href={entry.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="font-mono text-sm text-teal"
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
