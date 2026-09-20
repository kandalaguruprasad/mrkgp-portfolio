import type { Metadata } from "next";
import { person } from "@/lib/content";
import { buildPageMetadata, pageTitle } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle("About"),
  description:
    `About Kandala Guruprasad (KGP / mrkgp) — Frontend Product Engineer building production React & Next.js applications since 2021. ` +
    `${person.openToWork}. Owns frontend product UI across SaaS, ERP, and marketplace platforms. Portfolio: mrkgp.com.`,
  path: "/about",
  keywords: [
    "About Kandala Guruprasad",
    "About KGP",
    "About mrkgp",
    "Kandala Guruprasad biography",
    "Hire Frontend Product Engineer",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
