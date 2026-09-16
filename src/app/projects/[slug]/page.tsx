import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapteredCaseStudy } from "@/components/case-study/ChapteredCaseStudy";
import {
  getProjectBySlug,
  getProjectsByCategory,
  projects,
  type PortfolioProject,
} from "@/lib/content";
import {
  OG_IMAGE,
  PRIMARY_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteAssetUrl,
  absoluteUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function getNeighbors(project: PortfolioProject) {
  const same = getProjectsByCategory(project.archiveCategory);
  const idx = same.findIndex((p) => p.slug === project.slug);
  if (idx < 0 || same.length < 2) return { prev: null, next: null };
  return {
    prev: same[(idx - 1 + same.length) % same.length],
    next: same[(idx + 1) % same.length],
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };

  const title = `${project.title} Case Study | Kandala Guruprasad (KGP) | mrkgp`;
  const description = `${project.oneLiner} — Case study by Kandala Guruprasad (KGP / mrkgp), Frontend Product Engineer.`;
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image = project.image ? absoluteAssetUrl(project.image) : OG_IMAGE;

  return {
    title: { absolute: title },
    description,
    keywords: [
      ...PRIMARY_KEYWORDS,
      project.title,
      `${project.title} case study`,
      "Kandala Guruprasad projects",
      "mrkgp work",
      project.category,
      project.myRole,
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${project.title} — Kandala Guruprasad (KGP) | mrkgp`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@mrkgp_01",
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ]);

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.oneLiner,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.image ? absoluteAssetUrl(project.image) : undefined,
    author: {
      "@type": "Person",
      name: "Kandala Guruprasad",
      alternateName: ["KGP", "mrkgp", "kgp"],
      url: SITE_URL,
    },
    creator: {
      "@type": "Person",
      name: "Kandala Guruprasad",
      url: SITE_URL,
    },
    keywords: [project.title, "Kandala Guruprasad", "KGP", "mrkgp"].join(", "),
  };

  const { prev, next } = getNeighbors(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <ChapteredCaseStudy project={project} prev={prev} next={next} />
    </>
  );
}
