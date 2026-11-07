import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Reveal } from "../components/Reveal";
import { site, type Project } from "../config/site";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = site.projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/work" replace />;

  const next = getNextProject(project);

  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* 面包屑 */}
        <Reveal>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            全部作品
          </Link>
        </Reveal>

        {/* 标题区 */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-6xl font-medium tracking-tight2 text-ink md:text-8xl">
              {project.title}
            </h1>
            <div className="flex flex-col items-start gap-1 pb-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {project.year}
              </span>
              <span className="text-[13px] text-ink-soft">{project.role}</span>
            </div>
          </div>
        </Reveal>

        {/* 副标题 + 描述 */}
        <Reveal delay={0.2} className="mt-10">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight2 text-ink-soft md:text-3xl">
            {project.subtitle}
          </p>
          <p className="mt-6 max-w-prose2 text-[15px] leading-[1.85] text-ink-soft">
            {project.description}
          </p>
        </Reveal>

        {/* 视觉占位：抽象视觉，避免空洞 */}
        <Reveal delay={0.3} className="mt-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141417]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(96,104,255,0.35), transparent 70%), radial-gradient(ellipse 50% 45% at 75% 65%, rgba(255,120,190,0.28), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-50 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141417] to-transparent"
            />
            <div className="absolute inset-x-6 bottom-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                {project.title} — Visual study
              </span>
              <span className="font-mono text-[10px] text-white/40">
                {project.year}
              </span>
            </div>
          </div>
        </Reveal>

        {/* 详情列表 */}
        <Reveal delay={0.4} className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
            Details
          </h2>
          <ul className="mt-6 space-y-4">
            {project.details.map((d, i) => (
              <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-ink-soft">
                <span className="font-mono text-[11px] text-ink-faint pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {d}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 技术栈 */}
        <Reveal delay={0.5} className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
            Stack
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="border border-line bg-mist px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* CTA + 下一个项目 */}
        <Reveal delay={0.6} className="mt-16">
          <div className="flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-soft"
                >
                  Visit project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              )}
              <Link
                to="/contact"
                className="link-sweep inline-flex items-center px-1 py-3.5 text-[13px] font-medium text-ink"
              >
                Start a conversation
              </Link>
            </div>
            {next && (
              <Link
                to={`/work/${next.id}`}
                className="group flex flex-col gap-1 text-right"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Next
                </span>
                <span className="font-display text-2xl font-medium tracking-tight2 text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {next.title} →
                </span>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function getNextProject(current: Project): Project | null {
  const ids = site.projects.map((p) => p.id);
  const i = ids.indexOf(current.id);
  if (i === -1 || i === ids.length - 1) return null;
  return site.projects[i + 1];
}
