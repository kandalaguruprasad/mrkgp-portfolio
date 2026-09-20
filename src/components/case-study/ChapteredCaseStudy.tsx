import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal, PageEnter } from "@/components/ui/motion";
import { FlowStrip, LayeredSystem } from "@/components/ui/Diagram";
import type { PortfolioProject } from "@/lib/content";
import { isInternalCompanyProduct, liveHost } from "@/lib/content";
import {
  ChapterProgressPill,
  ChapterRail,
  ChapterStrip,
  type Chapter,
} from "./ChapterRail";
import { CaseStudyBackLink } from "./CaseStudyBackLink";

const DOTS = ["#2f6df0", "#5b8ff5", "#8b7ff0", "#22aa63", "#3aa0be", "#9aa0ab"];

function flowStepsFor(project: PortfolioProject): { label: string; accent?: boolean }[] {
  if (project.category.toLowerCase().includes("marketplace")) {
    return [
      { label: "Discover" },
      { label: "Select" },
      { label: "Book" },
      { label: "Pay" },
      { label: "Manage", accent: true },
    ];
  }
  if (project.category.toLowerCase().includes("workflow")) {
    return [
      { label: "Assign" },
      { label: "Track" },
      { label: "Update" },
      { label: "Report" },
      { label: "Close", accent: true },
    ];
  }
  if (project.category.toLowerCase().includes("erp")) {
    return [
      { label: "Capture" },
      { label: "Validate" },
      { label: "Process" },
      { label: "Record" },
      { label: "Report", accent: true },
    ];
  }
  if (project.archiveCategory === "mobile") {
    return [
      { label: "Onboard" },
      { label: "Browse" },
      { label: "Act" },
      { label: "Sync" },
      { label: "Notify", accent: true },
    ];
  }
  return [
    { label: "Input" },
    { label: "Process" },
    { label: "Validate" },
    { label: "Persist" },
    { label: "Present", accent: true },
  ];
}

function architectureFor(project: PortfolioProject) {
  const frontend = project.stackGrouped?.frontend?.slice(0, 4) ??
    project.stack.filter((s) => /react|next|angular|tailwind|typescript/i.test(s)).slice(0, 4);
  const services = project.stackGrouped?.backend?.slice(0, 4) ??
    project.stack.filter((s) => /api|node|express|stripe|razorpay|sql|mongo/i.test(s)).slice(0, 3);

  return [
    {
      name: "Frontend",
      nodes: frontend.length ? frontend : ["Product UI", "Workflows", "State"],
    },
    { name: "API layer", nodes: ["REST API contracts"], accent: true as const },
    {
      name: "Services",
      nodes: services.length ? services : ["Auth", "Domain APIs", "Integrations"],
    },
    { name: "Data", nodes: ["Backend-managed persistence"] },
  ];
}

function learningFor(project: PortfolioProject, approach: string | undefined) {
  if (approach?.trim()) {
    const first = approach.trim().split(/(?<=[.!?])\s+/)[0];
    if (first && first.length > 40 && first.length < 220) return first;
  }
  return `Owning ${project.title} meant connecting the real product workflow — not shipping isolated screens.`;
}

export function ChapteredCaseStudy({
  project,
  prev,
  next,
}: {
  project: PortfolioProject;
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
}) {
  const cs = project.caseStudy;
  const context = cs?.context ?? project.overview;
  const problem = cs?.problem ?? project.problem;
  const role = cs?.role ?? project.myRole;
  const ownership = (cs?.ownership?.length ? cs.ownership : project.ownership).slice(0, 8);
  const approach = cs?.approach ?? project.solution;
  const decisions = (
    cs?.engineeringDecisions?.length
      ? cs.engineeringDecisions
      : project.architectureDecisions
  ).slice(0, 5);
  const challenges = project.challenges.slice(0, 4);
  const outcomes = project.impact.slice(0, 4);
  const capabilities = (
    cs?.technicalImplementation?.length
      ? cs.technicalImplementation
      : project.features
  ).slice(0, 10);
  const surfaces = (project.modules.length ? project.modules : project.features)
    .slice(0, 5)
    .map((label, i) => ({ label, dot: DOTS[i % DOTS.length] }));
  const flowNodes = flowStepsFor(project);
  const learning = learningFor(project, approach);

  const chapters: Chapter[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "role", label: "My role" },
    { id: "flow", label: "Product flow" },
    ...(decisions.length ? [{ id: "engineering", label: "Engineering" }] : []),
    ...(challenges.length ? [{ id: "challenges", label: "Challenges" }] : []),
    { id: "outcome", label: "Outcome" },
    { id: "learnings", label: "Learnings" },
  ];

  const meta = [
    { label: "Role", value: project.myRole || project.role || "—" },
    { label: "Status", value: project.status || "—" },
    {
      label: "Access",
      value: project.liveUrl
        ? liveHost(project.liveUrl)
        : isInternalCompanyProduct(project)
          ? "Internal — company use only"
          : "—",
      href: project.liveUrl,
    },
    {
      label: "Technology",
      value: project.stack.slice(0, 4).join(" • ") || "—",
    },
  ];

  const chromeLabel = project.liveUrl
    ? liveHost(project.liveUrl)
    : isInternalCompanyProduct(project)
      ? "Internal — company use only"
      : `${project.slug} — product UI`;

  return (
    <PageEnter>
      <article className="bg-background">
        <ContentContainer className="pb-20 pt-14 md:pb-24">
          <div className="flex items-center justify-between gap-4">
            <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              {project.featured ? "Featured project" : "Case study"}
            </p>
            <CaseStudyBackLink />
          </div>
          <h1 className="mt-5 text-hero text-ink">{project.title}</h1>
          <p className="mt-6 max-w-[45rem] text-[clamp(1.375rem,3vw,2rem)] font-normal leading-[1.22] tracking-[-0.03em] text-ink-secondary">
            {cs?.heroTitle ?? cs?.heroSubtitle ?? project.oneLiner}
          </p>

          <MotionReveal className="mt-12">
            <div className="overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-surface shadow-[0_34px_80px_rgba(20,22,26,0.14)]">
              <div className="flex items-center gap-2 border-b border-line bg-[#f2f3f5] px-4 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcdee3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcdee3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#dcdee3]" />
                <span className="ml-3.5 flex h-6 max-w-[420px] flex-1 items-center rounded-md border border-line bg-surface px-3 text-mono text-[10px] text-ink-muted">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:text-blue"
                    >
                      {chromeLabel}
                    </a>
                  ) : (
                    <span className="truncate">{chromeLabel}</span>
                  )}
                </span>
              </div>
              <div className="relative h-[300px] bg-[#f7f8fa] sm:h-[420px] md:h-[520px]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} product screenshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1100px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <p className="max-w-sm text-sm text-ink-muted">{project.oneLiner}</p>
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
                {"href" in m && m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-[15px] text-blue hover:text-ink"
                  >
                    {m.value}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                ) : (
                  <span className="mt-1.5 block text-[15px] text-ink">{m.value}</span>
                )}
              </div>
            ))}
          </div>
        </ContentContainer>

        <div className="border-t border-line bg-surface pb-16 lg:pb-0">
          <ChapterStrip chapters={chapters} />
          <ContentContainer className="grid grid-cols-1 gap-10 py-16 md:py-24 lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-16 lg:pt-20">
            <ChapterRail chapters={chapters} />

            <div className="flex flex-col gap-24 md:gap-28">
              <section id="overview" className="scroll-mt-28">
                <MotionReveal>
                  <p className="text-eyebrow">01 — Overview</p>
                  <h2 className="mt-4 max-w-[48rem] text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.18] tracking-[-0.032em] text-ink">
                    {cs?.heroSubtitle ?? project.oneLiner}
                  </h2>
                  <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <p className="text-[16.5px] leading-[1.65] text-ink-secondary">
                      {context}
                    </p>
                    {surfaces.length > 0 ? (
                      <div className="rounded-[var(--radius-md)] border border-line bg-surface-muted p-5">
                        <span className="text-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-muted">
                          Surfaces involved
                        </span>
                        <div className="mt-3.5 flex flex-col gap-2.5">
                          {surfaces.map((s) => (
                            <span
                              key={s.label}
                              className="flex items-center gap-2.5 text-[14px] text-ink"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: s.dot }}
                              />
                              {s.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </MotionReveal>
              </section>

              <section id="problem" className="scroll-mt-28">
                <MotionReveal>
                  <p className="text-eyebrow">02 — Problem</p>
                  <h2 className="mb-10 mt-4 max-w-[46rem] text-statement text-ink">
                    The product had to hold up as a connected workflow.
                  </h2>
                  <div className="rounded-[var(--radius-lg)] border border-line bg-grouped p-8 md:p-12">
                    <div className="overflow-x-auto">
                      <FlowStrip
                        className="min-w-[560px]"
                        nodes={flowNodes.map(({ label, accent }) => ({
                          label,
                          accent,
                        }))}
                      />
                    </div>
                    <p className="mt-6 max-w-[40rem] text-[16.5px] leading-[1.65] text-ink-secondary">
                      {problem}
                    </p>
                  </div>
                </MotionReveal>
              </section>

              <section id="role" className="scroll-mt-28">
                <MotionReveal>
                  <p className="text-eyebrow">03 — My role</p>
                  <h2 className="mb-9 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    What I owned.
                  </h2>
                  {role ? (
                    <p className="mb-8 max-w-[40rem] text-[15.5px] leading-relaxed text-ink-secondary">
                      {role}
                      {project.role && project.role !== role ? ` — ${project.role}` : ""}
                    </p>
                  ) : null}
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    {ownership.map((item) => (
                      <div
                        key={item}
                        className="rounded-[var(--radius-md)] border border-line bg-surface-muted px-6 py-5 transition-colors hover:bg-surface"
                      >
                        <span className="block text-[15px] leading-[1.45] text-ink">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </MotionReveal>
              </section>

              <section id="flow" className="scroll-mt-28">
                <MotionReveal>
                  <p className="text-eyebrow">04 — Product flow</p>
                  <h2 className="mb-9 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    The path a user actually takes.
                  </h2>
                  {approach ? (
                    <p className="mb-8 max-w-[42rem] text-[16.5px] leading-[1.65] text-ink-secondary">
                      {approach}
                    </p>
                  ) : null}
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
                        nodes={flowNodes}
                      />
                    </div>
                    <p className="relative mt-6 text-[13px] text-white/45">
                      Conceptual product flow for this domain — not a literal system diagram.
                    </p>
                  </div>
                </MotionReveal>
              </section>

              {decisions.length > 0 ? (
                <section id="engineering" className="scroll-mt-28">
                  <MotionReveal>
                    <p className="text-eyebrow">05 — Engineering</p>
                    <h2 className="mb-10 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                      Decisions worth explaining.
                    </h2>
                  </MotionReveal>
                  <div className="flex flex-col gap-3.5">
                    {decisions.map((d, i) => (
                      <MotionReveal key={d} delay={i * 0.05}>
                        <div
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
                      </MotionReveal>
                    ))}
                  </div>

                  <MotionReveal className="mt-16">
                    <p className="text-eyebrow">05.1 — Architecture</p>
                    <h3 className="mb-9 mt-4 text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                      How the pieces sit together.
                    </h3>
                    <div className="rounded-[var(--radius-lg)] border border-line bg-surface-muted p-8 md:p-12">
                      <div className="overflow-x-auto">
                        <LayeredSystem
                          className="min-w-[640px]"
                          layers={architectureFor(project)}
                        />
                      </div>
                    </div>
                  </MotionReveal>
                </section>
              ) : null}

              {challenges.length > 0 ? (
                <section id="challenges" className="scroll-mt-28">
                  <MotionReveal>
                    <p className="text-eyebrow">06 — Challenges</p>
                    <h2 className="mb-9 mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                      What shaped the build.
                    </h2>
                  </MotionReveal>
                  <div className="flex flex-col gap-3.5">
                    {challenges.map((c, i) => (
                      <MotionReveal key={c.title} delay={i * 0.05}>
                        <div className="grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-line-strong sm:grid-cols-2">
                          <Cell head="Challenge" body={c.title} strong />
                          <Cell
                            head="What it meant"
                            body={c.description}
                            muted
                            tone="#22aa63"
                          />
                        </div>
                      </MotionReveal>
                    ))}
                  </div>
                </section>
              ) : null}

              <section id="outcome" className="scroll-mt-28">
                <MotionReveal>
                  <p className="text-eyebrow">07 — Outcome</p>
                  <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.032em] text-ink">
                    What shipped.
                  </h2>
                  {project.status ? (
                    <p className="mt-3 text-[18px] font-medium tracking-[-0.02em] text-ink">
                      {project.status}
                    </p>
                  ) : null}
                  {project.statusDetail ? (
                    <p className="mt-2 max-w-[40rem] text-[15px] leading-relaxed text-ink-secondary">
                      {project.statusDetail}
                    </p>
                  ) : null}
                  <p className="mb-8 mt-3 text-[15px] text-ink-muted">
                    Qualitative — no performance or business metrics are claimed
                    here.
                  </p>
                  {outcomes.length > 0 ? (
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      {outcomes.map((o) => (
                        <div
                          key={o}
                          className="flex items-center gap-3.5 rounded-[var(--radius-md)] border border-status/15 bg-[#f2faf5] px-6 py-5"
                        >
                          <Check
                            className="h-[18px] w-[18px] shrink-0 text-status"
                            strokeWidth={1.8}
                            aria-hidden
                          />
                          <span className="text-[15.5px] text-ink">{o}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {cs?.outcome ? (
                    <p className="mt-8 max-w-[42rem] text-[16.5px] leading-relaxed text-ink-secondary">
                      {cs.outcome}
                    </p>
                  ) : null}
                  {cs?.production ? (
                    <p className="mt-6 max-w-[42rem] border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-muted">
                      {cs.production}
                    </p>
                  ) : null}
                  {capabilities.length > 0 ? (
                    <div className="mt-10">
                      <p className="mb-4 text-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                        In the product
                      </p>
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
                    </div>
                  ) : null}
                  {project.backendContribution ? (
                    <p className="mt-8 max-w-[42rem] text-[15px] leading-relaxed text-ink-muted">
                      {project.backendContribution}
                    </p>
                  ) : null}
                </MotionReveal>
              </section>

              <section id="learnings" className="scroll-mt-28">
                <MotionReveal>
                  <p className="text-eyebrow">08 — Learnings</p>
                  <figure className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-showcase px-7 py-9 shadow-[var(--shadow-md)] sm:px-10 sm:py-12 md:px-12 md:py-14">
                    <blockquote className="w-full text-[clamp(1.5rem,2.8vw,2.125rem)] font-medium leading-[1.35] tracking-[-0.028em] text-pretty text-showcase-text">
                      {learning}
                    </blockquote>
                  </figure>
                </MotionReveal>
              </section>
            </div>
          </ContentContainer>
          <ChapterProgressPill chapters={chapters} next={next} />
        </div>

        <ContentContainer className="border-t border-line py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-8 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-x-1.5"
              >
                <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px] bg-grouped text-ink-muted">
                  <ArrowLeft className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="block text-mono text-[10px] uppercase tracking-[0.13em] text-ink-muted">
                    ← Previous
                  </span>
                  <span className="mt-2 block text-[22px] font-semibold tracking-[-0.03em] text-ink">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center justify-end gap-5 rounded-[var(--radius-lg)] border border-line bg-showcase p-8 text-right transition-transform duration-[var(--duration)] ease-[var(--ease-out)] hover:translate-x-1.5"
              >
                <span>
                  <span className="block text-mono text-[10px] uppercase tracking-[0.13em] text-[#7c8494]">
                    Next →
                  </span>
                  <span className="mt-2 block text-[22px] font-semibold tracking-[-0.03em] text-white">
                    {next.title}
                  </span>
                </span>
                <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px] bg-white/[0.07] text-white/70">
                  <ArrowRight className="h-6 w-6" aria-hidden />
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="mt-8">
            <Link
              href="/projects"
              className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              ← All work
            </Link>
          </div>
        </ContentContainer>
      </article>
    </PageEnter>
  );
}
function Cell({
  head,
  body,
  strong,
  muted,
  tone = "#9aa0ab",
}: {
  head: string;
  body: string;
  strong?: boolean;
  muted?: boolean;
  tone?: string;
}) {
  return (
    <div className={`px-6 py-6 ${muted ? "bg-surface-muted" : "bg-surface"}`}>
      <span
        className="text-mono text-[9.5px] uppercase tracking-[0.13em]"
        style={{ color: tone }}
      >
        {head}
      </span>
      <p
        className={`mt-2.5 text-[14.5px] leading-[1.5] ${
          strong ? "font-medium text-ink" : "text-ink-secondary"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

