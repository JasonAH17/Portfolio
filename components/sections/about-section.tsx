import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { profile } from "@/lib/data/profile";

/** Education, skills, strengths and languages; the intro and photo live in the hero. */
export function AboutSection() {
  return (
    <Section id="about" className="py-20 sm:py-28">
      <div {...reveal()}>
        <SectionLabel>Background</SectionLabel>
      </div>
      <h2 {...reveal(0, "mask")} className="type-display mt-4 text-[clamp(2.75rem,10vw,6rem)]">
        <Mask>
          Education <span className="whitespace-nowrap">&amp; Skills</span>
        </Mask>
      </h2>

      <div className="mt-12 grid gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 {...reveal()} className="type-label text-ink/50">
            Education
          </h3>
          <ol className="mt-5 divide-y divide-border border-y border-border">
            {profile.education.map((entry, index) => (
              <li key={entry.institution} {...reveal(index + 1)} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <p className="type-label pt-1 text-ink/50">{entry.dates}</p>
                <div>
                  <p className="text-xl type-title">
                    {entry.institution}
                  </p>
                  <p className="text-sm text-ink/70">{entry.program}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{entry.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div {...reveal(1)}>
            <h3 className="type-label text-ink/50">Skills</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <li key={skill} className="rounded-chip border border-border bg-panel px-2.5 py-1 font-mono text-xs text-ink/85">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div {...reveal(2)}>
            <h3 className="type-label text-ink/50">Core strengths</h3>
            <ul className="mt-3 space-y-1.5 text-lg text-ink/85">
              {profile.coreStrengths.map((strength) => (
                <li key={strength} className="flex items-center gap-2.5">
                  <span className="inline-block h-1.5 w-1.5 bg-signal" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div {...reveal(3)}>
            <h3 className="type-label text-ink/50">Languages</h3>
            <p className="mt-3 text-ink/85">{profile.languages.join(" · ")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
