"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* CSS-driven reveal system. Content renders visible by default; a scroll
   reveal only takes effect once JS marks <html class="reveal-ready">, and a
   CSS transition (not a JS animation loop) carries it in — so it can never
   freeze half-faded if a frame is dropped or a tab is backgrounded. Every
   reveal also has a timeout safety net that shows it unconditionally. */

let readyMarked = false;

function markReady() {
  if (readyMarked || typeof document === "undefined") return;
  readyMarked = true;
  document.documentElement.classList.add("reveal-ready");
}

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markReady();
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-visible");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    const safety = window.setTimeout(show, 1400 + delay * 1000);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={
        {
          "--reveal-y": `${y}px`,
          transitionDelay: delay ? `${delay}s` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function PageEnter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`page-enter ${className}`}>{children}</div>;
}
