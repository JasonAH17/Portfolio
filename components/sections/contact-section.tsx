import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { MailIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { contact } from "@/lib/data/contact";
import { profile } from "@/lib/data/profile";

export function ContactSection() {
  return (
    <>
      <Section id="contact" className="py-14 sm:py-20">
        <div {...reveal()}>
          <SectionLabel>Get in touch</SectionLabel>
        </div>
        <h2 {...reveal(0, "mask")} className="type-display mt-3 text-[clamp(3rem,10vw,6rem)]">
          <Mask>Let&apos;s talk.</Mask>
        </h2>
        <p {...reveal(2)} className="mt-6 max-w-md text-lg leading-snug text-ink/70">
          Open to internships, research collaborations, and interesting problems in AI.
        </p>
        <div {...reveal(3)} className="mt-8">
          <a
            href={`mailto:${profile.email}`}
            className="press inline-flex items-center gap-2.5 rounded-control border border-signal bg-signal px-5 py-3 font-medium text-paper hover:border-ink hover:bg-ink"
          >
            <MailIcon className="text-lg" />
            Email me
            <span aria-hidden="true" className="nudge nudge--right">
              →
            </span>
          </a>
        </div>

        <ul className="mt-10 grid overflow-hidden rounded-card border-t border-l border-border bg-panel sm:grid-cols-2 lg:grid-cols-3">
          {contact.map((entry, index) => {
            const isExternal = entry.href.startsWith("http");
            return (
              <li key={entry.label} {...reveal(index + 1)} className="border-r border-b border-border">
                <a
                  href={entry.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="press group block px-4 py-4 hover:bg-paper sm:px-5 sm:py-5"
                >
                  <span className="type-label text-ink/50">{entry.label}</span>
                  <span className="mt-2 block font-mono text-sm break-all text-signal group-hover:underline group-hover:underline-offset-4">
                    {entry.value}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

    </>
  );
}
