import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "../hooks";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 进入视口后的延迟（秒） */
  delay?: number;
  /** 初始垂直偏移（px） */
  y?: number;
}

/**
 * 滚动触发入场动画：元素进入视口时柔和地上移淡入。
 * 尊重 prefers-reduced-motion。
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduced ? 0 : 0.9,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export interface MaskTextProps {
  children: string;
  className?: string;
  /** 逐词延迟间隔（秒） */
  stagger?: number;
  /** 起始延迟（秒） */
  delay?: number;
}

/**
 * 逐词揭示的标题：每个词独立做竖向裁切淡入，错落出现。
 * 用于 Hero 等大标题的加载序列。
 */
export function MaskText({
  children,
  className,
  stagger = 0.05,
  delay = 0,
}: MaskTextProps) {
  const reduced = usePrefersReducedMotion();
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
        >
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "108%" }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 1,
              delay: reduced ? 0 : delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * 数字滚动：进入视口时从 0 平滑计到目标值（尊重 reduced motion）。
 */
export function CountUp({
  to,
  className,
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  className?: string;
  suffix?: string;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(to);
      return;
    }
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / (duration * 1000));
      setDisplay(Math.round(to * easeOut(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
