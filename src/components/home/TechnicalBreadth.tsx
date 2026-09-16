import { Cable, CheckCheck, Database, Layers, MonitorSmartphone, Sparkles } from "lucide-react";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { skillGroups } from "@/lib/content";

const aiItems = skillGroups.find((g) => g.title === "AI Tooling")?.items ?? [];

const groups = [
  {
    icon: MonitorSmartphone,
    title: "Frontend",
    body: "The layer users actually touch.",
    tint: "#f5f7ff",
    stroke: "#2f6df0",
    tags: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    icon: Layers,
    title: "Product UI",
    body: "Interfaces that stay usable as they grow.",
    tint: "#f7f6ff",
    stroke: "#8b7ff0",
    tags: ["Responsive UI", "Design systems", "Forms", "Accessibility"],
  },
  {
    icon: Cable,
    title: "Integration",
    body: "Where most product complexity actually lives.",
    tint: "#f4f9fb",
    stroke: "#3aa0be",
    tags: ["REST APIs", "Authentication", "Payments", "Real-time workflows"],
  },
  {
    icon: Database,
    title: "Backend collaboration",
    body: "Shared contracts instead of thrown-over-the-wall work.",
    tint: "#f5f7ff",
    stroke: "#2f6df0",
    tags: ["Node.js", "Spring Boot", "API contracts", "Databases"],
  },
  {
    icon: CheckCheck,
    title: "Delivery",
    body: "Getting it out, then keeping it healthy.",
    tint: "#f2faf5",
    stroke: "#22aa63",
    tags: ["Testing", "Git", "CI/CD", "Deployment", "Debugging"],
  },
  {
    icon: Sparkles,
    title: "AI Tooling",
    body: "Using AI to move faster on real product work — not as a substitute for engineering judgment.",
    tint: "#f7f8fc",
    stroke: "#5b6b8c",
    tags: [...aiItems],
  },
];

export function TechnicalBreadth() {
  return (
    <section
      id="breadth"
      className="border-t border-line bg-surface section-y"
    >
      <ContentContainer>
        <MotionReveal>
          <p className="text-eyebrow">07 — Technical breadth</p>
          <h2 className="mt-4 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
            Built across the product stack.
          </h2>
        </MotionReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <MotionReveal key={g.title} delay={i * 0.05}>
              <div className="h-full rounded-[var(--radius-lg)] border border-line bg-surface-muted p-7 transition-[transform,background-color] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1 hover:bg-surface">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-[14px]"
                  style={{ background: g.tint }}
                >
                  <g.icon
                    className="h-5 w-5"
                    style={{ color: g.stroke }}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <h3 className="mb-1 mt-[18px] text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {g.title}
                </h3>
                <p className="mb-4 text-[13.5px] leading-[1.5] text-ink-secondary">
                  {g.body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs text-ink-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
