import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { ProtectMedia } from "@/components/ProtectMedia";
import { person } from "@/lib/content";
import {
  absoluteUrl,
  DEFAULT_KEYWORDS,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const uiSans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

const monoFace = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

/* Condensed display — hero editorial backdrop / name only */
const displayCondensed = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-condensed",
  display: "swap",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: person.name,
  givenName: person.preferredName,
  familyName: "Kandala",
  alternateName: [
    "mrkgp",
    "mrKGP",
    "mr kgp",
    "kgp",
    "KGP",
    "K Guruprasad",
    "Guruprasad K",
    "Guruprasad Kandala",
    "Kandala Guru Prasad",
    "K Prasad",
    "Guru Prasad",
  ],
  url: SITE_URL,
  image: `${SITE_URL}/kgp-profile.png`,
  jobTitle: person.professionalRole,
  description:
    `${person.name} (KGP / mrkgp) — ${person.professionalRole} building production React and Next.js product interfaces across SaaS, marketplaces, workflow systems, and ERP. ${person.openToWork}.`,
  worksFor: {
    "@type": "Organization",
    name: "Code Stream Technology Pvt Ltd",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirupati",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  email: person.email,
  sameAs: [person.linkedin, person.github, person.instagram, SITE_URL],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Product Engineering",
    "SaaS",
    "Marketplace products",
    "ERP interfaces",
    "Stripe",
    "Razorpay",
    "RBAC",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "mrkgp",
  alternateName: ["KGP", "Kandala Guruprasad", "mrKGP", "kgp"],
  url: SITE_URL,
  description:
    `Official portfolio of ${person.name} (KGP) — mrkgp.com. ${person.professionalRole}. ${person.openToWork}.`,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#person` },
  creator: { "@id": `${SITE_URL}/#person` },
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/mrkgp-favicon.png`,
    width: 512,
    height: 512,
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: `${person.name} (KGP) | mrkgp`,
  mainEntity: { "@id": `${SITE_URL}/#person` },
  about: { "@id": `${SITE_URL}/#person` },
};

const homeTitle =
  "Kandala Guruprasad (KGP) | mrkgp | Frontend Product Engineer";

const metaDescription =
  `Kandala Guruprasad (KGP / mrkgp) — Frontend Product Engineer building production product interfaces with React, Next.js & TypeScript. ` +
  `${person.openToWork}. SaaS, marketplaces, workflow systems, and ERP. ` +
  `Portfolio & resume: mrkgp.com.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: homeTitle,
    template: "%s | Kandala Guruprasad (KGP) | mrkgp",
  },

  description: metaDescription,
  keywords: [...DEFAULT_KEYWORDS],
  applicationName: SITE_NAME,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  publisher: person.name,
  category: "portfolio",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: homeTitle,
    description: metaDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kandala Guruprasad (KGP) | mrkgp | Frontend Product Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: metaDescription,
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

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/mrkgp-favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/mrkgp-favicon.png", sizes: "512x512", type: "image/png" },
    ],
  },

  other: {
    "resume": absoluteUrl(person.resume),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${uiSans.variable} ${monoFace.variable} ${displayCondensed.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd),
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans">
        <ProtectMedia />
        <ConditionalLayout>{children}</ConditionalLayout>
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7TWHF32M03"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7TWHF32M03');
          `}
        </Script>
      </body>
    </html>
  );
}
