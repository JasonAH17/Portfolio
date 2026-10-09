import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider } from "@/components/ui/divider";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ImpactBulletText } from "@/components/ui/impact-bullet";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <Section divider={false} className="pt-24">
        <Link
          href="/#projects"
          className="link-hover font-mono text-xs uppercase tracking-wide text-teal"
        >
          ← Projects
        </Link>

        <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/60">
          {project.year} · {project.type}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{project.title}</h1>
        <p className="mt-2 text-lg text-ink/80">{project.tagline}</p>

        <div className="mt-8 max-w-3xl">
          <ImagePlaceholder
            width={project.cover.width}
            height={project.cover.height}
          />
        </div>

        {project.gallery && (
          <div className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-2">
            {project.gallery.map((image) => (
              <ImagePlaceholder
                key={image.src}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
        )}

        <Divider className="my-10" />

        <div className="max-w-2xl space-y-10">
          <div>
            <h2 className="text-xl">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/90">
              {project.about}
            </p>
          </div>
          <div>
            <h2 className="text-xl">Problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/90">
              {project.problem}
            </p>
          </div>
          <div>
            <h2 className="text-xl">Solution</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/90">
              {project.solution}
            </p>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="grid gap-10 sm:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-xl">Details</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wide text-ink/60">
                  Role
                </dt>
                <dd className="mt-1 text-ink/90">{project.role}</dd>
              </div>
              {project.links.length > 0 && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-ink/60">
                    Links
                  </dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-teal"
                      >
                        {link.label}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h2 className="text-xl">Impact &amp; Results</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/90">
              {project.impact.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  <span>
                    <ImpactBulletText bullet={bullet} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="max-w-2xl">
          <h2 className="text-xl">What I Learned</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/90">
            {project.whatILearned}
          </p>
        </div>
      </Section>
    </div>
  );
}
