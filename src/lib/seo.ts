import type { Metadata } from "next";
import { person } from "@/lib/content";

export const SITE_URL = "https://mrkgp.com" as const;
export const SITE_NAME = "mrkgp" as const;
export const OG_IMAGE = `${SITE_URL}/kandala-guruprasad-portfolio-og.png` as const;

/** Primary identity keywords Google should associate with this site. */
export const PRIMARY_KEYWORDS = [
  "Kandala Guruprasad",
  "mrkgp",
  "kgp",
  "KGP",
  "mr KGP",
] as const;

export const SUPPORTING_KEYWORDS = [
  "Kandala Guru Prasad",
  "Guruprasad Kandala",
  "K Guruprasad",
  "Guruprasad K",
  "Frontend Product Engineer",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "mrkgp portfolio",
  "kgp portfolio",
  "Kandala Guruprasad portfolio",
  "Kandala Guruprasad Frontend Product Engineer",
  "Hire Frontend Product Engineer",
  "Open to work Frontend Engineer",
] as const;

export const DEFAULT_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  ...SUPPORTING_KEYWORDS,
] as const;

const OG_IMAGE_META = {
  url: OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "Kandala Guruprasad (KGP) | mrkgp | Frontend Product Engineer",
} as const;

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for public assets (keeps %20 encoding for spaces). */
export function absoluteAssetUrl(path: string): string {
  if (!path) return OG_IMAGE;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.replace(/ /g, "%20")}`;
}

export function pageTitle(
  page: string,
  opts?: { includeRole?: boolean },
): string {
  const role = opts?.includeRole !== false;
  if (role) {
    return `${page} | Kandala Guruprasad (KGP) | mrkgp | Frontend Product Engineer`;
  }
  return `${page} | Kandala Guruprasad (KGP) | mrkgp`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const allKeywords = [
    ...PRIMARY_KEYWORDS,
    ...keywords,
    ...SUPPORTING_KEYWORDS,
  ];

  return {
    title: { absolute: title },
    description,
    keywords: [...new Set(allKeywords)],
    authors: [{ name: person.name, url: SITE_URL }],
    creator: person.name,
    publisher: person.name,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE_META],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@mrkgp_01",
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
