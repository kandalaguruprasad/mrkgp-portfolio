import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal } from "@/components/ui/motion";
import { WaveField } from "@/components/ui/Diagram";
import { contact } from "@/lib/content";

export function ClosingCta() {
  const [lineA, lineB] = splitHeading(contact.heading);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-showcase px-0 py-32 md:py-36"
    >
      <WaveField className="z-0" />
      <ContentContainer className="relative z-10">
        <MotionReveal>
          <div className="max-w-[52rem]">
            <h2 className="text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.042em] text-white">
              {lineA}
              <br />
              {lineB}
            </h2>
            <p className="mt-7 max-w-[35rem] text-lg leading-relaxed text-white/60">
              {contact.supporting}
            </p>
            <div className="relative z-10 mt-11 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-control)] bg-white px-[26px] py-[15px] text-[15px] font-medium text-[#16181c] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-[var(--radius-control)] border border-white/15 bg-[#1b1e23] px-[26px] py-[15px] text-[15px] font-medium text-white transition-colors duration-[var(--duration-fast)] hover:bg-[#242830]"
              >
                View work
              </Link>
            </div>
          </div>
        </MotionReveal>
      </ContentContainer>
    </section>
  );
}

function splitHeading(heading: string): [string, string] {
  const words = heading.split(" ");
  if (words.length < 3) return [heading, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
