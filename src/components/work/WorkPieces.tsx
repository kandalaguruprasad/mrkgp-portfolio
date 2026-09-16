import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/content";
import { MotionReveal } from "@/components/ui/motion";

/* ---- Flagship dark panel (ProCoach) ---- */
export function FlagshipPanel({ project }: { project: PortfolioProject }) {
  return (
    <MotionReveal>
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-showcase text-showcase-text shadow-[var(--shadow-showcase)]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 90% at 88% 10%,rgba(47,109,240,.26),transparent 62%)",
          }}
        />
        <div className="relative grid items-end gap-10 px-8 pt-12 md:grid-cols-[1fr_1.2fr] md:px-16 md:pt-16 md:gap-12">
          <div className="pb-12 md:pb-16">
            <span className="inline-block rounded-md border border-[rgba(143,168,220,.3)] px-2.5 py-1.5 text-mono text-[10px] uppercase tracking-[0.14em] text-[#8fa8dc]">
              Flagship
            </span>
            <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-white">
              {project.title}
            </h2>
            <p className="mt-4 max-w-[26rem] text-[16.5px] leading-relaxed text-white/65">
              {project.caseStudy?.heroSubtitle ?? project.oneLiner}
            </p>
            <div className="mt-8 flex flex-col gap-2.5">
              <span className="flex gap-3 text-[14.5px] text-white/80">
                <span className="w-[74px] shrink-0 pt-0.5 text-mono text-[10px] uppercase tracking-[0.1em] text-[#7c8494]">
                  Owned
                </span>
                {project.caseStudy?.ownership.slice(0, 4).join(", ") ??
                  "Product UI, integration, delivery"}
              </span>
              <span className="flex gap-3 text-[14.5px] text-white/80">
                <span className="w-[74px] shrink-0 pt-0.5 text-mono text-[10px] uppercase tracking-[0.1em] text-[#7c8494]">
                  Stack
                </span>
                {project.stack.slice(0, 4).join(", ")}
              </span>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="mt-9 inline-flex items-center gap-2.5 rounded-[var(--radius-control)] bg-white px-6 py-3.5 text-[15px] font-medium text-[#16181c] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
            >
              Read the case study →
            </Link>
          </div>
          <div className="pb-0 md:pb-0">
            <div className="overflow-hidden rounded-t-[14px] border border-b-0 border-white/[0.13] bg-[#22262c]">
              <div className="flex items-center gap-[7px] bg-[#2a2f36] px-3.5 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#4a5058]" />
                <span className="h-2 w-2 rounded-full bg-[#4a5058]" />
                <span className="h-2 w-2 rounded-full bg-[#4a5058]" />
              </div>
              <div className="relative aspect-[16/10] bg-[#1e2228]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} product screenshot`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover object-top"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}

/* ---- Editorial row (KhetiValah) ---- */
export function EditorialRow({
  project,
  graphic,
}: {
  project: PortfolioProject;
  graphic?: React.ReactNode;
}) {
  return (
    <MotionReveal>
      <div className="grid items-center gap-12 rounded-[var(--radius-xl)] border border-line bg-surface p-8 transition-shadow duration-[var(--duration)] hover:shadow-[0_26px_60px_rgba(20,22,26,0.1)] md:grid-cols-[1.15fr_1fr] md:p-14">
        <div>
          <span className="text-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">
            {project.category.split("·")[0].trim()}
          </span>
          <h2 className="mt-4 text-[clamp(1.875rem,4vw,2.625rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
            {project.title}
          </h2>
          <p className="mt-4 max-w-[28rem] text-[16.5px] leading-relaxed text-ink-secondary">
            {project.oneLiner}
          </p>
          <div className="mt-7 grid max-w-[28rem] grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line">
            <div className="bg-surface-muted px-4 py-3.5">
              <span className="text-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">
                Role
              </span>
              <span className="mt-1 block text-[14px] text-ink">
                {project.myRole}
              </span>
            </div>
            <div className="bg-surface-muted px-4 py-3.5">
              <span className="text-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">
                Type
              </span>
              <span className="mt-1 block text-[14px] text-ink">
                {project.type.split("&")[0].split("/")[0].trim()}
              </span>
            </div>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="mt-7 inline-block text-[14.5px] font-medium text-blue"
          >
            View project →
          </Link>
        </div>
        <div className="relative h-[280px] overflow-hidden rounded-[24px] border border-line bg-[#f2f5f2] md:h-[320px]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} application screenshot`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              {graphic ?? <DefaultRowGraphic />}
            </div>
          )}
        </div>
      </div>
    </MotionReveal>
  );
}

function DefaultRowGraphic() {
  return (
    <svg width="320" height="220" viewBox="0 0 320 220" fill="none" aria-hidden>
      <rect x="10" y="30" width="120" height="70" rx="14" fill="#fff" stroke="rgba(20,22,26,.1)" />
      <rect x="10" y="120" width="120" height="70" rx="14" fill="#fff" stroke="rgba(20,22,26,.1)" />
      <rect x="190" y="20" width="120" height="52" rx="14" fill="#fff" stroke="rgba(20,22,26,.1)" />
      <rect x="190" y="90" width="120" height="52" rx="14" fill="#fff" stroke="rgba(20,22,26,.1)" />
      <rect x="190" y="160" width="120" height="46" rx="14" fill="#fff" stroke="rgba(20,22,26,.1)" />
      <path
        d="M130 65h60M130 155h60M190 46h-30v100M190 116h-38"
        stroke="rgba(34,170,99,.5)" strokeWidth="1.4" strokeDasharray="4 6"
        className="dc-flow"
      />
      <circle cx="160" cy="110" r="6" fill="#22aa63" opacity=".8" />
    </svg>
  );
}

/* ---- Compact project card (also-built / archive) ---- */
export function WorkCard({
  project,
  tone = "surface",
}: {
  project: PortfolioProject;
  tone?: "surface" | "tint";
}) {
  return (
    <MotionReveal>
      <Link
        href={`/projects/${project.slug}`}
        className={`flex h-full min-h-[260px] flex-col justify-between rounded-[var(--radius-lg)] border border-line p-[30px] transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(20,22,26,0.1)] ${
          tone === "tint" ? "bg-grouped" : "bg-surface"
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
              {project.category.split("·")[0].trim()}
            </span>
            {project.status ? (
              <span className="text-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                {project.status}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-ink">
            {project.title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-[1.55] text-ink-secondary">
            {project.oneLiner}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-lg bg-[#f3f4f7] px-2.5 py-1 text-xs text-ink-secondary"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-[13.5px] font-medium text-blue">→</span>
        </div>
      </Link>
    </MotionReveal>
  );
}

/* ---- Website card ---- */
export function WebsiteCard({
  title,
  industry,
  scope,
  liveUrl,
  image,
}: {
  title: string;
  industry: string;
  scope: string;
  liveUrl: string;
  image?: string;
}) {
  return (
    <MotionReveal>
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(20,22,26,0.1)]"
      >
        <div className="relative aspect-[16/10] border-b border-line bg-grouped">
          {image ? (
            <Image
              src={image}
              alt={`${title} website`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
          ) : null}
        </div>
        <div className="p-6">
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-secondary">
            {industry}
          </span>
          <p className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-ink group-hover:text-blue">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{scope}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue">
            Visit <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </a>
    </MotionReveal>
  );
}
