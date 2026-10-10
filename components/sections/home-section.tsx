import type { CSSProperties } from "react";
import { SiteImage } from "@/components/ui/site-image";
import { profile } from "@/lib/data/profile";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/*
 * Layout: phone = name / photo + facts side by side / description.
 * Desktop (lg) = name with the photo beside it, then description with the facts under the photo.
 */
export function HomeSection() {
  const [first, middle, last] = profile.name.split(" ");

  const meta: [string, string][] = [
    ["Location", profile.location],
    ["Program", "B.CS — AI"],
    ["Expected", "2028"],
  ];

  const links: [string, string][] = [
    ["LinkedIn", profile.linkedin],
    ["GitHub", profile.github],
    ["Hugging Face", profile.huggingface],
  ];

  return (
    <header id="home" className="mx-auto w-full max-w-6xl px-4 pt-8 pb-20 sm:px-6 sm:pt-14 sm:pb-28">
      <p className="reveal type-label text-ink/55" style={delay(0)}>
        Computer Science · Artificial Intelligence
        <span className="hidden sm:inline"> — {profile.university}</span>
      </p>

      {/* Desktop columns: name | photo sized to the name's height (see --hero-photo in globals.css). */}
      <div className="mt-5 grid grid-cols-[8.5rem_1fr] gap-x-5 gap-y-8 sm:mt-6 sm:grid-cols-[11rem_1fr] sm:gap-x-6 lg:grid-cols-[1fr_var(--hero-photo)] lg:gap-x-8 lg:gap-y-12">
        <h1 className="reveal type-name col-span-2 lg:col-span-1" style={delay(80)}>
          <span className="block">{first}</span>
          <span className="block">{middle}</span>
          <span className="block text-signal">{last}</span>
        </h1>

        <div className="reveal lg:col-start-2 lg:row-start-1" style={delay(160)}>
          <SiteImage
            src={profile.headshot.src}
            width={profile.headshot.width}
            height={profile.headshot.height}
            alt={profile.name}
            sizes="(min-width: 1024px) 400px, 176px"
            priority
          />
        </div>

        <dl
          className="reveal self-end divide-y divide-border border-y border-border lg:col-start-2 lg:row-start-2 lg:self-start"
          style={delay(220)}
        >
          {meta.map(([term, value]) => (
            <div key={term} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-2.5">
              <dt className="type-label text-ink/50">{term}</dt>
              <dd className="text-sm text-ink/85 sm:text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="reveal col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2" style={delay(280)}>
          <p
            className="font-serif text-[1.5rem] leading-[1.3] text-ink/90 italic sm:text-[2rem]"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            {profile.about}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label inline-flex items-center gap-2 border border-border px-3 py-2 text-signal transition-colors hover:border-signal"
                >
                  {label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
