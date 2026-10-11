import type { CSSProperties } from "react";
import { Mask } from "@/components/motion/mask";
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
      <p className="reveal type-label text-signal" style={delay(0)}>
        Computer Science · Artificial Intelligence
        <span className="hidden sm:inline"> — {profile.university}</span>
      </p>

      {/* Desktop columns: name | photo sized to the name's height (see --hero-photo in globals.css). */}
      <div className="mt-5 grid grid-cols-[8.5rem_1fr] gap-x-5 gap-y-8 sm:mt-6 sm:grid-cols-[11rem_1fr] sm:gap-x-6 lg:grid-cols-[1fr_var(--hero-photo)] lg:gap-x-8 lg:gap-y-12">
        {/* Each name line rises from behind a mask on load (CSS only, so it never waits on JS). */}
        <h1 className="mask--load type-name col-span-2 lg:col-span-1" aria-label={profile.name}>
          <Mask line={0}>{first}</Mask>
          <Mask line={1}>{middle}</Mask>
          <Mask line={2}>{last}</Mask>
        </h1>

        <div className="wipe--load lg:col-start-2 lg:row-start-1" style={delay(320)}>
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
          style={delay(520)}
        >
          {meta.map(([term, value]) => (
            <div key={term} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-2.5">
              <dt className="type-label text-ink/50">{term}</dt>
              <dd className="text-sm text-ink/85 sm:text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="reveal col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2" style={delay(440)}>
          <p className="max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">
            {profile.about}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {/* First link is the primary action (filled), the rest are outlined, as in the latte mockup. */}
            {links.map(([label, href], index) => (
              <li key={label} className="reveal" style={delay(620 + index * 60)}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`press inline-flex items-center gap-2 rounded-control border px-4 py-2.5 text-[0.95rem] font-medium ${index === 0 ? "border-signal bg-signal text-paper hover:bg-ink hover:border-ink" : "border-ink/70 text-ink hover:bg-ink/5"}`}
                >
                  {label}{" "}
                  <span aria-hidden="true" className="nudge nudge--up">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
