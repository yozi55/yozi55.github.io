import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "../hooks";

/**
 * 顶部细滚动进度条 + 当前区块名指示。
 * useSpring 平滑驱动，纯 transform，开销极低。
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const [label, setLabel] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const node = entry.target as HTMLElement;
            setLabel(node.dataset.sectionLabel ?? "");
          }
        }
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-section-label]").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <motion.div style={{ scaleX }} className="h-0.5 w-full origin-left bg-ink" />
      <div className="absolute right-6 top-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint md:block">
        {label || "Index"}
      </div>
    </div>
  );
}
