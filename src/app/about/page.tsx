import Image from "next/image";
import { Code2, Crosshair, Rocket } from "lucide-react";
import { about, experience, person, skillGroups } from "@/lib/content";
import { ContentContainer } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { MotionReveal, PageEnter } from "@/components/ui/motion";

const identity = [
  { label: "Product-minded", dot: "#2f6df0" },
  { label: "Frontend-first", dot: "#5b8ff5" },
  { label: "Full-stack capable", dot: "#8b7ff0" },
  { label: "Problem solver", dot: "#22aa63" },
];

const journey = [
  { title: "Curiosity", body: "Learning by taking things apart.", ring: "#cdd2da", fill: "#fff" },
  { title: "Frontend", body: "Building interfaces that hold up.", ring: "#2f6df0", fill: "#fff" },
  { title: "Product UI", body: "Designing for real workflows.", ring: "#2f6df0", fill: "#fff" },
  { title: "Integrations", body: "Making systems talk properly.", ring: "#5b8ff5", fill: "#fff" },
  { title: "Broader systems", body: "Working past the frontend boundary.", ring: "#8b7ff0", fill: "#fff" },
  { title: "Ownership", body: "Responsible for what ships.", ring: "#22aa63", fill: "#22aa63" },
];

const currentAreas = [
  {
    icon: Crosshair,
    title: "Product ownership",
    tint: "#f5f7ff",
    stroke: "#2f6df0",
    items: ["Framing requirements", "Workflow decisions", "Interface direction"],
  },
  {
    icon: Code2,
    title: "Engineering",
    tint: "#f7f6ff",
    stroke: "#8b7ff0",
    items: ["Frontend implementation", "API integration", "Authentication"],
  },
  {
    icon: Rocket,
    title: "Delivery",
    tint: "#f2faf5",
    stroke: "#22aa63",
    items: ["Testing and debugging", "Deployment support", "Production maintenance"],
  },
];

const howIWork = [
  { title: "Understand before building", body: "Most rework comes from starting too early." },
  { title: "Keep complexity clear", body: "Complexity is fine. Hidden complexity isn't." },
  { title: "Own the complete workflow", body: "Handoffs are where products lose quality." },
  { title: "Ship, then improve", body: "Real feedback beats a longer plan." },
];

const toolkit = [
  { title: "Frontend", items: skillGroups[0].items },
  { title: "Product UI", items: skillGroups[1].items },
  { title: "Integration", items: skillGroups[2].items },
  { title: "Backend", items: skillGroups[3].items },
  { title: "Delivery", items: skillGroups[5].items },
  { title: "AI Tooling", items: skillGroups[7].items },
];

export default function AboutPage() {
  const job = experience[0];
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mrkgp.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://mrkgp.com/about" },
    ],
  };

  return (
    <PageEnter>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      {/* Hero */}
      <section className="bg-background pb-24 pt-16 md:pb-28 md:pt-20">
        <ContentContainer>
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <MotionReveal>
              <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                About
              </p>
              <h1 className="mt-5 text-[clamp(2.25rem,5.2vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink">
                <span className="block sm:whitespace-nowrap">
                  {about.pageHeadingLine1}
                </span>
                <span className="block text-ink-muted sm:whitespace-nowrap">
                  {about.pageHeadingLine2}
                </span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-secondary">
                {about.pageIntro}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/projects" size="lg" arrow>
                  View my work
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="secondary" arrow>
                  Get in touch
                </ButtonLink>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <div className="relative mx-auto h-[480px] w-full max-w-[400px] lg:h-[540px]">
                <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-[#e9eaf0] shadow-[0_26px_64px_rgba(20,22,26,0.14)]">
                  <Image
                    src="/kgp-about-page-portrait.png"
                    alt={`${person.name} (KGP / mrkgp) — Frontend Product Engineer`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="dc-drift absolute -left-4 bottom-14 w-[250px] rounded-[22px] border border-line bg-white/85 p-5 shadow-[var(--shadow-float)] backdrop-blur-xl backdrop-saturate-150">
                  <span className="text-mono text-[9.5px] uppercase tracking-[0.13em] text-ink-muted">
                    Identity
                  </span>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {identity.map((it) => (
                      <span key={it.label} className="flex items-center gap-2.5 text-[14px] text-ink">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: it.dot }}
                        />
                        {it.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </ContentContainer>
      </section>

      {/* Journey */}
      <section className="border-y border-line bg-surface section-y">
        <ContentContainer>
          <MotionReveal>
            <p className="text-eyebrow">Journey</p>
            <h2 className="mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
              Each step added a layer.
            </h2>
          </MotionReveal>
          <div className="relative mt-14">
            {/* desktop: first-dot center → last-dot center */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-[7px] hidden h-px border-t border-dashed border-ink/20 md:block"
              style={{ left: "calc(100% / 12)", width: "calc(100% * 10 / 12)" }}
            />
            {/* mobile rail */}
            <span
              aria-hidden
              className="absolute bottom-2 left-[6px] top-2 w-px border-l border-dashed border-ink/20 md:hidden"
            />
            <ol className="relative grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-6">
              {journey.map((s, i) => (
                <MotionReveal key={s.title} delay={i * 0.05}>
                  <li className="flex items-start gap-3.5 md:flex-col md:items-center md:gap-0 md:text-center">
                    <span
                      className="relative z-[1] mt-0.5 block h-3.5 w-3.5 shrink-0 rounded-full border-2 ring-4 ring-surface md:mx-auto md:mb-5 md:mt-0"
                      style={{ borderColor: s.ring, background: s.fill }}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-[1.5] text-ink-secondary">
                        {s.body}
                      </p>
                    </div>
                  </li>
                </MotionReveal>
              ))}
            </ol>
          </div>
        </ContentContainer>
      </section>

      {/* Current role */}
      <section className="border-b border-line bg-background section-y">
        <ContentContainer>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
            <MotionReveal>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-eyebrow mb-0">Current</p>
                <span className="hidden text-ink-faint sm:inline" aria-hidden>
                  ·
                </span>
                <span className="text-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                  {job.period}
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.75rem,3.2vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.032em] text-ink">
                {job.company}
              </h2>
              <p className="mt-3 leading-snug">
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
                  {job.role}
                </span>
                <span className="text-[13.5px] font-normal text-ink-muted">
                  {" "}
                  ({job.publicRole})
                </span>
              </p>
              <p className="mt-5 max-w-[32rem] text-[15px] leading-relaxed text-ink-secondary">
                {job.deliveryNote}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.06}>
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
                {currentAreas.map((a, i) => (
                  <div
                    key={a.title}
                    className={`flex gap-3.5 px-5 py-4 sm:gap-4 sm:px-6 sm:py-[18px] ${
                      i < currentAreas.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
                      style={{ background: a.tint }}
                    >
                      <a.icon
                        className="h-4 w-4"
                        style={{ color: a.stroke }}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[15.5px] font-semibold tracking-[-0.02em] text-ink">
                        {a.title}
                      </h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-secondary">
                        {a.items.join(" · ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </ContentContainer>
      </section>

      {/* How I work */}
      <section className="bg-showcase section-y">
        <ContentContainer>
          <MotionReveal>
            <p className="text-mono text-[11px] uppercase tracking-[0.16em] text-[#7c8494]">
              How I work
            </p>
          </MotionReveal>
          <div className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {howIWork.map((h, i) => (
              <MotionReveal key={h.title} delay={i * 0.05}>
                <div className="border-t border-white/15 pt-6">
                  <span className="text-mono text-[10px] text-[#5f6874]">
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 mt-3.5 text-[22px] font-semibold tracking-[-0.028em] text-white">
                    {h.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.55] text-white/55">
                    {h.body}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Toolkit */}
      <section className="border-t border-line bg-surface section-y">
        <ContentContainer>
          <MotionReveal>
            <p className="text-eyebrow">Toolkit</p>
            <h2 className="mt-4 text-[clamp(1.875rem,3.4vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
              Grouped by what it&rsquo;s for.
            </h2>
            <p className="mt-4 max-w-[38rem] text-[15px] leading-relaxed text-ink-secondary">
              The stack I use across product UI, integration, and delivery —
              organized by where it shows up in the work.
            </p>
          </MotionReveal>
          <MotionReveal className="mt-10">
            <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {toolkit.map((group) => (
                <div key={group.title} className="bg-surface-muted px-6 py-7">
                  <h3 className="mb-3.5 text-[15.5px] font-semibold text-ink">
                    {group.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {group.items.map((it) => (
                      <span key={it} className="text-[13.5px] text-ink-secondary">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>
          <MotionReveal className="mt-12">
            <p className="max-w-[34rem] text-[15px] leading-relaxed text-ink-secondary">
              {about.careerGoal}
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact" arrow>
                Get in touch
              </ButtonLink>
            </div>
          </MotionReveal>
        </ContentContainer>
      </section>
    </PageEnter>
  );
}
