import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CaseStudyBackLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/projects"
      className={`inline-flex items-center gap-1.5 text-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink ${className}`}
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      Back to work
    </Link>
  );
}
