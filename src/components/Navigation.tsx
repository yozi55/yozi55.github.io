import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../config/site";
import { usePrefersReducedMotion } from "../hooks";

const LINKS = [
  { label: "关于", to: "/about" },
  { label: "作品", to: "/work" },
  { label: "教程", to: "/tutorials" },
  { label: "兴趣", to: "/interests" },
  { label: "联系", to: "/contact" },
];

export function Navigation() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={reduced ? false : { y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          to="/"
          className="font-display text-[15px] font-medium tracking-tight2 text-ink"
        >
          {site.name}
          <span className="text-ink-faint"> / </span>
          <span className="text-ink-faint font-mono text-[11px] font-normal tracking-normal">
            {new Date().getFullYear()}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`link-sweep text-[13px] font-medium transition-colors duration-300 ${
                  pathname === l.to ? "text-ink" : "text-ink-faint hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-ink transition-all duration-300 ${
              open ? "rotate-45" : "translate-y-[-3px]"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-ink transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block py-3 font-display text-xl font-medium tracking-tight2 text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
