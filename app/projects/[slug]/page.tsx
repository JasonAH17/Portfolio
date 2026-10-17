import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { GitHubIcon, HuggingFaceIcon } from "@/components/ui/icons";
import { ImpactBulletText } from "@/components/ui/impact-bullet";
import { ProjectThumb, accentVar } from "@/components/ui/project-thumb";
import { StatusBadge } from "@/components/ui/status-badge";
import { SiteImage, hasImage } from "@/components/ui/site-image";
import { projects, type ImageAsset } from "@/lib/data/projects";

// Very wide shots run full width, landscape takes two of four columns, portrait (phone) shots one.
function gallerySpan(image: ImageAsset) {
  const ratio = image.width / image.height;
  if (ratio > 1.8) return "col-span-2 sm:col-span-4";
  return ratio < 1 ? "col-span-1" : "col-span-2";
}

const loadDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function Figure({ image, alt, sizes, priority = false }: { image: ImageAsset; alt: string; sizes: string; priority?: boolean }) {
  return (
    <figure>
      <SiteImage src={image.src} width={image.width} height={image.height} alt={alt} sizes={sizes} priority={priority} />
      {image.caption && <figcaption className="mt-2 text-sm leading-snug text-ink/70">{image.caption}</figcaption>}
    </figure>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  return project
    ? { title: `${project.title} | Jason Alexander Harris`, description: project.tagline }
    : {};
}

function Block({
  id,
  label,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  /** Lets grids (e.g. features) use more width than prose. */
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} {...reveal()} className="grid gap-4 border-t border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h2 className="type-label pt-1 text-ink/70">{label}</h2>
      <div className={`min-w-0 ${wide ? "max-w-4xl" : "max-w-2xl"}`}>{children}</div>
    </section>
  );
}

/** Paragraph stack; `lead` sets the first paragraph larger as the section's key statement. */
function Prose({ paragraphs, lead = false, muted = false }: { paragraphs: string[]; lead?: boolean; muted?: boolean }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph.slice(0, 32)}
          className={
            lead && index === 0
              ? "text-lg leading-relaxed text-ink/90"
              : `leading-relaxed ${muted ? "text-sm text-ink/70" : "text-ink/75"}`
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const color = accentVar(project.accent);
  const others = projects.filter((p) => p.slug !== project.slug);
  const gallery = (project.gallery ?? []).filter((image) => hasImage(image.src));
  const showCover = hasImage(project.cover.src) || !gallery.length;
  // Phone screenshots only (no cover): show them beside the overview so they don't leave a half-empty row.
  const phoneGallery = !showCover && gallery.length > 0 && gallery.every((image) => image.height > image.width);
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "background", label: "Background" },
    { id: "solution", label: "Solution" },
    project.features && { id: "features", label: "Features" },
    project.dataset && { id: "dataset", label: "Dataset" },
    project.pipeline && { id: "how-it-works", label: project.pipelineLabel ?? "How it works" },
    { id: "impact", label: "Impact & results" },
    { id: "role", label: "My role" },
    project.stack && { id: "stack", label: project.stackLabel ?? "Tech stack" },
    { id: "learned", label: "What I learned" },
  ].filter((section): section is { id: string; label: string } => Boolean(section));
  const meta: [string, string][] = [
    ["Year", project.year],
    ...(project.team ? [["Team", project.team] as [string, string]] : []),
    ["Type", project.type],
    ["Role", project.role],
  ];

  return (
    <main className="flex flex-1 flex-col" style={{ "--channel": color } as CSSProperties}>
      {/* Header */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <Link href="/#projects" className="reveal type-label link-hover text-signal">
          <span aria-hidden="true" className="nudge nudge--left">
            ←
          </span>{" "}
          All projects
        </Link>

        <p className="reveal type-label mt-8 flex flex-wrap items-center gap-x-2 gap-y-1" style={{ color, ...loadDelay(60) }}>
          <span className="inline-block h-2 w-2 rounded-full bg-current" />
          {project.category}
          <StatusBadge status={project.status} />
          {project.badge && <span className="text-ink/70">{project.badge}</span>}
        </p>
        <h1 className="mask--load type-display mt-3 text-[clamp(2.75rem,9vw,6rem)]">
          <Mask>{project.title}</Mask>
        </h1>
        <p className="reveal mt-4 max-w-2xl text-xl leading-snug text-ink/75 sm:text-2xl" style={loadDelay(320)}>
          {project.tagline}
        </p>

        <dl
          style={loadDelay(420)}
          className={`reveal mt-8 grid overflow-hidden rounded-card border-t border-l border-border bg-panel sm:grid-cols-2 ${meta.length > 3 ? "lg:grid-cols-[10rem_1fr_1fr_1.3fr]" : "lg:grid-cols-[12rem_1fr_1.4fr]"}`}
        >
          {meta.map(([term, value]) => (
            <div key={term} className="border-r border-b border-border px-4 py-3">
              <dt className="type-label text-ink/70">{term}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-ink/85">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Cover: the real image if present; the placeholder only when there's nothing else to show. */}
        {showCover && (
          <div {...reveal(0, "wipe")} className="max-w-4xl">
            <Figure image={project.cover} alt={`${project.title} cover`} sizes="(min-width: 1024px) 896px, 100vw" priority />
          </div>
        )}
        {gallery.length > 0 && !phoneGallery && (
          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 first:mt-0">
            {gallery.map((image, index) => (
              <div key={image.src} {...reveal(index, "wipe")} className={gallerySpan(image)}>
                <Figure
                  image={image}
                  alt={image.caption ?? `${project.title} screenshot`}
                  sizes="(min-width: 640px) 448px, 100vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Contents: jump links to each section on long case studies. */}
        <nav {...reveal()} aria-label="On this page" className="mt-10 border-t border-border pt-6 first:mt-0">
          <p className="type-label text-ink/70">On this page</p>
          <ul className="type-label mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="link-hover text-ink/70 hover:text-ink">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          <Block id="overview" label="Overview" wide={phoneGallery}>
            {phoneGallery ? (
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
                <p className="text-lg leading-relaxed text-ink/85 sm:text-xl">{project.about}</p>
                <div className="grid grid-cols-2 gap-4">
                  {gallery.map((image, index) => (
                    <div key={image.src} {...reveal(index, "wipe")}>
                      <Figure image={image} alt={image.caption ?? `${project.title} screenshot`} sizes="192px" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-lg leading-relaxed text-ink/85 sm:text-xl">{project.about}</p>
            )}
          </Block>

          <Block id="background" label="Background problem">
            <Prose paragraphs={[project.problem, ...(project.background ?? [])]} lead />
          </Block>

          <Block id="solution" label="Solution">
            <Prose paragraphs={[project.solution, ...(project.solutionDetail ?? [])]} lead />
          </Block>

          {project.features && (
            <Block id="features" label="Key features" wide>
              <ul className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <li key={feature.title} {...reveal(index)} className="bg-panel p-5">
                    <p className="flex items-center gap-2 type-title">
                      <span className="inline-block h-1.5 w-1.5 shrink-0" style={{ background: color }} />
                      {feature.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{feature.detail}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.dataset && (
            <Block id="dataset" label="Dataset">
              <p className="text-xl type-title">
                {project.dataset.name}
              </p>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {project.dataset.facts.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[8rem_1fr] gap-4 py-2.5 sm:grid-cols-[10rem_1fr]">
                    <dt className="type-label pt-0.5 text-ink/70">{term}</dt>
                    <dd className="text-sm text-ink/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <Prose paragraphs={project.dataset.paragraphs} />
              </div>
            </Block>
          )}

          {project.pipeline && (
            <Block id="how-it-works" label={project.pipelineLabel ?? "How it works"}>
              {/* A process, so numbered steps are appropriate here (unlike projects). */}
              <ol className="relative space-y-6 border-l pl-6" style={{ borderColor: color }}>
                {project.pipeline.map((step, index) => (
                  <li key={step.title} className="relative">
                    <span
                      className="absolute top-1.5 -left-[29.5px] h-2.5 w-2.5 border-2 bg-paper"
                      style={{ borderColor: color }}
                    />
                    <p className="type-label" style={{ color }}>
                      {String(index + 1).padStart(2, "0")} {step.title}
                    </p>
                    <p className="mt-1.5 leading-relaxed text-ink/80">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          <Block id="impact" label="Impact & results">
            <ul className="space-y-3 leading-relaxed text-ink/85">
              {project.impact.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0" style={{ background: color }} />
                  <span>
                    <ImpactBulletText bullet={bullet} />
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="role" label="My role">
            <p className="leading-relaxed text-ink/85">{project.role}.</p>
          </Block>

          {project.stack && (
            <Block id="stack" label={project.stackLabel ?? "Tech stack"}>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li key={item} className="rounded-chip border border-border bg-panel px-2.5 py-1 font-mono text-xs text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.links.length > 0 && (
            <Block id="links" label="Links">
              <ul className="flex flex-wrap gap-2">
                {project.links.map((link) => {
                  const Icon = link.label.toLowerCase().includes("github") ? GitHubIcon : HuggingFaceIcon;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 rounded-control border border-ink/70 px-4 py-2.5 text-[0.95rem] font-medium text-ink hover:bg-ink/5"
                      >
                        <Icon className="text-[1.05em]" />
                        {link.label}
                        <span aria-hidden="true" className="nudge nudge--up text-[0.85em] opacity-70">
                          ↗
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Block>
          )}

          <Block id="learned" label="What I learned">
            <div
              className="space-y-5 font-serif text-[1.3rem] leading-[1.4] text-ink/90 italic sm:text-[1.5rem]"
              style={{ fontVariationSettings: '"opsz" 40' }}
            >
              {project.whatILearned.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Block>

          {project.references && (
            <Block id="references" label="References">
              <ol className="space-y-3 text-sm leading-relaxed text-ink/70">
                {project.references.map((reference) => (
                  <li key={reference}>{reference}</li>
                ))}
              </ol>
            </Block>
          )}
        </div>
      </div>

      {/* More projects: no prev/next, so no implied order */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <h2 className="type-title text-2xl">More projects</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {others.map((other, index) => (
              <li key={other.slug} {...reveal(index)}>
                <Link
                  href={`/projects/${other.slug}`}
                  className="live-group grid grid-cols-[7rem_1fr] items-center gap-4 border-t border-border py-4"
                  style={{ "--channel": accentVar(other.accent) } as CSSProperties}
                >
                  <ProjectThumb project={other} sizes="112px" />
                  <span>
                    <span className="type-label block" style={{ color: accentVar(other.accent) }}>
                      {other.category}
                    </span>
                    <span className="live-title type-title mt-1 block text-lg">{other.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
