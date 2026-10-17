import Link from "next/link";
import type { CSSProperties } from "react";
import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { ProjectThumb, accentVar } from "@/components/ui/project-thumb";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { projects, type Project } from "@/lib/data/projects";

const accentStyle = (project: Project) => ({ "--channel": accentVar(project.accent) }) as CSSProperties;

function Category({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <p className="type-label flex items-center gap-2" style={{ color: accentVar(project.accent) }}>
        <span className="inline-block h-2 w-2 rounded-full bg-current" />
        {project.category}
      </p>
      <StatusBadge status={project.status} />
    </div>
  );
}

/** Project type and date, e.g. "Group project, May 2026". */
function Meta({ project }: { project: Project }) {
  return (
    <p className="type-label text-ink/70">
      {project.kind}, {project.year}
    </p>
  );
}

function Tools({ project, limit = 4 }: { project: Project; limit?: number }) {
  if (!project.stack) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {project.stack.slice(0, limit).map((item) => (
        <li key={item} className="rounded-chip border border-border bg-panel px-2 py-0.5 font-mono text-[0.7rem] text-ink/75">
          {item}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyLink() {
  return (
    <p className="type-label text-ink/70">
      Read case study{" "}
      <span aria-hidden="true" className="nudge nudge--right">
        →
      </span>
    </p>
  );
}

/** Sepsis Guard: text on the left, its dashboard on the right. */
function PrimaryProject({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="live-group block border-t border-border py-10" style={accentStyle(project)}>
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Category project={project} />
          {project.badge && (
            <p className="type-label mt-3 inline-block rounded-chip border border-current px-2 py-1 text-signal">{project.badge}</p>
          )}
          <h3 className="live-title type-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)]">{project.title}</h3>
          <p className="mt-3 text-lg leading-snug text-ink/75">{project.tagline}</p>
          <p className="mt-3 leading-relaxed text-ink/70">{project.about}</p>
          <div className="mt-5 space-y-4">
            <Meta project={project} />
            <Tools project={project} />
            <CaseStudyLink />
          </div>
        </div>
        <ProjectThumb project={project} sizes="(min-width: 1024px) 640px, 100vw" className="order-first lg:order-none lg:col-span-7" />
      </div>
    </Link>
  );
}

/** MindCheck: mirrored, with the screenshot on the left. */
function SecondaryProject({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="live-group block border-t border-border py-10" style={accentStyle(project)}>
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <ProjectThumb project={project} sizes="(min-width: 1024px) 460px, 100vw" className="lg:col-span-5" />
        <div className="lg:col-span-7">
          <Category project={project} />
          <h3 className="live-title type-display mt-4 text-[clamp(2rem,4.5vw,3rem)]">{project.title}</h3>
          <p className="mt-3 text-lg leading-snug text-ink/75">{project.tagline}</p>
          <p className="mt-3 leading-relaxed text-ink/70">{project.about}</p>
          <div className="mt-5 space-y-4">
            <Meta project={project} />
            <Tools project={project} />
            <CaseStudyLink />
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Everything else: a compact row with a small screenshot. */
function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="live-group grid gap-5 border-t border-border py-7 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-8"
      style={accentStyle(project)}
    >
      <ProjectThumb project={project} sizes="(min-width: 640px) 192px, 100vw" />
      <div className="min-w-0">
        <Category project={project} />
        <h3 className="live-title type-title mt-2 text-2xl">{project.title}</h3>
        <p className="mt-1 text-ink/75">{project.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Meta project={project} />
          <Tools project={project} limit={3} />
        </div>
      </div>
      <span
        aria-hidden="true"
        className="row-arrow hidden h-10 w-10 place-items-center rounded-full border border-border text-ink/70 sm:grid"
      >
        →
      </span>
    </Link>
  );
}

export function ProjectsSection() {
  const primary = projects.filter((p) => p.tier === "primary");
  const secondary = projects.filter((p) => p.tier === "secondary");
  const rest = projects.filter((p) => !p.tier);

  return (
    <Section id="projects" className="pt-14 pb-6 sm:pt-20">
      <h2 {...reveal(0, "mask")} className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
        <Mask>Projects</Mask>
      </h2>

      <div className="mt-8">
        {/* Reveal wrappers sit outside the links so the entrance transition never fights the press feedback. */}
        {primary.map((project) => (
          <div key={project.slug} {...reveal()}>
            <PrimaryProject project={project} />
          </div>
        ))}
        {secondary.map((project) => (
          <div key={project.slug} {...reveal()}>
            <SecondaryProject project={project} />
          </div>
        ))}
        {rest.map((project, index) => (
          <div key={project.slug} {...reveal(index)}>
            <ProjectRow project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
}
