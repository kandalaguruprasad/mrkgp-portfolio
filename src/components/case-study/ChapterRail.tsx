"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Chapter = { id: string; label: string };

/* One passive scroll listener + IntersectionObserver drives the desktop
   sidebar, the mobile chip strip, and the mobile progress pill. */
function useChapterProgress(chapters: Chapter[]) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = chapters.findIndex((c) => c.id === visible.target.id);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  return { activeIdx, progress };
}

/* Desktop-only sticky sidebar + vertical progress bar. */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const { activeIdx, progress } = useChapterProgress(chapters);
  const activeId = chapters[activeIdx]?.id;
  const pct = Math.round(progress * 100);

  return (
    <nav
      aria-label="Case study chapters"
      className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <p className="mb-4 text-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        Chapters
      </p>
      <ol className="flex flex-col gap-0.5 border-l border-line">
        {chapters.map((c, i) => {
          const active = c.id === activeId;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={active ? "true" : undefined}
                className={`-ml-px flex items-center gap-3 border-l-2 py-2.5 pl-4 text-[13.5px] transition-colors ${
                  active
                    ? "border-blue font-medium text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  className={`text-mono text-[10px] ${
                    active ? "text-blue" : "text-ink-faint"
                  }`}
                >
                  0{i + 1}
                </span>
                {c.label}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-[rgba(20,22,26,0.08)]">
        <span
          className="block h-full rounded-full bg-blue transition-[width] duration-150 ease-linear motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2.5 text-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
        Scroll progress
      </p>
    </nav>
  );
}

/* Mobile-only sticky chip strip + thin progress bar. Rendered full-bleed
   outside the body grid so the horizontal scroll can't affect page width. */
export function ChapterStrip({ chapters }: { chapters: Chapter[] }) {
  const { activeIdx, progress } = useChapterProgress(chapters);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeId = chapters[activeIdx]?.id;
  const pct = Math.round(progress * 100);

  useEffect(() => {
    const chip = stripRef.current?.children[activeIdx] as HTMLElement | undefined;
    if (!chip) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chip.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeIdx]);

  return (
    <nav
      aria-label="Case study chapters"
      className="sticky top-[52px] z-30 border-b border-line bg-[rgba(245,245,243,0.9)] backdrop-blur-xl lg:hidden"
    >
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto px-5 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-8"
      >
        {chapters.map((c, i) => {
          const active = c.id === activeId;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={active ? "true" : undefined}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                active
                  ? "border-transparent bg-accent text-white"
                  : "border-line bg-surface text-ink-secondary"
              }`}
            >
              <span className="text-mono text-[10px] opacity-70">0{i + 1}</span>
              {c.label}
            </a>
          );
        })}
      </div>
      <div className="h-0.5 bg-[rgba(20,22,26,0.08)]">
        <span
          className="block h-full bg-blue transition-[width] duration-150 ease-linear motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </nav>
  );
}

/* Mobile-only sticky pill: "N of total · <chapter>" + Next. */
export function ChapterProgressPill({
  chapters,
  next,
}: {
  chapters: Chapter[];
  next?: { slug: string; title: string } | null;
}) {
  const { activeIdx } = useChapterProgress(chapters);
  const nextChapter = chapters[activeIdx + 1];

  return (
    <div className="pointer-events-none sticky bottom-0 z-30 flex justify-center px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-10 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-t before:from-surface before:from-40% before:to-transparent lg:hidden">
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-line bg-white/85 py-[7px] pl-[18px] pr-[7px] shadow-[var(--shadow-float)] backdrop-blur-xl">
        <span className="text-[13px] text-ink-secondary">
          {activeIdx + 1} of {chapters.length} · {chapters[activeIdx]?.label}
        </span>
        {nextChapter ? (
          <a
            href={`#${nextChapter.id}`}
            className="rounded-full bg-accent px-[15px] py-2 text-[13px] font-medium text-white"
          >
            Next →
          </a>
        ) : next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="rounded-full bg-accent px-[15px] py-2 text-[13px] font-medium text-white"
          >
            Next →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
