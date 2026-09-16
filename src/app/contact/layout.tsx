import type { Metadata } from "next";
import { buildPageMetadata, pageTitle } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle("Contact"),
  description:
    "Contact Kandala Guruprasad (KGP / mrkgp) — Frontend Product Engineer open to on-site or remote product engineering roles. " +
    "React, Next.js & TypeScript. Reach out via mrkgp.com/contact.",
  path: "/contact",
  keywords: [
    "Contact Kandala Guruprasad",
    "Contact KGP",
    "Contact mrkgp",
    "Hire Kandala Guruprasad",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
