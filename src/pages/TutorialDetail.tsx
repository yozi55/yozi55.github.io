import { useParams, Link, Navigate } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { tutorials } from "../config/tutorials";

/**
 * 教程详情页：图文纵向时间线布局。
 * 每步：左侧编号 + 右侧大图 + 图下 caption。
 * 图片 4:3 比例，圆角 2px（克制，不用大圆角）。
 */
export function TutorialDetail() {
  const { id } = useParams<{ id: string }>();
  const tutorial = tutorials.find((t) => t.id === id);
  const index = tutorials.findIndex((t) => t.id === id);

  if (!tutorial) return <Navigate to="/tutorials" replace />;

  const prev = index > 0 ? tutorials[index - 1] : null;
  const next = index < tutorials.length - 1 ? tutorials[index + 1] : null;

  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* 面包屑 */}
        <Reveal>
          <Link
            to="/tutorials"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            全部教程
          </Link>
        </Reveal>

        {/* 标题 */}
        <Reveal delay={0.1} className="mt-10">
          <h1 className="font-display text-4xl font-medium leading-tight tracking-tight2 text-ink md:text-5xl">
            {tutorial.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {tutorial.summary}
          </p>
        </Reveal>

        {/* 引言 */}
        <Reveal delay={0.2} className="mt-10">
          <div className="border-l-2 border-line pl-5">
            <p className="whitespace-pre-line text-[15px] leading-[1.85] text-ink-soft">
              {tutorial.intro}
            </p>
          </div>
        </Reveal>

        {/* 图文步骤时间线（仅图文教程） */}
        {tutorial.steps.length > 0 && (
          <div className="mt-16 space-y-16">
            {tutorial.steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <article className="relative flex gap-6 md:gap-10">
                  <div className="flex flex-col items-center md:w-14 md:shrink-0">
                    <span className="flex h-10 w-10 items-center justify-center border border-line font-display text-lg font-medium tracking-tight2 text-ink md:h-12 md:w-12">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < tutorial.steps.length - 1 && (
                      <span className="mt-3 w-px flex-1 bg-line" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <figure className="relative overflow-hidden bg-mist">
                      <img
                        src={step.image}
                        alt={step.caption}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="border-t border-line bg-paper px-5 py-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                          Step {i + 1}
                        </span>
                        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                          {step.caption}
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* 纯文字步骤（无图教程） */}
        {tutorial.textSteps && tutorial.textSteps.length > 0 && (
          <div className="mt-10 space-y-8">
            {tutorial.textSteps.map((text, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line font-mono text-[12px] text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-[1.85] text-ink-soft">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* 外部资源链接 */}
        {tutorial.resources && tutorial.resources.length > 0 && (
          <Reveal delay={0.1} className="mt-12">
            <div className="border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                资源
              </p>
              <ul className="mt-4 space-y-2">
                {tutorial.resources.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 text-[14px] text-ink"
                    >
                      <span className="link-sweep">{r.label}</span>
                      <span className="font-mono text-[11px] text-ink-faint group-hover:text-ink">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* 备注 */}
        {tutorial.note && (
          <Reveal delay={0.2} className="mt-14">
            <div className="border border-line bg-mist/40 p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                注意
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                {tutorial.note}
              </p>
            </div>
          </Reveal>
        )}

        {/* 上/下篇 */}
        <Reveal delay={0.3} className="mt-16">
          <div className="flex items-center justify-between border-t border-line pt-8">
            {prev ? (
              <Link to={`/tutorials/${prev.id}`} className="group text-right">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  上一篇
                </span>
                <span className="mt-1 block text-[14px] font-medium text-ink transition-transform duration-300 group-hover:-translate-x-1">
                  ← {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/tutorials/${next.id}`} className="group">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  下一篇
                </span>
                <span className="mt-1 block text-[14px] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {next.title} →
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
