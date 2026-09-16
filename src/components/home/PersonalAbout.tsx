import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { about, person } from "@/lib/content";

export function PersonalAbout() {
  return (
    <section
      id="about-teaser"
      className="border-t border-line bg-grouped section-y"
    >
      <ContentContainer>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <MotionReveal className="flex justify-center">
            {/*
              kgp-about-portrait.png is ~1199×1312. Fixed 400×480 was narrower than the
              asset, so object-cover clipped the side labels on desktop.
            */}
            <div className="relative mx-auto w-full max-w-[min(100%,20rem)] sm:max-w-[22rem] lg:max-w-[26rem] xl:max-w-[28rem]">
              <div className="relative aspect-[1199/1312] overflow-hidden rounded-[var(--radius-xl)] border border-line bg-[#e9eaf0] shadow-[0_24px_60px_rgba(20,22,26,0.12)]">
                <Image
                  src="/kgp-about-portrait.png"
                  alt={person.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 22rem, 28rem"
                  className="object-contain object-center"
                />
              </div>
              <div className="dc-drift absolute -right-1 bottom-6 w-fit rounded-[22px] border border-line bg-white/85 px-4 py-3.5 shadow-[var(--shadow-float)] backdrop-blur-xl backdrop-saturate-150 sm:-right-2 sm:bottom-8 sm:px-[18px] sm:py-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-[#3d4657]"
                    style={{
                      background: "linear-gradient(140deg,#c9d8f8,#ddd6f5)",
                    }}
                  >
                    KG
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
                      {person.preferredName}
                    </span>
                    <span className="block whitespace-nowrap text-xs text-ink-muted">
                      Product-minded engineer
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <p className="text-eyebrow">08 — About</p>
            <h2 className="mt-5 text-[clamp(2.25rem,4.4vw,3.375rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
              One person.
              <br />
              <span className="text-ink-muted">Different perspectives.</span>
            </h2>
            <p className="mt-6 max-w-[30rem] text-[17px] leading-relaxed text-ink-secondary">
              {about.short} I move between product thinking, design and
              engineering because the interesting problems sit between them —
              still curious, still learning in public.
            </p>
            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-2.5 rounded-[var(--radius-control)] border border-line-strong bg-surface px-6 py-3.5 text-[15px] font-medium text-ink transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
            >
              More about me
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </MotionReveal>
        </div>
      </ContentContainer>
    </section>
  );
}
