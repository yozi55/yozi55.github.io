import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks";

/**
 * 轻量自定义光标（仅桌面端）：
 * - 细圆点跟随指针，使用 rAF 平滑（lerp）避免抖动
 * - 悬停在 a / button 上时放大并转为环状
 * - 移动端与 prefers-reduced-motion 下自动不渲染
 * - 纯 transform 驱动，不触发重排
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !ref.current) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let visible = false;
    let raf = 0;

    const el = ref.current;
    const loop = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [data-cursor='interactive']");
      el.style.width = interactive ? "36px" : "10px";
      el.style.height = interactive ? "36px" : "10px";
      el.style.background = interactive
        ? "transparent"
        : "rgba(17,17,20,0.9)";
      el.style.border = interactive ? "1px solid rgba(17,17,20,0.45)" : "none";
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", () => {
      el.style.opacity = visible ? "1" : "0";
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{
        width: 10,
        height: 10,
        borderRadius: 999,
        background: "rgba(17,17,20,0.9)",
        opacity: 0,
        transition:
          "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s, border-color 0.25s, opacity 0.3s",
      }}
    />
  );
}
