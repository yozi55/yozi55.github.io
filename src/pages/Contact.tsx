import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/Section";
import { site } from "../config/site";
import { usePrefersReducedMotion } from "../hooks";

export function Contact() {
  const reduced = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard 不可用时静默失败 */
    }
  };

  const copyHandle = async (label: string, handle: string) => {
    try {
      await navigator.clipboard.writeText(handle);
      setCopiedId(label);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* 静默失败 */
    }
  };

  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading index="05" title="联系" />

        {/* 巨型 CTA */}
        <Reveal>
          <a
            href={`mailto:${site.email}`}
            className="group block border-t border-line py-12 md:py-20"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
              有想法或项目？
            </p>
            <h2 className="display-hero mt-6 text-[11vw] md:text-[7.5rem]">
              <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                <motion.span
                  className="inline-block transition-transform duration-500 group-hover:translate-x-4"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: "110%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {site.email}
                </motion.span>
              </span>
            </h2>
          </a>
        </Reveal>

        {/* 邮箱复制 + 社交 */}
        <Reveal delay={0.15}>
          <div className="grid gap-10 border-t border-line py-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                邮箱
              </p>
              <button
                onClick={copyEmail}
                className="group mt-4 inline-flex items-center gap-3 text-[15px] text-ink"
              >
                <span className="link-sweep">{site.email}</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                    copied ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  {copied ? "已复制 ✓" : "复制"}
                </span>
              </button>
              <p className="mt-6 text-[13px] leading-relaxed text-ink-faint">
                一般会在两天内回复。时区：{site.location}（UTC+8）。
              </p>
            </div>

            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
                其他渠道
              </p>
              <ul className="mt-4 space-y-1">
                {site.socials.map((s) =>
                  s.href ? (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-baseline justify-between border-b border-line/70 py-3 transition-colors duration-300 hover:bg-mist/60"
                      >
                        <span className="text-[15px] font-medium text-ink">
                          {s.label}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[12px] text-ink-faint">
                            {s.handle}
                          </span>
                          <span className="text-[13px] text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
                            ↗
                          </span>
                        </span>
                      </a>
                    </li>
                  ) : (
                    <li key={s.label}>
                      <button
                        onClick={() => copyHandle(s.label, s.handle)}
                        className="group flex w-full items-baseline justify-between border-b border-line/70 py-3 text-left transition-colors duration-300 hover:bg-mist/60"
                      >
                        <span className="text-[15px] font-medium text-ink">
                          {s.label}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[12px] text-ink-faint">
                            {s.handle}
                          </span>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                              copiedId === s.label ? "text-ink" : "text-ink-faint"
                            }`}
                          >
                            {copiedId === s.label ? "已复制 ✓" : "点击复制"}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* 状态行 */}
        <Reveal delay={0.25}>
          <div className="flex items-center gap-3 border-t border-line py-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-ink/30" />
              <span className="relative h-2 w-2 rounded-full bg-ink" />
            </span>
            <p className="text-[13px] text-ink-faint">
              目前主要做学习项目，欢迎交流学习 C#、网页开发与英语。
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
