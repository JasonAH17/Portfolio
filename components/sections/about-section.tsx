import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/lib/data/profile";

/** Education, strengths, languages and grouped skills; the intro and photo live in the hero. */
export function AboutSection() {
  return (
    <Section id="about" className="py-14 sm:py-20">
      <h2 {...reveal(0, "mask")} className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
        <Mask>
          About me
        </Mask>
      </h2>

      <p {...reveal(1)} className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85 sm:text-xl">
        {profile.about}
      </p>

      <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 {...reveal()} className="type-label text-ink/70">
            Education
          </h3>
          <ol className="mt-6 space-y-8">
            {profile.education.map((entry, index) => (
              <li key={entry.institution} {...reveal(index + 1)} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <p className="type-label pt-1 text-ink/70">{entry.dates}</p>
                <div>
                  <p className="text-xl type-title">
                    {entry.institution}
                  </p>
                  <p className="text-sm text-ink/70">{entry.program}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/85">{entry.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div {...reveal(1)}>
            <h3 className="type-label text-ink/70">Core strengths</h3>
            <ul className="mt-3 space-y-1.5 text-lg text-ink/85">
              {profile.coreStrengths.map((strength) => (
                <li key={strength} className="flex items-center gap-2.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div {...reveal(2)}>
            <h3 className="type-label text-ink/70">Languages</h3>
            <p className="mt-3 text-ink/85">{profile.languages.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Technical skills, grouped. Tools listed are the ones the projects actually used. */}
      <div {...reveal()} className="mt-10 rounded-card border border-border bg-panel p-6 sm:p-8">
        <h3 className="type-title text-2xl">Skills</h3>
        <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skillGroups.map((group, index) => (
            <div key={group.label} {...reveal(index + 1)}>
              <p className="type-label text-ink/70">{group.label}</p>
              <p className="mt-2 leading-relaxed text-ink/85">{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
