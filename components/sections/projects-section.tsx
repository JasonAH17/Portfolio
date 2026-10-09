import Link from "next/link";
import type { CSSProperties } from "react";
import { Readout } from "@/components/signal/readout";
import { Trace, channelVar } from "@/components/signal/trace";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { projects, type Project } from "@/lib/data/projects";

const channelStyle = (project: Project) =>
  ({ "--channel": channelVar(project.channel.color) }) as CSSProperties;

function ChannelTag({ project }: { project: Project }) {
  return (
    <p className="type-label flex items-center gap-2" style={{ color: channelVar(project.channel.color) }}>
      <span className="inline-block h-2 w-2 bg-current" />
      {project.channel.label}
      <span className="text-ink/45">· {project.year}</span>
    </p>
  );
}

function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

function PrimaryChannel({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="live-group block border-t border-border py-10 sm:py-14"
      style={channelStyle(project)}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <ChannelTag project={project} />
          {project.badge && (
            <p className="type-label mt-4 inline-block border border-current px-2 py-1 text-signal">{project.badge}</p>
          )}
          <h3 className="live-title type-display mt-5 text-[clamp(2.75rem,8vw,4.75rem)]">{project.title}</h3>
          <p className="mt-3 max-w-sm text-lg leading-snug text-ink/75">{project.tagline}</p>
          <p className="type-label mt-6 text-ink/55">Read case study →</p>
        </div>
        <div className="lg:col-span-8">
          <Trace
            signal={project.channel.signal}
            color={project.channel.color}
            seed={project.channel.seed}
            className="h-44 border border-border sm:h-64"
          />
          <div className="mt-4 flex items-end justify-between gap-4">
            <p className="type-label max-w-xs text-ink/50">{project.specLine}</p>
            <Readout {...project.readout} color={project.channel.color} size="lg" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SecondaryChannel({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="live-group block border-t border-border py-10 sm:py-14"
      style={channelStyle(project)}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <ChannelTag project={project} />
          <h3 className="live-title type-display mt-5 text-[clamp(2.4rem,6.5vw,3.75rem)]">{project.title}</h3>
          <p className="mt-3 max-w-md text-lg leading-snug text-ink/75">{project.tagline}</p>
          <p className="mt-5 max-w-md border-l-2 pl-4 font-serif text-lg leading-snug text-ink/70 italic" style={{ borderColor: "var(--channel)" }}>
            {firstSentence(project.problem)}
          </p>
          <p className="type-label mt-6 text-ink/55">Read case study →</p>
        </div>
        <div className="lg:col-span-7">
          <Trace
            signal={project.channel.signal}
            color={project.channel.color}
            seed={project.channel.seed}
            className="h-32 border border-border sm:h-40"
          />
          <div className="mt-4 flex flex-wrap items-end justify-end gap-x-10 gap-y-4">
            {[project.readout, ...(project.extraReadouts ?? [])].map((readout) => (
              <Readout key={readout.unit} {...readout} color={project.channel.color} size="md" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ChannelRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="live-group grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 border-t border-border py-7 sm:grid-cols-[13rem_1fr_10rem] sm:items-center sm:gap-x-8"
      style={channelStyle(project)}
    >
      <div>
        <ChannelTag project={project} />
        <h3 className="live-title mt-2 text-xl font-semibold" style={{ fontStretch: "85%" }}>{project.title}</h3>
      </div>
      <Readout
        {...project.readout}
        color={project.channel.color}
        size="sm"
        className="self-end sm:order-last sm:self-center sm:justify-self-end"
      />
      <Trace
        signal={project.channel.signal}
        color={project.channel.color}
        seed={project.channel.seed}
        className="col-span-2 h-16 border border-border sm:col-span-1 sm:h-20"
      />
    </Link>
  );
}

export function ProjectsSection() {
  const primary = projects.filter((p) => p.tier === "primary");
  const secondary = projects.filter((p) => p.tier === "secondary");
  const rest = projects.filter((p) => !p.tier);

  return (
    <Section id="projects" className="pt-20 pb-10 sm:pt-28">
      <SectionLabel>{projects.length} channels</SectionLabel>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 className="type-display text-[clamp(3.75rem,15vw,10rem)]">Projects</h2>
        <p className="max-w-xs pb-2 text-sm text-ink/60">
          Each trace is drawn from the kind of data the project worked with.
        </p>
      </div>

      <div className="mt-10">
        {primary.map((project) => (
          <PrimaryChannel key={project.slug} project={project} />
        ))}
        {secondary.map((project) => (
          <SecondaryChannel key={project.slug} project={project} />
        ))}
        {rest.map((project) => (
          <ChannelRow key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
