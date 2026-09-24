import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <h2 className="text-2xl">Projects</h2>
      <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <ImagePlaceholder
              width={project.cover.width}
              height={project.cover.height}
            />
            <h3 className="mt-4 text-lg group-hover:text-teal">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-ink/70">{project.tagline}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
