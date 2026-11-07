import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/Section";
import { site } from "../config/site";

export function Interests() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          index="03"
          title="兴趣"
          sub="工作之外我探索与正在学习的事"
        />

        {/* 编辑感列表：大号编号 + 标题 + 注脚，行间细线 */}
        <div>
          {site.interests.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group border-b border-line py-10 transition-colors duration-500 first:border-t hover:bg-mist/50">
                <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2">
                    <span className="font-mono text-[11px] text-ink-faint transition-colors duration-300 group-hover:text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="md:col-span-4 font-display text-3xl font-medium tracking-tight2 text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="md:col-span-6 text-[14px] leading-relaxed text-ink-soft">
                    {item.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 学习中的事 */}
        <Reveal delay={0.3} className="mt-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                正在学习
              </h3>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.8] text-ink-soft">
                兴趣很少是静止的。正在学的事，往往最后会悄悄渗进作品里——而这正是保持清单短小的意义。
              </p>
            </div>
            <ul className="space-y-3">
              {site.about.currently.map((c, i) => (
                <li key={i} className="flex items-center gap-4 text-[14px] text-ink-soft">
                  <span className="h-1 w-1 rounded-full bg-ink-faint" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
