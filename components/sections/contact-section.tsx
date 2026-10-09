import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { contact } from "@/lib/data/contact";
import { profile } from "@/lib/data/profile";

export function ContactSection() {
  return (
    <>
      <Section id="contact" className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <SectionLabel>Get in touch</SectionLabel>
        <h2 className="type-display mt-4 text-[clamp(4rem,17vw,11rem)]">Let&apos;s talk.</h2>
        <p className="mt-6 max-w-md text-lg leading-snug text-ink/70">
          Open to internships, research collaborations, and interesting problems in AI.
        </p>

        <ul className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {contact.map((entry) => {
            const isExternal = entry.href.startsWith("http");
            return (
              <li key={entry.label} className="border-r border-b border-border">
                <a
                  href={entry.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group block px-4 py-4 transition-colors hover:bg-panel sm:px-5 sm:py-5"
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
