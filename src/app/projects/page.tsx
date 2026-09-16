import { Suspense } from "react";
import ProjectsPageClient from "./ProjectsPageClient";
import { ContentContainer } from "@/components/ui/Layout";

const crumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mrkgp.com" },
    { "@type": "ListItem", position: 2, name: "Work", item: "https://mrkgp.com/projects" },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Suspense
        fallback={
          <ContentContainer className="section-y-bold">
            <p className="text-mono text-sm text-ink-muted">Loading work…</p>
          </ContentContainer>
        }
      >
        <ProjectsPageClient />
      </Suspense>
    </>
  );
}
