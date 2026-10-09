import type { CSSProperties } from "react";
import { SepsisMonitor } from "@/components/hero/sepsis-monitor";
import { profile } from "@/lib/data/profile";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export function HomeSection() {
  const [first, middle, last] = profile.name.split(" ");

  return (
    <header id="home" className="mx-auto w-full max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
      <p className="reveal type-label text-ink/55" style={delay(0)}>
        Computer Science · Artificial Intelligence
        <span className="hidden sm:inline"> — {profile.university}</span>
      </p>

      <h1 className="reveal type-name mt-5 sm:mt-6" style={delay(80)}>
        <span className="block">{first}</span>
        <span className="block">{middle}</span>
        <span className="block text-signal">{last}</span>
      </h1>

      {/* On desktop this row tucks up beside the last name line, so the monitor sits above the fold. */}
      <div className="mt-8 grid gap-8 sm:mt-14 sm:gap-10 xl:-mt-[calc(var(--name-size)*0.84)] lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5 xl:pt-[calc(var(--name-size)*0.84+3rem)]" style={delay(180)}>
          <p className="max-w-sm text-lg leading-snug text-ink/80 sm:text-xl">
            AI student at {profile.university}, building models for time series,
            language and vision, mostly where they meet medicine.
          </p>
          <ul className="type-label mt-6 flex flex-wrap gap-x-5 gap-y-2 text-signal">
            {[
              ["LinkedIn", profile.linkedin],
              ["GitHub", profile.github],
              ["Hugging Face", profile.huggingface],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="link-hover">
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7" style={delay(280)}>
          <SepsisMonitor className="lg:ml-auto lg:max-w-[520px]" />
        </div>
      </div>
    </header>
  );
}
