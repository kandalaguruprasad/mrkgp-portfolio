import { Cable, ChevronDown, ChevronRight, Code2, PenTool, Rocket, Search } from "lucide-react";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { Fragment, type CSSProperties } from "react";

type Step = {
  icon: typeof Search;
  title: string;
  body: string;
  tintBg: string;
  stroke: string;
};

const steps: Step[] = [
  {
    icon: Search,
    title: "Understand",
    body: "Workflow, roles, and edge cases — before any screen exists.",
    tintBg: "#eef3ff",
    stroke: "#2f6df0",
  },
  {
    icon: PenTool,
    title: "Design",
    body: "Structure the product around how the work actually happens.",
    tintBg: "#f0edff",
    stroke: "#8b7ff0",
  },
  {
    icon: Code2,
    title: "Build",
    body: "The UI people use: dashboards, forms, auth, and state.",
    tintBg: "#eaf5f8",
    stroke: "#3aa0be",
  },
  {
    icon: Cable,
    title: "Integrate",
    body: "APIs, payments, permissions, and the states that fail.",
    tintBg: "#eef3ff",
    stroke: "#2f6df0",
  },
  {
    icon: Rocket,
    title: "Deliver",
    body: "Ship it, then stay with it in production.",
    tintBg: "#e8f7ef",
    stroke: "#22aa63",
  },
];

export function Lifecycle() {
  return (
    <section
      id="capability"
      className="border-y border-line bg-surface section-y"
    >
      <ContentContainer>
        <MotionReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow mb-4">02 — What I do</p>
              <h2 className="text-section text-ink">From problem to product.</h2>
            </div>
            <p className="max-w-[22rem] text-[15.5px] leading-relaxed text-ink-secondary">
              I own the product UI from the requirement through production —
              not a handoff in the middle.
            </p>
          </div>
        </MotionReveal>

        <div
          role="list"
          className="mt-16 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0"
        >
          {steps.map((step, i) => (
            <Fragment key={step.title}>
              <MotionReveal delay={i * 0.05} className="flex min-w-0 flex-1">
                <div
                  role="listitem"
                  className="group relative flex h-full w-full cursor-pointer overflow-hidden rounded-[24px] border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition-[transform,background-color,border-color,box-shadow,color] duration-[var(--duration)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-transparent hover:bg-showcase hover:text-showcase-text hover:shadow-[var(--shadow-md)]"
                  style={
                    {
                      "--step-tint": step.tintBg,
                      "--step-stroke": step.stroke,
                    } as CSSProperties
                  }
                >
                  <div className="relative z-[1] flex min-w-0 flex-1 flex-col">
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--step-tint)] transition-colors duration-[var(--duration)] ease-[var(--ease-out)] group-hover:bg-white/12">
                      <step.icon
                        className="h-[18px] w-[18px] text-[var(--step-stroke)] transition-colors duration-[var(--duration)] ease-[var(--ease-out)] group-hover:text-[#9ec0ff]"
                        strokeWidth={1.7}
                        aria-hidden
                      />
                    </span>

                    <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors duration-[var(--duration)] ease-[var(--ease-out)] group-hover:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.5] text-ink-secondary transition-colors duration-[var(--duration)] ease-[var(--ease-out)] group-hover:text-white/60">
                      {step.body}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-1 -top-7 z-0 select-none font-mono text-[clamp(5.25rem,10.5vw,6.75rem)] font-medium leading-none tracking-[-0.06em] text-ink/[0.045] tabular-nums transition-colors duration-[var(--duration)] ease-[var(--ease-out)] group-hover:text-white/[0.08]"
                  >
                    0{i + 1}
                  </span>
                </div>
              </MotionReveal>

              {i < steps.length - 1 ? (
                <div
                  aria-hidden
                  className="flex shrink-0 items-center justify-center md:w-8 md:self-center lg:w-10"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface text-ink-muted">
                    <ChevronDown className="h-3.5 w-3.5 md:hidden" strokeWidth={2} />
                    <ChevronRight className="hidden h-3.5 w-3.5 md:block" strokeWidth={2} />
                  </span>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
