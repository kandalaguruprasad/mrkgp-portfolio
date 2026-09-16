import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { PortfolioProject } from "@/lib/content";
import { getRelatedProjects, projects } from "@/lib/content";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal, PageEnter } from "@/components/ui/motion";
import { FlowStrip } from "@/components/ui/Diagram";

function getNeighbors(project: PortfolioProject) {
  const same = projects.filter(
    (p) => p.archiveCategory === project.archiveCategory,
  );
  const idx = same.findIndex((p) => p.slug === project.slug);
  return {
    prev: idx > 0 ? same[idx - 1] : null,
    next: idx >= 0 && idx < same.length - 1 ? same[idx + 1] : null,
  };
}

function flowStepsFor(project: PortfolioProject): string[] {
  if (project.category.toLowerCase().includes("marketplace")) {
    return ["Discover", "Select", "Book", "Pay", "Manage"];
  }
  if (project.category.toLowerCase().includes("workflow")) {
    return ["Assign", "Track", "Update", "Report", "Close"];
  }
  if (project.category.toLowerCase().includes("erp")) {
    return ["Capture", "Validate", "Process", "Record", "Report"];
  }
  if (project.archiveCategory === "mobile") {
    return ["Onboard", "Browse", "Act", "Sync", "Notify"];
  }
  return ["Input", "Process", "Validate", "Persist", "Present"];
}

function NavCard({
  project,
  dir,
}: {
  project: PortfolioProject;
  dir: "prev" | "next";
}) {
  const isNext = dir === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex items-center gap-5 rounded-[var(--radius-lg)] border border-line p-8 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] ${
        isNext
          ? "justify-end bg-showcase text-right hover:translate-x-1.5"
          : "bg-surface hover:-translate-x-1.5"
      }`}
    >
      {!isNext ? (
        <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px] bg-grouped text-ink-muted">
          <ArrowLeft className="h-6 w-6" aria-hidden />
        </span>
      ) : null}
      <span>
        <span
          className={`block text-mono text-[10px] uppercase tracking-[0.13em] ${
            isNext ? "text-[#7c8494]" : "text-ink-muted"
          }`}
        >
          {isNext ? "Next →" : "← Previous"}
        </span>
        <span
          className={`mt-2 block text-[22px] font-semibold tracking-[-0.03em] ${
            isNext ? "text-white" : "text-ink"
          }`}
        >
          {project.title}
        </span>
      </span>
      {isNext ? (
        <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px] bg-white/[0.07] text-white/70">
          <ArrowRight className="h-6 w-6" aria-hidden />
        </span>
      ) : null}
    </Link>
  );
}

export function CaseStudyView({ project }: { project: PortfolioProject }) {
  const cs = project.caseStudy;
  const related = getRelatedProjects(project);
  const { prev, next } = getNeighbors(project);

  const context = cs?.context ?? project.overview;
  const problem = cs?.problem ?? project.problem;
  const role = cs?.role ?? project.myRole;
  const ownership = cs?.ownership ?? project.ownership;
  const approach = cs?.approach ?? project.solution;
  const decisions = cs?.engineeringDecisions?.length
    ? cs.engineeringDecisions
    : project.architectureDecisions;
  const capabilities = cs?.technicalImplementation?.length
    ? cs.technicalImplementation
    : project.features.slice(0, 12);
  const outcome = cs?.outcome;

  const meta = [
    { label: "Role", value: project.role || project.myRole },
    { label: "Type", value: project.type },
    { label: "Timeline", value: project.timeline || "—" },
    { label: "Stack", value: project.stack.slice(0, 4).join(" • ") || "—" },
  ];

  return (
    <PageEnter>
      <article className="bg-background">
        {/* Hero */}
        <ContentContainer className="pb-16 pt-14 md:pb-20">
          <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Case study
          </p>
          <h1 className="mt-5 text-[clamp(2.75rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
            {cs?.heroTitle ?? project.title}
          </h1>
          <p className="mt-6 max-w-[42rem] text-[clamp(1.25rem,2.6vw,1.75rem)] font-normal leading-[1.25] tracking-[-0.028em] text-ink-secondary">
            {cs?.heroSubtitle ?? project.oneLiner}
          </p>

          <MotionReveal className="mt-11">
            <div className="overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-surface shadow-[0_34px_80px_rgba(20,22,26,0.14)]">
              <div className="flex items-center gap-2 border-b border-line bg-[#f2f3f5] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcdee3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcdee3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcdee3]" />
              </div>
              <div className="relative h-[280px] bg-[#f7f8fa] sm:h-[400px] md:h-[500px]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1000px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <p className="max-w-sm text-sm text-ink-muted">
                      {project.oneLiner}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </MotionReveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-surface px-6 py-[22px]">
                <span className="text-mono text-[9.5px] uppercase tracking-[0.13em] text-ink-muted">
                  {m.label}
                </span>
                <span className="mt-1.5 block text-[15px] text-ink">{m.value}</span>
              </div>
            ))}
          </div>
        </ContentContainer>

        <div className="border-t border-line bg-surface">
          <ContentContainer className="flex flex-col gap-24 py-20 md:gap-28 md:py-24">
            {/* Context */}
            {context ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">01 — Overview</p>
                  <h2 className="mt-4 max-w-[46rem] text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.18] tracking-[-0.032em] text-ink">
                    {project.title}
                  </h2>
                  <p className="mt-6 max-w-[42rem] text-[16.5px] leading-[1.65] text-ink-secondary">
                    {context}
                  </p>
                </section>
              </MotionReveal>
            ) : null}

            {/* Problem */}
            {problem ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">02 — Problem</p>
                  <h2 className="mb-8 mt-4 max-w-[46rem] text-statement text-ink">
                    {problem}
                  </h2>
                </section>
              </MotionReveal>
            ) : null}

            {/* Ownership */}
            {ownership.length > 0 ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">03 — My role</p>
                  <h2 className="mb-4 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    What I owned.
                  </h2>
                  {role ? (
                    <p className="mb-8 max-w-[40rem] text-[15.5px] leading-relaxed text-ink-secondary">
                      {role}
                    </p>
                  ) : null}
                  <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {ownership.slice(0, 9).map((o) => (
                      <div
                        key={o}
                        className="rounded-[var(--radius-md)] border border-line bg-surface-muted px-5 py-4 text-[14.5px] text-ink"
                      >
                        {o}
                      </div>
                    ))}
                  </div>
                </section>
              </MotionReveal>
            ) : null}

            {/* System / approach */}
            {approach ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">04 — System</p>
                  <h2 className="mb-6 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    The path a user actually takes.
                  </h2>
                  <p className="mb-8 max-w-[42rem] text-[16.5px] leading-[1.65] text-ink-secondary">
                    {approach}
                  </p>
                  <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-showcase p-8 md:p-12">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(60% 100% at 50% 0%,rgba(47,109,240,.2),transparent 60%)",
                      }}
                    />
                    <div className="relative overflow-x-auto">
                      <FlowStrip
                        className="min-w-[600px]"
                        tone="dark"
                        nodes={flowStepsFor(project).map((label) => ({ label }))}
                      />
                    </div>
                    <p className="relative mt-6 text-[13px] text-white/45">
                      Conceptual product flow derived from this project&rsquo;s
                      domain — not a literal screenshot of the system.
                    </p>
                  </div>
                </section>
              </MotionReveal>
            ) : null}

            {/* Engineering decisions */}
            {decisions.length > 0 ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">05 — Engineering</p>
                  <h2 className="mb-9 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    Decisions worth explaining.
                  </h2>
                  <div className="flex flex-col gap-3.5">
                    {decisions.slice(0, 5).map((d, i) => (
                      <div
                        key={d}
                        className={`grid gap-6 rounded-[var(--radius-lg)] border border-line p-8 md:grid-cols-[80px_minmax(0,1fr)] ${
                          i % 2 === 1
                            ? "bg-grouped"
                            : "bg-surface shadow-[var(--shadow-sm)]"
                        }`}
                      >
                        <span className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-ink/[0.14]">
                          0{i + 1}
                        </span>
                        <p className="self-center text-[15.5px] leading-[1.55] text-ink">
                          {d}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </MotionReveal>
            ) : null}

            {/* Challenges */}
            {project.challenges.length > 0 ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">06 — Challenges</p>
                  <h2 className="mb-9 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    What shaped the build.
                  </h2>
                  <div className="flex flex-col gap-3.5">
                    {project.challenges.map((c) => (
                      <div
                        key={c.title}
                        className="grid gap-4 rounded-[var(--radius-md)] border border-line bg-surface p-7 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10"
                      >
                        <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-ink">
                          {c.title}
                        </h3>
                        <p className="text-[14.5px] leading-[1.55] text-ink-secondary">
                          {c.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </MotionReveal>
            ) : null}

            {/* Capabilities */}
            {capabilities.length > 0 ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">07 — What was built</p>
                  <h2 className="mb-8 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    In the product.
                  </h2>
                  <div className="grid gap-x-10 sm:grid-cols-2">
                    {capabilities.map((item) => (
                      <p
                        key={item}
                        className="border-b border-line py-3 text-[14.5px] text-ink-secondary"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </section>
              </MotionReveal>
            ) : null}

            {/* Beyond the UI */}
            {project.backendContribution ? (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">Beyond the UI</p>
                  <p className="mt-4 max-w-[42rem] text-[16.5px] leading-[1.65] text-ink-secondary">
                    {project.backendContribution}
                  </p>
                </section>
              </MotionReveal>
            ) : null}

            {/* Outcome */}
            {(outcome || project.impact.length > 0) && (
              <MotionReveal>
                <section>
                  <p className="text-eyebrow">08 — Outcome</p>
                  <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    What shipped.
                  </h2>
                  <p className="mb-8 mt-3 text-[15px] text-ink-muted">
                    Qualitative — no performance or business metrics are claimed
                    here.
                  </p>
                  {project.impact.length > 0 ? (
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      {project.impact.map((o) => (
                        <div
                          key={o}
                          className="flex items-center gap-3.5 rounded-[var(--radius-md)] border border-status/15 bg-[#f2faf5] px-6 py-5"
                        >
                          <Check
                            className="h-[18px] w-[18px] shrink-0 text-status"
                            strokeWidth={1.8}
                            aria-hidden
                          />
                          <span className="text-[15px] text-ink">{o}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {outcome ? (
                    <p className="mt-8 max-w-[42rem] text-[16.5px] leading-relaxed text-ink-secondary">
                      {outcome}
                    </p>
                  ) : null}
                  {cs?.production ? (
                    <p className="mt-6 max-w-[42rem] border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-muted">
                      {cs.production}
                    </p>
                  ) : null}
                </section>
              </MotionReveal>
            )}
          </ContentContainer>
        </div>

        {/* Prev / next + related */}
        <ContentContainer className="border-t border-line py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {prev ? <NavCard project={prev} dir="prev" /> : <span />}
            {next ? <NavCard project={next} dir="next" /> : <span />}
          </div>

          {related.length > 0 ? (
            <div className="mt-14">
              <p className="mb-4 text-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Related
              </p>
              <div className="grid gap-3.5 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/projects/${item.slug}`}
                    className="rounded-[var(--radius-md)] border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                  >
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-secondary">
                      {item.oneLiner}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10">
            <Link
              href="/projects"
              className="text-sm font-medium text-blue hover:underline"
            >
              ← All work
            </Link>
          </div>
        </ContentContainer>
      </article>
    </PageEnter>
  );
}
