import type { Metadata } from "next";
import { buildPageMetadata, pageTitle } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle("Work"),
  description:
    "Selected product work by Kandala Guruprasad (KGP / mrkgp) — SaaS, marketplaces, workflow systems, ERP, and mobile case studies focused on ownership and engineering decisions.",
  path: "/projects",
  keywords: [
    "Kandala Guruprasad projects",
    "KGP projects",
    "mrkgp work",
    "Kandala Guruprasad case studies",
  ],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
