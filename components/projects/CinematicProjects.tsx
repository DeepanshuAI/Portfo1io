import Image from "next/image";
import { PROJECTS } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";

function ProjectLinks({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]">
      {project.href && (
        <a className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-[rgb(var(--accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]" href={project.href} target="_blank" rel="noreferrer">
          Visit live demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.repo && (
        <a className="inline-flex min-h-11 items-center gap-2 text-ink-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]" href={project.repo} target="_blank" rel="noreferrer">
          View source <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

function ProjectImage({ project, priority = false }: { project: (typeof PROJECTS)[number]; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-void-800 sm:aspect-[16/10]">
      <Image
        src={project.image}
        alt={`${project.title} project preview`}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 58vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.03]" />
    </div>
  );
}

export default function CinematicProjects() {
  const [lead, ...supporting] = PROJECTS;

  return (
    <div className="shell section-y">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title={<>Built with care, <span className="text-gradient">shown in context.</span></>}
        intro="Three independent projects. Explore the working demos and source repositories to see what is implemented."
      />

      <article className="group mt-12 overflow-hidden rounded-sm border border-white/10 bg-white/[0.025] md:mt-16">
        <ProjectImage project={lead} priority />
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.65fr)] md:items-start md:p-10">
          <div>
            <p className="label-tight text-[rgb(var(--accent))]">01 / {lead.category}</p>
            <h3 className="mt-3 font-display text-display-fluid-lg font-medium">{lead.title}</h3>
            <p className="mt-4 max-w-[58ch] text-body text-ink-muted">{lead.summary}</p>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-8">
            <p className="text-sm leading-relaxed text-ink/80">{lead.outcome}</p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-ink-muted">{lead.architecture}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${lead.title} technologies`}>
              {lead.stack.map((item) => <li key={item} className="border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">{item}</li>)}
            </ul>
            <ProjectLinks project={lead} />
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {supporting.map((project, index) => (
          <article key={project.id} className="group flex flex-col overflow-hidden border border-white/10 bg-white/[0.025]">
            <ProjectImage project={project} />
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="label-tight text-[rgb(var(--accent-2))]">{String(index + 2).padStart(2, "0")} / {project.category}</p>
              <h3 className="mt-3 font-display text-display-md font-medium">{project.title}</h3>
              <p className="mt-3 text-body-sm text-ink-muted">{project.summary}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">{project.outcome}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                {project.stack.map((item) => <li key={item} className="border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">{item}</li>)}
              </ul>
              <div className="mt-auto"><ProjectLinks project={project} /></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
