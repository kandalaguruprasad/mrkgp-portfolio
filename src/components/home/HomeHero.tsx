import Image from "next/image";
import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { about, person } from "@/lib/content";

/** Factual signals — joined Dec 2021 (~4+ yrs as of 2026); 5 production apps; 4 domains (ERP counted once). */
const metrics = [
  { value: "4+", label: "Years experience" },
  { value: "5", label: "Production products" },
  { value: "4", label: "Product domains" },
] as const;

const ctaClass =
  "!min-h-[52px] !px-5 !py-3 text-[14px] max-sm:w-full sm:!min-h-[54px]";

export function HomeHero() {
  const roleParts = person.professionalRole.split(" ");
  const roleLine1 = roleParts.slice(0, 2).join(" ");
  const roleLine2 = roleParts.slice(2).join(" ");

  return (
    <section className="relative overflow-x-clip bg-background lg:min-h-[100svh]">
      {/* Independent background layer — zero flow height */}
      <p className="hero-portfolio-word" aria-hidden>
        Portfolio
      </p>

      <div className="relative z-[1] mx-auto flex w-full max-w-[var(--content-max)] flex-col px-[clamp(1.25rem,4vw,3.5rem)] pb-10 pt-[calc(var(--header-h)+0.5rem)] lg:block lg:min-h-[100svh] lg:pb-0 lg:pt-0">
        {/* Figure */}
        <div
          className={[
            "relative z-[1] mx-auto mt-3",
            "h-[min(48svh,22rem)] w-full max-w-[min(92vw,21rem)]",
            "sm:mt-4 sm:h-[min(50svh,26rem)] sm:max-w-[min(70vw,24rem)]",
            "lg:absolute lg:bottom-[7%] lg:left-[calc(50%+2vw)] lg:mt-0",
            "lg:h-[min(75svh,40rem)] lg:w-[min(48vw,27.5rem)] lg:max-w-none lg:-translate-x-1/2",
            "xl:bottom-[8%] xl:left-[calc(50%+3vw)] xl:h-[min(82svh,50rem)] xl:w-[clamp(560px,40vw,760px)]",
          ].join(" ")}
        >
          {/* Ground / base — static, no entrance animation */}
          <div
            className="pointer-events-none absolute bottom-[-2%] left-1/2 z-0 w-[52%] -translate-x-1/2 sm:bottom-[-1.5%] sm:w-[48%] lg:bottom-[0.5%] lg:w-[58%] xl:w-[55%]"
            aria-hidden
          >
            <div className="relative aspect-[598/71] w-full">
              <Image
                src="/kgp-portfolio-hero-portrait.png"
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 60vw, 28rem"
                className="object-contain object-center"
                draggable={false}
              />
            </div>
          </div>

          <div className="hero-fly-in absolute inset-0 z-[1] -translate-y-[3%] sm:-translate-y-[4%] lg:-translate-y-[6%] xl:-translate-y-[6.5%]">
            <div className="hero-float absolute inset-0">
              <Image
                src="/kgp-frontend-product-engineer-portrait.png"
                alt={`${person.name} — Frontend Product Engineer`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, (max-width: 1280px) 46vw, 38vw"
                className="object-contain object-bottom drop-shadow-[0_28px_60px_rgba(20,22,26,0.16)]"
              />
            </div>
          </div>
        </div>

        {/* Identity — centered stack on mobile, absolute left on desktop */}
        <div
          className={[
            "relative z-[2] order-first mx-auto w-full max-w-[22rem] text-center",
            "lg:absolute lg:left-[clamp(1.5rem,3vw,3.5rem)] lg:top-[32%] lg:order-none lg:mx-0 lg:w-[min(100%,380px)] lg:max-w-none lg:text-left",
            "xl:top-[34%] xl:w-[min(100%,400px)]",
          ].join(" ")}
        >
          <span className="mx-auto mb-3 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white/80 px-3.5 py-2 text-[13px] leading-none text-ink-secondary shadow-[var(--shadow-sm)] backdrop-blur-sm sm:px-4 sm:py-2.5 sm:text-[13.5px] lg:mx-0 lg:mb-3.5">
            <span
              className="dc-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-status shadow-[0_0_0_3px_rgba(34,170,99,0.25)]"
              aria-hidden
            />
            {person.openToWork}
          </span>
          <p className="text-[1.25rem] font-medium italic leading-none tracking-[-0.02em] text-blue sm:text-[1.35rem] lg:text-[clamp(1.4rem,2vw,2.15rem)]">
            Hello, I&apos;m
          </p>
          <h1 className="mt-1">
            <span className="hero-name block text-ink">{person.preferredName}</span>
            <span className="mt-2 block text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[0.12em] text-ink-secondary sm:text-[0.8125rem] lg:mt-2.5 lg:text-[clamp(0.9rem,1.25vw,1.35rem)] lg:tracking-[0.1em]">
              <span className="lg:hidden">{person.professionalRole}</span>
              <span className="hidden lg:inline">
                {roleLine1}
                {roleLine2 ? (
                  <>
                    <br />
                    {roleLine2}
                  </>
                ) : null}
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-[34ch] text-[14.5px] leading-relaxed text-ink-secondary lg:mx-0 lg:mt-3.5 lg:max-w-[360px] lg:text-[16px]">
            {about.short}
          </p>
          <p className="mt-3 hidden items-center gap-2 text-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted lg:mt-3.5 lg:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-blue" strokeWidth={1.75} aria-hidden />
            Based in {person.location}
          </p>
          <div className="mt-5 hidden flex-wrap gap-2.5 lg:mt-5 lg:flex">
            <ButtonLink href="/projects" size="lg" arrow className={ctaClass}>
              View my work
            </ButtonLink>
            <ButtonLink
              href="/#approach"
              size="lg"
              variant="secondary"
              className={ctaClass}
            >
              My approach
            </ButtonLink>
          </div>
        </div>

        {/* Statement + metrics — full width on mobile */}
        <div
          className={[
            "relative z-[2] mx-auto mt-5 w-full max-w-[22rem] text-center",
            "lg:absolute lg:bottom-[14%] lg:right-[clamp(1.5vw,3.5vw,5vw)] lg:mx-0 lg:mt-0 lg:w-[250px] lg:max-w-none lg:text-left",
            "xl:bottom-[16%] xl:right-[clamp(2vw,4vw,6vw)] xl:w-[270px]",
          ].join(" ")}
        >
          <p className="w-full text-[1.05rem] font-medium leading-[1.35] tracking-[0.02em] text-ink sm:text-[1.1rem] lg:tracking-[0.035em] lg:[word-spacing:0.1em]">
            I build production products,
            <br />
            <span className="text-ink-muted">not just polished screens.</span>
          </p>
          <ul className="mt-4 border-t border-line text-left lg:mt-3.5">
            {metrics.map((m) => (
              <li
                key={m.label}
                className="flex h-[52px] items-center justify-between gap-3 border-b border-line sm:h-[56px] lg:h-[60px] xl:h-[62px]"
              >
                <span className="font-display-condensed text-[1.75rem] leading-none tracking-[-0.02em] text-ink sm:text-[1.85rem] lg:text-[clamp(1.85rem,2.4vw,2.35rem)]">
                  {m.value}
                </span>
                <span className="max-w-[8rem] text-right text-mono text-[9.5px] uppercase leading-snug tracking-[0.12em] text-ink-muted sm:text-[10px]">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile CTAs */}
        <div className="relative z-[2] mx-auto mt-7 flex w-full max-w-[22rem] flex-col items-center gap-3 lg:hidden">
          <p className="inline-flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
            <MapPin className="h-3.5 w-3.5 text-blue" strokeWidth={1.75} aria-hidden />
            Based in {person.location}
          </p>
          <div className="flex w-full flex-col gap-2.5">
            <ButtonLink href="/projects" size="lg" arrow className={ctaClass}>
              View my work
            </ButtonLink>
            <ButtonLink
              href="/#approach"
              size="lg"
              variant="secondary"
              className={ctaClass}
            >
              My approach
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
