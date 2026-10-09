import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Readout } from "@/components/signal/readout";
import { Trace, channelVar } from "@/components/signal/trace";
import { ImpactBulletText } from "@/components/ui/impact-bullet";
import { SiteImage, hasImage } from "@/components/ui/site-image";
import { projects, type ImageAsset } from "@/lib/data/projects";

// Very wide shots run full width, landscape takes two of four columns, portrait (phone) shots one.
function gallerySpan(image: ImageAsset) {
  const ratio = image.width / image.height;
  if (ratio > 1.8) return "col-span-2 sm:col-span-4";
  return ratio < 1 ? "col-span-1" : "col-span-2";
}

function Figure({ image, alt, sizes }: { image: ImageAsset; alt: string; sizes: string }) {
  return (
    <figure>
      <SiteImage src={image.src} width={image.width} height={image.height} alt={alt} sizes={sizes} />
      {image.caption && <figcaption className="mt-2 text-sm leading-snug text-ink/60">{image.caption}</figcaption>}
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
    ? { title: `${project.title} — Jason Alexander Harris`, description: project.tagline }
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
    <section id={id} className="grid gap-4 border-t border-border py-10 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h2 className="type-label pt-1 text-ink/55">{label}</h2>
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

  const color = channelVar(project.channel.color);
  const others = projects.filter((p) => p.slug !== project.slug);
  const readouts = [project.readout, ...(project.extraReadouts ?? [])];
  const gallery = (project.gallery ?? []).filter((image) => hasImage(image.src));
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "background", label: "Background" },
    { id: "solution", label: "Solution" },
    project.features && { id: "features", label: "Features" },
    project.dataset && { id: "dataset", label: "Dataset" },
    project.pipeline && { id: "how-it-works", label: project.pipelineLabel ?? "How it works" },
    { id: "impact", label: "Impact & results" },
    project.training && { id: "training", label: "Training" },
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
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
        <Link href="/#projects" className="type-label link-hover text-signal">
          ← All projects
        </Link>

        <p className="type-label mt-10 flex items-center gap-2" style={{ color }}>
          <span className="inline-block h-2 w-2 bg-current" />
          {project.channel.label}
          {project.badge && <span className="text-ink/50">· {project.badge}</span>}
        </p>
        <h1 className="type-display mt-4 text-[clamp(3.25rem,13vw,9rem)]">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-xl leading-snug text-ink/75 sm:text-2xl">{project.tagline}</p>

        <dl
          className={`mt-10 grid border-t border-l border-border sm:grid-cols-2 ${meta.length > 3 ? "lg:grid-cols-[10rem_1fr_1fr_1.3fr]" : "lg:grid-cols-[12rem_1fr_1.4fr]"}`}
        >
          {meta.map(([term, value]) => (
            <div key={term} className="border-r border-b border-border px-4 py-3">
              <dt className="type-label text-ink/50">{term}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-ink/85">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Signal band */}
      <div className="mt-10 border-y border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 sm:grid-cols-[1fr_auto] sm:items-end sm:px-6">
          <Trace
            signal={project.channel.signal}
            color={project.channel.color}
            seed={project.channel.seed}
            mode="live"
            className="h-32 border border-border sm:h-44"
          />
          <div className="flex flex-wrap gap-x-10 gap-y-4 sm:flex-col">
            {readouts.map((readout) => (
              <Readout key={readout.unit} {...readout} color={project.channel.color} size="lg" />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Cover: the real image if present; the placeholder only when there's nothing else to show. */}
        {(hasImage(project.cover.src) || !gallery.length) && (
          <div className="max-w-4xl">
            <Figure image={project.cover} alt={`${project.title} cover`} sizes="(min-width: 1024px) 896px, 100vw" />
          </div>
        )}
        {gallery.length > 0 && (
          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 first:mt-0">
            {gallery.map((image) => (
              <div key={image.src} className={gallerySpan(image)}>
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
        <nav aria-label="On this page" className="mt-14 border-t border-border pt-6">
          <p className="type-label text-ink/45">On this page</p>
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
          <Block id="overview" label="Overview">
            <p className="text-lg leading-relaxed text-ink/85 sm:text-xl">{project.about}</p>
          </Block>

          <Block id="background" label="Background problem">
            <Prose paragraphs={[project.problem, ...(project.background ?? [])]} lead />
          </Block>

          <Block id="solution" label="Solution">
            <Prose paragraphs={[project.solution, ...(project.solutionDetail ?? [])]} lead />
          </Block>

          {project.features && (
            <Block id="features" label="Key features" wide>
              <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature.title} className="bg-paper p-5">
                    <p className="flex items-center gap-2 font-semibold" style={{ fontStretch: "85%" }}>
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
              <p className="text-xl font-semibold" style={{ fontStretch: "85%" }}>
                {project.dataset.name}
              </p>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {project.dataset.facts.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[8rem_1fr] gap-4 py-2.5 sm:grid-cols-[10rem_1fr]">
                    <dt className="type-label pt-0.5 text-ink/50">{term}</dt>
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
                      {String(index + 1).padStart(2, "0")} · {step.title}
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
            {project.resultsNote && (
              <div className="mt-6 border-l-2 pl-4" style={{ borderColor: color }}>
                <Prose paragraphs={project.resultsNote} muted />
              </div>
            )}
          </Block>

          {project.training && (
            <Block id="training" label="Model training">
              <p className="leading-relaxed text-ink/85">{project.training.summary}</p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse font-mono text-sm tabular-nums">
                  <thead>
                    <tr className="border-b border-border">
                      {project.training.columns.map((column) => (
                        <th key={column} scope="col" className="type-label py-2 pr-4 text-left font-normal text-ink/50">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {project.training.rows.map((row, rowIndex) => {
                      const isFinal = rowIndex === project.training!.rows.length - 1;
                      return (
                        <tr key={row[0]} className="border-b border-border">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`py-2 pr-4 ${cellIndex === 0 ? "text-ink/50" : isFinal ? "text-ink" : "text-ink/75"}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {project.training.note && <p className="mt-3 text-sm text-ink/55">{project.training.note}</p>}
            </Block>
          )}

          <Block id="role" label="My role">
            <p className="leading-relaxed text-ink/85">{project.role}.</p>
            <p className="type-label mt-3 text-ink/50">{project.type}</p>
          </Block>

          {project.stack && (
            <Block id="stack" label={project.stackLabel ?? "Tech stack"}>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li key={item} className="border border-border px-2 py-1 font-mono text-xs text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.links.length > 0 && (
            <Block id="links" label="Links">
              <ul className="type-label flex flex-wrap gap-x-6 gap-y-2 text-signal">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-hover">
                      {link.label} ↗
                    </a>
                  </li>
                ))}
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

      {/* Other channels: no prev/next, so no implied order */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="type-label text-ink/50">Other channels</h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/projects/${other.slug}`}
                  className="live-group grid grid-cols-[1fr_6rem] items-center gap-4 border-t border-border py-4"
                  style={{ "--channel": channelVar(other.channel.color) } as CSSProperties}
                >
                  <span>
                    <span className="type-label block" style={{ color: channelVar(other.channel.color) }}>
                      {other.channel.label}
                    </span>
                    <span className="live-title mt-1 block text-lg font-semibold" style={{ fontStretch: "85%" }}>
                      {other.title}
                    </span>
                  </span>
                  <Trace
                    signal={other.channel.signal}
                    color={other.channel.color}
                    seed={other.channel.seed}
                    className="h-10 border border-border"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="type-label mx-auto w-full max-w-6xl px-4 py-5 text-ink/45 sm:px-6">© 2026 · Jason Alexander Harris</div>
      </footer>
    </main>
  );
}
