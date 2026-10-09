import { SiteImage } from "@/components/ui/site-image";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { profile } from "@/lib/data/profile";

export function AboutSection() {
  const meta: [string, string][] = [
    ["Location", profile.location],
    ["Program", "B.CS — Artificial Intelligence"],
    ["Expected", "2028"],
    ["Languages", profile.languages.join(" · ")],
  ];

  return (
    <Section id="about" className="py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Chart header: who, where, what */}
        <aside className="lg:col-span-4">
          <SectionLabel>Notes</SectionLabel>
          <div className="mt-6 w-40 sm:w-48">
            <SiteImage
              src={profile.headshot.src}
              width={profile.headshot.width}
              height={profile.headshot.height}
              alt={profile.name}
              sizes="192px"
            />
          </div>
          <dl className="mt-6 max-w-xs divide-y divide-border border-y border-border">
            {meta.map(([term, value]) => (
              <div key={term} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="type-label text-ink/50">{term}</dt>
                <dd className="text-right text-sm text-ink/85">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="lg:col-span-8">
          <p className="font-serif text-[1.6rem] leading-[1.28] text-ink/90 italic sm:text-[2.1rem]" style={{ fontVariationSettings: '"opsz" 60' }}>
            {profile.about}
          </p>

          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="type-label text-ink/50">Education</h2>
              <ol className="mt-5 space-y-7">
                {profile.education.map((entry) => (
                  <li key={entry.institution}>
                    <p className="type-label text-ink/50">{entry.dates}</p>
                    <h3 className="mt-1.5 text-lg font-semibold">{entry.institution}</h3>
                    <p className="text-sm text-ink/70">{entry.program}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{entry.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="type-label text-ink/50">Skills</h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <li key={skill} className="border border-border px-2 py-1 font-mono text-xs text-ink/85">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="type-label text-ink/50">Core strengths</h2>
                <p className="mt-3 text-lg text-ink/85">{profile.coreStrengths.join(" · ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
