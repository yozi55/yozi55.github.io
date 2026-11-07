import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "../config/site";
import { useClock, usePrefersReducedMotion } from "../hooks";
import { MaskText } from "./Reveal";

/**
 * 首屏 Hero：超大号排版 + 动态网格背景 + 视差。
 * 加载时逐行淡入，鼠标移动时背景轻微视差。
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useClock(site.timezone);
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bgX = useSpring(mx, { stiffness: 40, damping: 20 });
  const bgY = useSpring(my, { stiffness: 40, damping: 20 });
  const gridX = useTransform(bgX, (v) => `${v * 12}px`);
  const gridY = useTransform(bgY, (v) => `${v * 12}px`);

  return (
    <section
      ref={ref}
      data-section-label="Index"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(e.clientX / r.width - 0.5);
        my.set(e.clientY / r.height - 0.5);
      }}
    >
      {/* 背景网格（视差） */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={
          reduced
            ? undefined
            : {
                backgroundImage:
                  "linear-gradient(to right, rgba(17,17,20,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,20,0.045) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                translateX: gridX,
                translateY: gridY,
              }
        }
      />
      {/* 底部渐隐 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:px-8 md:pb-24">
        <div className="mb-8 flex items-center gap-3">
          <motion.span
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="h-1.5 w-1.5 rounded-full bg-ink"
          />
          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint"
          >
            {site.role} · {site.location}
          </motion.p>
        </div>

        <h1 className="display-hero text-[15vw] leading-none md:text-[11vw] lg:text-[9.5rem]">
          <MaskText delay={0.25}>{site.name}</MaskText>
          <br />
          <MaskText delay={0.55} className="text-ink-faint">
            {site.tagline}
          </MaskText>
        </h1>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-2 text-[14px] leading-relaxed text-ink-soft">
            <p>{site.about.lead}</p>
            <p className="font-mono text-[11px] text-ink-faint">
              当地时间 — {clock}（{site.location}）
            </p>
          </div>

          <ScrollCue reduced={reduced} />
        </motion.div>
      </div>
    </section>
  );
}

function ScrollCue({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex items-center gap-3 self-start md:self-end">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        向下滚动
      </span>
      <div className="relative h-10 w-px overflow-hidden bg-line">
        {!reduced && (
          <motion.div
            className="absolute left-0 top-0 h-4 w-full bg-ink"
            animate={{ y: ["-100%", "250%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6,
            }}
          />
        )}
      </div>
    </div>
  );
}
