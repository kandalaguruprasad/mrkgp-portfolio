import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { ProductTiltCard } from "@/components/home/ProductTiltCard";
import type { PortfolioProject } from "@/lib/content";
import { liveHost } from "@/lib/content";

export function FlagshipProCoach({ project }: { project: PortfolioProject }) {
  const meta = [
    { label: "Product", value: "Coaching marketplace" },
    { label: "Role", value: project.myRole },
    { label: "Focus", value: "Product UI • Integration • Delivery", wide: true },
  ];

  return (
    <section className="bg-background section-y">
      <ContentContainer>
        <MotionReveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-showcase text-showcase-text shadow-[var(--shadow-showcase)]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 100% at 82% 12%,rgba(47,109,240,.28),transparent 60%),radial-gradient(50% 80% at 10% 95%,rgba(58,190,190,.14),transparent 60%)",
              }}
            />
            <div className="relative grid items-center gap-12 px-8 pt-12 md:px-[72px] md:pt-[72px] lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
              <div className="pb-12 md:pb-[72px]">
                <p className="text-mono text-[11px] uppercase tracking-[0.16em] text-[#7d95c9]">
                  03 — Featured work
                </p>
                <h2 className="mt-5 text-[clamp(2.75rem,6vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  {project.title}
                </h2>
                <p className="mt-6 max-w-[26rem] text-[17.5px] leading-relaxed text-white/65">
                  {project.caseStudy?.heroSubtitle ?? project.oneLiner}
                </p>

                <div className="mt-11 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/10">
                  {meta.map((m) => (
                    <div
                      key={m.label}
                      className={`bg-[#1b1e23] px-[18px] py-4 ${m.wide ? "col-span-2" : ""}`}
                    >
                      <span className="text-mono text-[9.5px] uppercase tracking-[0.13em] text-[#7c8494]">
                        {m.label}
                      </span>
                      <span className="mt-1.5 block text-[14.5px] text-white">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2.5 rounded-[var(--radius-control)] bg-white px-6 py-3.5 text-[15px] font-medium text-[#16181c] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
                  >
                    Explore case study
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/75 hover:text-white"
                    >
                      {liveHost(project.liveUrl)}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </div>

              <ProductTiltCard
                image={project.image}
                title={project.title}
                fallback={project.oneLiner}
              />
            </div>
          </div>
        </MotionReveal>
      </ContentContainer>
    </section>
  );
}
