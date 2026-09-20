import Image from "next/image";
import Link from "next/link";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";
import { ProductAccessBadge } from "@/components/work/WorkPieces";

function TechTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.slice(0, 3).map((t) => (
        <span
          key={t}
          className="rounded-lg bg-[#f3f4f7] px-2.5 py-1 text-xs text-ink-secondary"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function CardLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-blue">{children} →</span>
  );
}

export function SelectedWork({ projects }: { projects: PortfolioProject[] }) {
  const bySlug = (s: string) =>
    projects.find((p) => p.inventorySlug === s || p.slug === s);

  // ProCoach is already featured in the home hero — keep this section for the
  // rest of the production portfolio.
  const kheti = bySlug("khetivalah");
  const rdr = bySlug("rdr-tech");
  const sgreens = bySlug("sgreens-erp");
  const sree = bySlug("sree-veeranjaneya-erp");

  return (
    <section id="selected-work" className="bg-background pb-24 pt-6 md:pb-32">
      <ContentContainer>
        <MotionReveal>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow mb-4">04 — Selected work</p>
              <h2 className="max-w-xl text-section text-ink">
                Products and systems I&rsquo;ve helped build.
              </h2>
            </div>
            <Link
              href="/projects"
              className="border-b border-ink/20 pb-1 text-[14.5px] font-medium text-ink"
            >
              All work →
            </Link>
          </div>
        </MotionReveal>

        {/* Row 1 — flagship production products (excludes ProCoach) */}
        <div className="mb-6 grid items-stretch gap-6 lg:grid-cols-[1.55fr_1fr]">
          {kheti ? (
            <MotionReveal className="h-full">
              <Link
                href={`/projects/${kheti.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(20,22,26,0.12)]"
              >
                <div className="relative h-[240px] shrink-0 border-b border-line bg-[#f2f5f2] sm:h-[260px] lg:h-[280px]">
                  {kheti.image ? (
                    <Image
                      src={kheti.image}
                      alt={`${kheti.title} screenshot`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover object-top"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-ink">
                      {kheti.title}
                    </h3>
                    <span className="text-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-muted">
                      {kheti.category}
                    </span>
                    <ProductAccessBadge project={kheti} />
                  </div>
                  <p className="mt-3 max-w-[32rem] text-[15.5px] leading-[1.55] text-ink-secondary">
                    {kheti.oneLiner}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <TechTags items={kheti.stack} />
                    <CardLink>Case study</CardLink>
                  </div>
                </div>
              </Link>
            </MotionReveal>
          ) : null}

          {rdr ? (
            <MotionReveal delay={0.06} className="h-full">
              <Link
                href={`/projects/${rdr.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(20,22,26,0.12)]"
              >
                <div className="relative h-[240px] shrink-0 border-b border-line bg-[#eef2fb] sm:h-[260px] lg:h-[280px]">
                  {rdr.image ? (
                    <Image
                      src={rdr.image}
                      alt={`${rdr.title} application screenshot`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover object-top"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[23px] font-semibold tracking-[-0.03em] text-ink">
                      {rdr.title}
                    </h3>
                    <ProductAccessBadge project={rdr} />
                  </div>
                  <span className="mt-1.5 block text-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-muted">
                    {rdr.category}
                  </span>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-ink-secondary">
                    {rdr.oneLiner}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <TechTags items={rdr.stack} />
                    <CardLink>Case study</CardLink>
                  </div>
                </div>
              </Link>
            </MotionReveal>
          ) : null}
        </div>

        {/* Row 2 — systems / ERP work */}
        <div className="grid gap-6 sm:grid-cols-2">
          {[sgreens, sree].map((p, i) =>
            p ? (
              <MotionReveal key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(20,22,26,0.1)]"
                >
                  {p.image ? (
                    <div className="relative h-[160px] shrink-0 border-b border-line bg-grouped sm:h-[180px]">
                      <Image
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-[30px]">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-ink">
                          {p.title}
                        </h3>
                        <ProductAccessBadge project={p} />
                      </div>
                      <span className="mt-1.5 block text-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                        {p.category || "ERP system"}
                      </span>
                      <p className="mt-2.5 text-[14px] leading-[1.55] text-ink-secondary">
                        {p.oneLiner}
                      </p>
                    </div>
                    <span className="mt-5 inline-block">
                      <CardLink>View</CardLink>
                    </span>
                  </div>
                </Link>
              </MotionReveal>
            ) : null,
          )}
        </div>
      </ContentContainer>
    </section>
  );
}
