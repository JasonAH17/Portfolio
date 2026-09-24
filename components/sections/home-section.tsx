import { Divider } from "@/components/ui/divider";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { profile } from "@/lib/data/profile";

export function HomeSection() {
  return (
    <Section id="home" divider={false} className="pt-24">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <ImagePlaceholder
          width={profile.headshot.width}
          height={profile.headshot.height}
          className="w-40 shrink-0 sm:w-48"
        />
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
            {profile.location}
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-lg text-ink/80">
            {profile.role} · {profile.university}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wide text-teal">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href={profile.huggingface}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hugging Face
            </a>
          </div>
        </div>
      </div>

      <Divider className="my-10" />

      <p className="max-w-2xl text-base leading-relaxed text-ink/90">
        {profile.about}
      </p>

      <Divider className="my-10" />

      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-xl">Education</h2>
          <div className="mt-5 space-y-6">
            {profile.education.map((entry) => (
              <div key={entry.institution}>
                <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
                  {entry.dates}
                </p>
                <h3 className="mt-1 text-base font-medium">
                  {entry.institution}
                </h3>
                <p className="text-sm text-ink/70">{entry.program}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl">Skills</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li
                  key={skill}
                  className="border border-border px-2 py-1 font-mono text-xs text-ink/80"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl">Core Strengths</h2>
            <ul className="mt-4 space-y-1 text-sm text-ink/80">
              {profile.coreStrengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl">Languages</h2>
            <ul className="mt-4 space-y-1 text-sm text-ink/80">
              {profile.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
