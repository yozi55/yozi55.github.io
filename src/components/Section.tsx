import { Reveal } from "./Reveal";
import { site } from "../config/site";

export function SectionHeading({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal>
      <div className="mb-14 flex items-baseline gap-5 md:mb-20">
        <span className="font-mono text-[11px] tracking-[0.25em] text-ink-faint">
          {index}
        </span>
        <h2 className="font-display text-4xl font-medium tracking-tight2 md:text-5xl">
          {title}
        </h2>
        {sub && <p className="hidden text-sm text-ink-faint md:block">{sub}</p>}
      </div>
    </Reveal>
  );
}

/** 编辑感的横向分隔线 */
export function Divider() {
  return <div className="mx-auto max-w-6xl px-6 md:px-8"><div className="hairline h-px w-full" /></div>;
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <span className="inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
        {children}
      </span>
    </Reveal>
  );
}

export { site };
