import Link from "next/link";
import { reveal } from "@/components/motion/reveal";
import { profile } from "@/lib/data/profile";
import { GitHubIcon, HuggingFaceIcon, LinkedInIcon, MailIcon } from "./icons";

const explore = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "Hugging Face", href: profile.huggingface, Icon: HuggingFaceIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
];

/** Closing footer shared by the home page and case studies. */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-border bg-panel">
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-14">
        <p {...reveal()} className="type-label text-signal">
          The end
        </p>
        <p {...reveal(1)} className="type-display mt-3 text-[clamp(2rem,5vw,3.25rem)]">
          Thanks for reading.
        </p>

        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div {...reveal(1)} className="lg:col-span-5">
            <p className="type-title text-xl">{profile.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
              {profile.role}, {profile.university}. Based in {profile.location}.
            </p>
          </div>

          <nav {...reveal(2)} aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="type-label text-ink/70">Explore</p>
            <ul className="mt-3 space-y-2">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-hover text-sm text-ink/80 hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div {...reveal(3)} className="lg:col-span-3">
            <p className="type-label text-ink/70">Elsewhere</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map(({ label, href, Icon }) => {
                const external = href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      title={label}
                      className="press grid h-10 w-10 place-items-center rounded-control border border-border bg-paper text-ink/80 hover:border-signal hover:text-signal"
                    >
                      <Icon className="text-base" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="type-label text-ink/70">© 2026 {profile.name}</p>
          <a
            href="#"
            className="press type-label inline-flex items-center gap-1.5 rounded-control border border-border px-3 py-1.5 text-ink/70 hover:text-ink"
          >
            Back to top
            <span aria-hidden="true" className="nudge nudge--up">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
