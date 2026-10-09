import type { CSSProperties } from "react";
import { Divider } from "@/components/ui/divider";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { profile } from "@/lib/data/profile";

export function HomeSection() {
  return (
    <>
      <header
        id="home"
        className="mx-auto w-full max-w-4xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-24"
      >
        <div className="flex items-start justify-between gap-6">
          <p
            className="reveal font-mono text-xs uppercase tracking-[0.2em] text-ink/60"
            style={{ "--reveal-delay": "0ms" } as CSSProperties}
          >
            {profile.location}
          </p>
          <ImagePlaceholder
            width={profile.headshot.width}
            height={profile.headshot.height}
            className="reveal w-20 shrink-0 sm:w-24"
            style={{ "--reveal-delay": "70ms" } as CSSProperties}
          />
        </div>

        <h1
          className="reveal mt-6 text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-tight"
          style={{ "--reveal-delay": "140ms" } as CSSProperties}
        >
          {profile.name}
        </h1>

        <p
          className="reveal mt-6 max-w-xl font-serif text-xl text-ink/70 italic sm:text-2xl"
          style={{ "--reveal-delay": "210ms" } as CSSProperties}
        >
          {profile.role} · {profile.university}
        </p>

        <div
          className="reveal mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wide text-teal"
          style={{ "--reveal-delay": "280ms" } as CSSProperties}
        >
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            GitHub
          </a>
          <a
            href={profile.huggingface}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            Hugging Face
          </a>
        </div>
      </header>

      <Divider />

      <Section divider={false}>
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
    </>
  );
}
