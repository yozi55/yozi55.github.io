import { Link } from "react-router-dom";
import { site } from "../config/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              {site.footerNote}
            </p>
            <Link
              to="/contact"
              className="link-sweep mt-4 inline-block font-display text-2xl font-medium tracking-tight2 text-ink"
            >
              Let&apos;s work together
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((s) =>
              s.href ? (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep font-mono text-[12px] text-ink-soft hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label}>
                  <span className="font-mono text-[12px] text-ink-soft">
                    {s.label}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12px] text-ink-faint md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="font-mono text-[11px]">
            Built with React · TypeScript · Tailwind · Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
