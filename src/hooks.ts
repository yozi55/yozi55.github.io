import { useEffect, useRef, useState } from "react";

/** Returns true when the user prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Live clock for a given IANA timezone, ticking every second. */
export function useClock(timeZone: string): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const s = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(s);
    };
    format();
    const id = window.setInterval(format, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

/**
 * Scroll progress of a ref'd container (or window when ref is null).
 * Returns 0..1. rAF-throttled so it stays cheap.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const el = ref.current ?? document.documentElement;
    if (!el) return;

    const update = () => {
      ticking.current = false;
      const max = el.scrollHeight - el.clientHeight;
      const top = el === document.documentElement ? window.scrollY : el.scrollTop;
      setProgress(max > 0 ? Math.min(1, Math.max(0, top / max)) : 0);
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}
