import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/Section";
import { site, type Project } from "../config/site";

export function Projects() {
  const featured = site.projects.filter((p) => p.featured);
  const others = site.projects.filter((p) => !p.featured);

  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading index="02" title="作品" sub="正在做与做过的项目" />

        {/* 精选项目：大字行式布局 */}
        <div className="space-y-0">
          {featured.map((p, i) => (
            <FeaturedRow key={p.id} project={p} delay={i * 0.1} />
          ))}
        </div>

        {/* 其余项目：双列卡片 */}
        {others.length > 0 && (
          <div className="mt-16 grid gap-px bg-line md:grid-cols-2">
            {others.map((p, i) => (
              <Card key={p.id} project={p} delay={i * 0.08} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedRow({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/work/${project.id}`}
        className="group relative block border-t border-line py-10 transition-colors duration-500 hover:bg-mist/60 md:py-14"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-[11px] text-ink-faint">
              {project.year}
            </span>
            <h3 className="font-display text-5xl font-medium tracking-tight2 text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-7xl">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <p className="hidden text-[13px] text-ink-faint md:block md:max-w-[200px]">
              {project.subtitle}
            </p>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              →
            </span>
          </div>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-ink-soft md:max-w-xl">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}

function Card({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/work/${project.id}`}
        className="group flex h-full flex-col justify-between bg-paper p-8 transition-colors duration-500 hover:bg-mist"
      >
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-medium tracking-tight2 text-ink">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] text-ink-faint">
              {project.year}
            </span>
          </div>
          <p className="mt-2 text-[13px] text-ink-faint">{project.subtitle}</p>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="border border-line px-2 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
          <span className="text-[13px] text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
            View →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
