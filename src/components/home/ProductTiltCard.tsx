"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const REST = { x: 3, y: -6 };
const MAX = 7;
const EASE = 0.12;

export function ProductTiltCard({
  image,
  title,
  fallback,
}: {
  image?: string;
  title: string;
  fallback: string;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);
  const targetRef = useRef({ ...REST });
  const currentRef = useRef({ ...REST });
  const rafRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;

    const onChange = () => {
      reducedRef.current = mq.matches;
      if (mq.matches) {
        targetRef.current = { ...REST };
        currentRef.current = { ...REST };
        const card = cardRef.current;
        if (card) {
          card.style.transform = `rotateY(${REST.y}deg) rotateX(${REST.x}deg)`;
        }
      }
    };
    mq.addEventListener("change", onChange);

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * EASE;
      cur.y += (tgt.y - cur.y) * EASE;

      const card = cardRef.current;
      if (card) {
        card.style.transform = `rotateY(${cur.y.toFixed(3)}deg) rotateX(${cur.x.toFixed(3)}deg)`;
      }

      const settled =
        Math.abs(tgt.x - cur.x) < 0.01 && Math.abs(tgt.y - cur.y) < 0.01;
      if (!settled || activeRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
        cur.x = tgt.x;
        cur.y = tgt.y;
        if (card) {
          card.style.transform = `rotateY(${tgt.y}deg) rotateX(${tgt.x}deg)`;
        }
      }
    };

    const start = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    // kick once so resting transform is applied
    start();

    const shell = shellRef.current;
    if (!shell) {
      return () => {
        mq.removeEventListener("change", onChange);
        cancelAnimationFrame(rafRef.current);
      };
    }

    const onMove = (e: PointerEvent) => {
      if (reducedRef.current) return;
      activeRef.current = true;
      const rect = shell.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current = {
        x: REST.x - py * MAX * 2,
        y: REST.y + px * MAX * 2,
      };
      start();
    };

    const onLeave = () => {
      activeRef.current = false;
      targetRef.current = { ...REST };
      start();
    };

    shell.addEventListener("pointermove", onMove);
    shell.addEventListener("pointerleave", onLeave);

    return () => {
      mq.removeEventListener("change", onChange);
      shell.removeEventListener("pointermove", onMove);
      shell.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={shellRef} className="pb-12 md:pb-[72px] [perspective:1800px]">
      <div
        ref={cardRef}
        className="overflow-hidden rounded-[22px] border border-white/[0.14] bg-[#22262c] shadow-[0_24px_60px_rgba(0,0,0,0.35),0_-8px_40px_rgba(47,109,240,0.14)] will-change-transform [transform-origin:center_center] [transform-style:preserve-3d] lg:[transform-origin:left_center]"
        style={{
          transform: `rotateY(${REST.y}deg) rotateX(${REST.x}deg)`,
        }}
      >
        <div className="flex items-center gap-[7px] border-b border-white/[0.08] bg-[#2a2f36] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a5058]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a5058]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a5058]" />
          <span className="ml-3 flex h-[22px] flex-1 items-center rounded-md bg-[#1e2228] px-2.5 text-mono text-[10px] text-[#6f7784]">
            procoach — sessions
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-[#1e2228]">
          {image ? (
            <Image
              src={image}
              alt={`${title} product screenshot`}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-white/45">
              {fallback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
