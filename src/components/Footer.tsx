import Link from "next/link";
import { ContentContainer } from "@/components/ui/Layout";
import { BrandMarkText } from "@/components/BrandMark";
import { person } from "@/lib/content";

const pages = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const elsewhere = [
  { href: `mailto:${person.email}`, label: "Email" },
  { href: person.linkedin, label: "LinkedIn", external: true },
  { href: person.github, label: "GitHub", external: true },
  {
    href: person.resume,
    label: "Resume",
    download: "Kandala_Guruprasad_Resume.pdf",
  },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <ContentContainer className="py-16 md:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[17px] text-white">
              <BrandMarkText className="text-white" />
            </p>
            <p className="mt-2 text-sm text-white/45">{person.professionalRole}.</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow !text-white/35">Pages</p>
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {p.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow !text-white/35">Elsewhere</p>
            {elsewhere.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...("download" in l && l.download
                  ? { download: l.download }
                  : {})}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-mono text-[11px] text-white/30 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} KANDALA GURUPRASAD</span>
          <span>{person.location}</span>
        </div>
      </ContentContainer>
    </footer>
  );
}
