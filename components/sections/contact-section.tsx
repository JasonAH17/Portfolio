import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { CopyButton } from "@/components/ui/copy-button";
import { MailIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { contact } from "@/lib/data/contact";
import { profile } from "@/lib/data/profile";

/** Closing call to action: heading and email button on the left, every contact detail on the right. */
export function ContactSection() {
  return (
    <Section id="contact" className="py-14 sm:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="min-w-0 lg:col-span-6">
          <h2 {...reveal(0, "mask")} className="type-display text-[clamp(3rem,8vw,5.5rem)]">
            <Mask>Let&apos;s talk</Mask>
          </h2>
          <p {...reveal(1)} className="mt-5 max-w-md text-lg leading-snug text-ink/85">
            Open to internships, research collaborations, and interesting problems in AI.
          </p>
          <div {...reveal(2)} className="mt-8">
            <a
              href={`mailto:${profile.email}`}
              className="press sheen inline-flex items-center gap-2.5 rounded-control border border-signal bg-glow px-5 py-3 font-medium text-on-glow hover:border-ink hover:bg-ink hover:text-paper"
            >
              <MailIcon className="text-lg" />
              Email me
              <span aria-hidden="true" className="nudge nudge--right">
                →
              </span>
            </a>
          </div>
        </div>

        <ul {...reveal(2)} className="min-w-0 divide-y divide-border overflow-hidden rounded-card border border-border bg-panel lg:col-span-6">
          {contact.map((entry) => {
            const isExternal = entry.href.startsWith("http");
            return (
              <li key={entry.label} className="flex">
                <a
                  href={entry.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex min-w-0 flex-1 flex-col gap-1 px-5 py-4 transition-colors focus-visible:-outline-offset-2 hover:bg-paper/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="type-label shrink-0 text-ink/70">{entry.label}</span>
                  <span className="min-w-0 text-sm break-all text-ink group-hover:text-signal group-hover:underline group-hover:underline-offset-4 sm:truncate sm:break-normal">
                    {entry.value}
                  </span>
                </a>
                {/* A mailto link does nothing without a mail app, so the address can also be copied. */}
                {entry.label === "Email" && <CopyButton value={entry.value} label="Copy email address" />}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
