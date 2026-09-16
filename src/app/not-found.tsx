import Link from "next/link";
import { ContentContainer } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="section-y">
      <ContentContainer className="text-center py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-ink-secondary">
          That route doesn’t exist in this portfolio.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Work
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm">
          <Link href="/contact" className="text-link hover:underline">
            Contact instead
          </Link>
        </p>
      </ContentContainer>
    </div>
  );
}
