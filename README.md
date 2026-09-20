# mrkgp — Portfolio

Personal portfolio of **Kandala Guruprasad** (KGP / **mrkgp**), Frontend Product Engineer.

| | |
|---|---|
| **Live site** | [https://mrkgp.com](https://mrkgp.com) |
| **Role** | Frontend Product Engineer — frontend-first, product-minded, full-stack capable |
| **Location** | Tirupati, India |

Editorial, product-focused site for production web products, mobile apps, business websites, and selected case studies. Copy and project facts come from a single JSON inventory so the UI stays aligned with verified evidence.

---

## Features

- **Static export** — deployable to Vercel, Cloudflare Pages, GitHub Pages, or any static host (`out/` after build).
- **Work inventory** — `data/work-inventory.master.json` is the source of truth; `src/lib/content.ts` maps it into routes and UI.
- **Unified case studies** — shared `ChapteredCaseStudy` layout for deep-dive projects (workflow, challenges, decisions, tech).
- **Work archive** — categorized production apps, mobile apps, internal tools, and business websites.
- **SEO** — centralized metadata in `src/lib/seo.ts`, dynamic `sitemap.xml`, `robots.txt`, JSON-LD (Person, WebSite, ProfilePage, breadcrumbs / CreativeWork on case studies).
- **Performance** — lazy-loaded below-fold images, `next/dynamic` for heavy home sections, LCP `priority` on hero assets.
- **Analytics** — Vercel Analytics and Speed Insights (no env vars required in repo).
- **Media** — optional deterrent for casual image save/drag via `ProtectMedia`.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Fonts | Geist, Geist Mono, Bebas Neue (Google Fonts) |
| Content | JSON work inventory + TypeScript mappers |
| Build output | `output: "export"` — unoptimized images for static hosting |

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (comes with Node)

---

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server (Webpack dev mode):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development (`next dev --webpack`) |
| `npm run build` | Production static export → `out/` |
| `npm run start` | Next.js production server (not used for static hosting) |
| `npm run lint` | ESLint (Next.js config) |

### Build and preview static output

```bash
npm run build
npx serve out
```

---

## Site routes

| Path | Purpose |
|------|---------|
| `/` | Home — hero, selected work, process, toolkit, CTA |
| `/projects` | Full work archive by category |
| `/projects/[slug]` | Case study or project detail (inventory-driven) |
| `/about` | About and positioning |
| `/contact` | Contact links and availability |
| `/freelance` | Freelance page (excluded from `robots.txt` / sitemap) |

Project slugs are defined in `data/work-inventory.master.json` (e.g. `procoach`, `khetivalah`, `rdr-tech`, ERP and mobile variants). The sitemap includes core pages plus every project route from `projects` in `content.ts`.

---

## Project structure

```text
.
├── data/
│   └── work-inventory.master.json   # Source of truth for projects & case-study copy
├── public/
│   ├── Projects Images/             # Project and marketing screenshots
│   └── …                            # Favicons, OG image, hero assets
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout, fonts, JSON-LD, analytics
│   │   ├── page.tsx                 # Home
│   │   ├── about/ contact/ projects/ freelance/
│   │   ├── projects/[slug]/page.tsx # Dynamic case studies
│   │   ├── sitemap.ts               # Generated sitemap (static export)
│   │   └── robots.ts                # Crawl rules
│   ├── components/
│   │   ├── case-study/              # ChapteredCaseStudy, chapter rail
│   │   ├── home/                    # Hero, selected work, breadth, timeline
│   │   ├── work/                    # Archive cards and status labels
│   │   ├── BrandMark.tsx Navbar.tsx Footer.tsx ProtectMedia.tsx
│   │   └── ui/                      # Buttons, layout, motion helpers
│   └── lib/
│       ├── content.ts               # Person, projects, mapping from inventory
│       ├── work-inventory.ts        # Types, categories, stack normalization
│       ├── project-images.ts        # Image path resolution
│       ├── seo.ts                   # SITE_URL, metadata helpers, keywords
│       └── types.ts
├── next.config.ts                   # static export, unoptimized images
└── package.json
```

Path alias: `@/*` → `./src/*` (see `tsconfig.json`).

---

## Updating portfolio content

1. Edit **`data/work-inventory.master.json`** (follow the `_instructions.rules` in that file — do not invent metrics or production claims).
2. Adjust **`src/lib/project-images.ts`** if you add or rename files under `public/Projects Images/`.
3. Run **`npm run build`** to verify static generation and routes.

Stack labels shown in the UI strip version numbers via `stripTechVersion()` in `work-inventory.ts`.

Case-study-specific fields (e.g. `workflowSteps`, `builtAreas`, `decisionDetails`, `screenshots`) live on inventory entries and render through `ChapteredCaseStudy.tsx`.

---

## SEO and canonical URLs

- Canonical site URL: **`https://mrkgp.com`** (`src/lib/seo.ts`).
- Open Graph image: `/kandala-guruprasad-portfolio-og.png`.
- After deploy, submit `https://mrkgp.com/sitemap.xml` in Google Search Console.

---

## Deployment notes

- **`next.config.ts`** sets `output: "export"` and `images.unoptimized: true` for static hosts.
- No `.env` variables are required for the app to build; analytics load from Vercel when hosted there.
- Point your custom domain (e.g. **mrkgp.com**) to your static host and ensure HTTPS.

---

## Author

**Kandala Guruprasad**

- Website: [mrkgp.com](https://mrkgp.com)
- Email: kandalaguruprasad@gmail.com
- LinkedIn: [Guruprasad Kandala](https://www.linkedin.com/in/mrkgp/)
- GitHub: [@kandalaguruprasad](https://github.com/kandalaguruprasad)
- Instagram: [@mrkgp_01](https://www.instagram.com/mrkgp_01/)

---

## License

Private portfolio source. All rights reserved unless otherwise noted.

---

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
