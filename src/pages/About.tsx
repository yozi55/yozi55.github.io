import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/Section";
import { site } from "../config/site";

export function About() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading index="01" title="关于我" />

        <div className="grid gap-16 md:grid-cols-12">
          {/* 左栏：头像 + 基本信息 */}
          <div className="md:col-span-5 md:sticky md:top-28 self-start">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                关于
              </p>
              <div className="mt-6 w-full overflow-hidden">
                <img
                  src="avatar.png"
                  alt={`${site.name} 的头像`}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* 右栏：自我介绍 */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <p className="font-display text-3xl font-medium leading-snug tracking-tight2 text-ink md:text-4xl">
                {site.about.lead}
              </p>
            </Reveal>

            <div className="mt-10 space-y-6 text-[15px] leading-[1.8] text-ink-soft md:max-w-prose2">
              {site.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.5} className="mt-14">
              <div className="border-t border-line pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                  现在在做
                </p>
                <ul className="mt-5 space-y-3">
                  {site.about.currently.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-[14px] text-ink-soft"
                    >
                      <span className="font-mono text-[10px] text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.6} className="mt-14">
              <Link
                to="/work"
                className="group inline-flex items-center gap-3 text-[14px] font-medium text-ink"
              >
                <span className="link-sweep">查看作品</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
