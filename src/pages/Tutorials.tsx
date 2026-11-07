import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/Section";
import { tutorials } from "../config/tutorials";

/**
 * 教程列表页：编辑感的纵向条目，编号 + 标题 + 简介 + 步骤数。
 * 点击进入 /tutorials/:id 详情页。
 */
export function Tutorials() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading index="04" title="教程" sub="图文步骤，照着做就能跑起来" />

        {tutorials.length === 0 ? (
          <Reveal>
            <div className="border-t border-line py-16 text-center">
              <p className="font-display text-2xl font-medium tracking-tight2 text-ink">
                教程正在整理中
              </p>
              <p className="mt-3 text-[14px] text-ink-faint">
                第一篇文章会在这里出现。
              </p>
            </div>
          </Reveal>
        ) : (
          <div>
            {tutorials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <Link
                  to={`/tutorials/${t.id}`}
                  className="group block border-t border-line py-8 transition-colors duration-500 last:border-b hover:bg-mist/50 md:py-10"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                    <div className="flex md:w-16 md:shrink-0">
                      <span className="font-mono text-[11px] text-ink-faint transition-colors duration-300 group-hover:text-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-medium tracking-tight2 text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                        {t.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 md:shrink-0">
                      {t.steps.length > 0 && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint">
                          {t.steps.length} 步
                        </span>
                      )}
                      <span className="text-[13px] text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
                        阅读 →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
