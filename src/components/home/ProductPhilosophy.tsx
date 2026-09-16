import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { positioning } from "@/lib/content";

const points = [
  "Understand before building",
  "Keep complexity clear",
  "Own the complete workflow",
  "Ship, then improve",
];

export function ProductPhilosophy() {
  return (
    <section
      id="approach"
      className="border-t border-line bg-surface section-y"
    >
      <ContentContainer>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <MotionReveal>
            <p className="text-eyebrow">05 — How I work</p>
            <h2 className="mt-5 text-[clamp(2rem,3.8vw,2.875rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-ink text-balance">
              Good products happen when product thinking and engineering meet
              early.
            </h2>
            <p className="mt-6 max-w-[29rem] text-[16.5px] leading-relaxed text-ink-secondary">
              {positioning.secondaryStatement}
            </p>
            <div className="mt-9 max-w-[25rem]">
              {points.map((p, i) => (
                <div
                  key={p}
                  className="flex items-center gap-3.5 border-b border-line py-3.5 last:border-0"
                >
                  <span className="w-6 text-mono text-[10.5px] text-ink-faint">
                    0{i + 1}
                  </span>
                  <span className="text-[15px] text-ink">{p}</span>
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="relative h-[440px] overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-muted sm:h-[520px]">
              <svg
                aria-hidden
                width="100%"
                height="100%"
                viewBox="0 0 560 520"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle cx="280" cy="260" r="196" stroke="rgba(20,22,26,.05)" />
                <circle cx="280" cy="260" r="128" stroke="rgba(20,22,26,.05)" />
                <circle
                  cx="280" cy="260" r="196"
                  stroke="rgba(47,109,240,.3)" strokeDasharray="3 9"
                  className="dc-flow"
                />
                <path
                  d="M280 64 L444 178 L400 400 L160 400 L116 178 Z"
                  stroke="rgba(47,109,240,.18)" strokeWidth="1.2"
                  fill="rgba(47,109,240,.03)"
                />
                <path
                  d="M280 64 L400 400M444 178 L160 400M116 178 L400 400M280 64 L160 400M444 178 L116 178"
                  stroke="rgba(20,22,26,.07)" strokeWidth="1"
                />
                <circle cx="280" cy="260" r="46" fill="#16181c" />
                <text
                  x="280" y="256" textAnchor="middle" fill="#fff"
                  fontFamily="Geist, sans-serif" fontSize="13" fontWeight="600"
                >
                  Product
                </text>
                <text
                  x="280" y="272" textAnchor="middle" fill="rgba(255,255,255,.5)"
                  fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1"
                >
                  CORE
                </text>
                <g fontFamily="Geist, sans-serif" fontSize="13" fontWeight="500" fill="#14161a">
                  <rect x="228" y="44" width="104" height="38" rx="12" fill="#fff" stroke="rgba(20,22,26,.1)" />
                  <text x="280" y="68" textAnchor="middle">Problem</text>
                  <rect x="392" y="158" width="104" height="38" rx="12" fill="#fff" stroke="rgba(20,22,26,.1)" />
                  <text x="444" y="182" textAnchor="middle">UX</text>
                  <rect x="348" y="380" width="104" height="38" rx="12" fill="#fff" stroke="rgba(20,22,26,.1)" />
                  <text x="400" y="404" textAnchor="middle">Interface</text>
                  <rect x="108" y="380" width="104" height="38" rx="12" fill="#fff" stroke="rgba(20,22,26,.1)" />
                  <text x="160" y="404" textAnchor="middle">Systems</text>
                  <rect x="64" y="158" width="104" height="38" rx="12" fill="#fff" stroke="rgba(20,22,26,.1)" />
                  <text x="116" y="182" textAnchor="middle">Delivery</text>
                </g>
              </svg>
            </div>
          </MotionReveal>
        </div>
      </ContentContainer>
    </section>
  );
}
