import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { experience } from "@/lib/content";

const layers = [
  {
    title: "Interfaces",
    body: "Building product screens that hold up in real use.",
    ring: "#2f6df0",
  },
  {
    title: "Workflows",
    body: "Connecting screens into flows people can complete.",
    ring: "#2f6df0",
  },
  {
    title: "Integrations",
    body: "APIs and authentication wired into the product surface.",
    ring: "#5b8ff5",
  },
  {
    title: "Systems",
    body: "Working with backend collaborators on shared contracts.",
    ring: "#8b7ff0",
  },
  {
    title: "Product ownership & delivery",
    body: "Taking responsibility for what ships and what happens after.",
    ring: "#22aa63",
  },
];

export function ExperienceTimeline() {
  const job = experience[0];

  return (
    <section
      id="experience"
      className="border-t border-line bg-background section-y"
    >
      <ContentContainer>
        <MotionReveal>
          <div className="max-w-[47rem]">
            <p className="text-eyebrow">06 — Experience</p>
            <h2 className="mt-4 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
              Growing scope, one layer at a time.
            </h2>
          </div>
        </MotionReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
          <MotionReveal>
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-[30px] shadow-[var(--shadow-sm)]">
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-accent text-base font-semibold text-white">
                C
              </span>
              <h3 className="mt-5 text-[21px] font-semibold leading-[1.25] tracking-[-0.025em] text-ink">
                {job.company}
              </h3>
              <p className="mt-2.5 leading-snug">
                <span className="text-[15.5px] font-semibold tracking-[-0.02em] text-ink">
                  {job.role}
                </span>
                <span className="text-[12.5px] font-normal text-ink-muted">
                  {" "}
                  ({job.publicRole})
                </span>
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-line pt-[18px]">
                <span className="h-[7px] w-[7px] rounded-full bg-status" aria-hidden />
                <span className="text-[13px] text-ink-secondary">
                  Currently building production products
                </span>
              </div>
              <span className="mt-3.5 block text-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                {job.period}
              </span>
            </div>
          </MotionReveal>

          <div className="relative pl-[34px]">
            <span
              aria-hidden
              className="absolute bottom-10 left-[12px] top-2 w-px border-l border-dashed border-ink/20"
            />
            <div className="flex flex-col gap-3.5">
              {layers.map((l, i) => (
                <MotionReveal key={l.title} delay={i * 0.05}>
                  <div className="relative rounded-[var(--radius-md)] border border-line bg-surface px-6 py-5 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] hover:translate-x-1.5">
                    <span
                      className="absolute left-[-29px] top-6 h-3 w-3 rounded-full border-2 bg-surface"
                      style={{ borderColor: l.ring }}
                      aria-hidden
                    />
                    <h4 className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
                      {l.title}
                    </h4>
                    <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink-secondary">
                      {l.body}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
