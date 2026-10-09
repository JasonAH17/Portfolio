import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ImpactBulletText } from "@/components/ui/impact-bullet";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";

export function ProjectsSection() {
  const featured = projects.find((project) => project.slug === "sepsis-guard");
  const rest = projects.filter((project) => project.slug !== "sepsis-guard");

  return (
    <Section id="projects">
      <h2 className="text-3xl sm:text-4xl">Projects</h2>

      {featured && (
        <Link
          href={`/projects/${featured.slug}`}
          className="project-card mt-10 block lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
        >
          <ImagePlaceholder
            width={featured.cover.width}
            height={featured.cover.height}
          />
          <div className="mt-6 lg:mt-0">
            <p className="font-mono text-xs uppercase tracking-wide text-teal">
              International AI Hackathon · Grand Finalist
            </p>
            <h3 className="project-card__title mt-3 text-2xl sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-2 max-w-md text-base text-ink/70">
              {featured.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
              <ImpactBulletText bullet={featured.impact[0]} />
            </p>
          </div>
        </Link>
      )}

      <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-border pt-14 sm:grid-cols-2">
        {rest.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-card block"
          >
            <ImagePlaceholder
              width={project.cover.width}
              height={project.cover.height}
            />
            <h3 className="project-card__title mt-4 text-base">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-ink/70">{project.tagline}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
