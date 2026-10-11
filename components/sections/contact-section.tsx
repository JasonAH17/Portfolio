import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { contact } from "@/lib/data/contact";
import { profile } from "@/lib/data/profile";

export function ContactSection() {
  return (
    <>
      <Section id="contact" className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div {...reveal()}>
          <SectionLabel>Get in touch</SectionLabel>
        </div>
        <h2 {...reveal(0, "mask")} className="type-display mt-4 text-[clamp(4rem,17vw,11rem)]">
          <Mask>Let&apos;s talk.</Mask>
        </h2>
        <p {...reveal(2)} className="mt-6 max-w-md text-lg leading-snug text-ink/70">
          Open to internships, research collaborations, and interesting problems in AI.
        </p>

        <ul className="mt-12 grid overflow-hidden rounded-card border-t border-l border-border bg-panel sm:grid-cols-2 lg:grid-cols-3">
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

      <footer className="border-t border-border">
        <div className="type-label mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-x-6 gap-y-2 px-4 py-5 text-ink/45 sm:px-6">
          <span>© 2026 · {profile.name}</span>
          <span>{profile.location} · Built with Next.js</span>
        </div>
      </footer>
    </>
  );
}
