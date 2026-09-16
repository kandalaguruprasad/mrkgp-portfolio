import workInventoryData from "../../data/work-inventory.master.json";
import { getProjectImage, getWebsiteImage } from "./project-images";
import {
  buildWorkCategories,
  flattenStack,
  stripTechVersion,
  toRouteSlug,
  type InventoryApplication,
  type InventoryCaseStudy,
  type InventoryChallenge,
  type InventoryStack,
  type ProjectFrame,
  type WorkCategoryId,
  type WorkInventory,
} from "./work-inventory";

const inventory = workInventoryData as unknown as WorkInventory;

export const person = {
  brand: "MRKGP",
  name: "Kandala Guruprasad",
  preferredName: "Guruprasad",
  professionalRole: "Frontend Product Engineer",
  primaryFocus: "Frontend-first. Product-minded. Full-stack capable.",
  location: "Tirupati, India",
  availability:
    "I'm open to product-focused engineering opportunities where frontend ownership, product thinking, and real engineering problems matter.",
  workMode: ["On-site", "Remote"] as const,
  email: "kandalaguruprasad@gmail.com",
  linkedin: "https://www.linkedin.com/in/guruprasad-kandala-623a45311/",
  github: "https://github.com/kandalaguruprasad",
  instagram: "https://www.instagram.com/mrkgp_01/",
  website: "https://mrkgp.com",
  tagline: "Keep Moving Forward",
  whatsapp: "https://wa.me/919963040110?text=Hi%20KGP%2C%20I%27d%20like%20to%20discuss%20a%20role%20or%20project.",
} as const;

export const positioning = {
  primaryTitle: "Frontend Product Engineer",
  supportLine: "Frontend-first. Product-minded. Full-stack capable.",
  heroHeadline:
    "I build production product interfaces — and own them end to end.",
  heroLead:
    "I lead the UI layer across SaaS, marketplaces, ERP, and workflow systems — structure, authentication, payments, dashboards, and API-backed workflows — from requirements through deployment. I step into backend when the product needs it.",
  ownershipHeading: "I own the product UI.",
  ownershipLead:
    "Architecture, authentication, payments, dashboards, API integration, and the workflows the business actually runs.",
  secondaryStatement:
    "Frontend is my primary ownership area, but I work beyond the UI when needed — APIs, business logic, database operations, integration, debugging, and production delivery.",
} as const;

export const practice = {
  heading: "How I work",
  lead: positioning.ownershipLead,
  principle: {
    title: "Frontend-first, not frontend-only.",
    description: positioning.secondaryStatement,
  },
  areas: [
    {
      title: "Frontend Architecture",
      description:
        "Application structure, component boundaries, state management, and reusable UI patterns.",
    },
    {
      title: "Product UI",
      description:
        "Dashboards, workflows, forms, tables, authentication experiences, and responsive interfaces around real business requirements.",
    },
    {
      title: "API & System Integration",
      description:
        "REST APIs with authentication, loading and error states, data synchronization, and edge cases.",
    },
    {
      title: "Payments",
      description:
        "Stripe and Razorpay flows, payment states, failure handling, and recovery scenarios.",
    },
    {
      title: "Backend Contribution",
      description:
        "Node.js and Spring Boot services when required — APIs, business logic, database operations, and feature integration.",
    },
    {
      title: "Production Engineering",
      description:
        "Implementation through deployment, debugging, edge cases, testing, and production reliability.",
    },
  ],
} as const;

export const workingPrinciples = [
  {
    title: "Understand the workflow first",
    description:
      "Business process, user roles, data flow, and edge cases before deciding how the UI should work.",
  },
  {
    title: "Architecture before scale",
    description:
      "Component boundaries, state ownership, API contracts, and reusable patterns before disconnected screens pile up.",
  },
  {
    title: "Own the feature end-to-end",
    description:
      "Client alignment, API integration, permissions, payments, edge cases, testing, deployment, and production behavior.",
  },
  {
    title: "Frontend-first, not frontend-only",
    description:
      "Primary strength is frontend ownership. When the product requires it, I work across APIs, backend logic, and delivery.",
  },
] as const;

export const domains = [
  "SaaS",
  "Marketplace",
  "Workflow",
  "ERP",
  "Mobile",
] as const;

export const experience = [
  {
    company: "Code Stream Technology Pvt Ltd",
    role: "Software Engineer",
    publicRole: "Frontend Product Engineer",
    roleScope: "Frontend product engineering",
    period: "2021 — Present",
    location: "Hyderabad, India",
    companyType: "Product engineering startup",
    description:
      "Working across SaaS, marketplace, workflow, and ERP products — often from client requirements through deployment.",
    ownership: [
      "Frontend Architecture",
      "Product UI Engineering",
      "UI Design & Prototyping",
      "Requirements & Client Collaboration",
      "Authentication & RBAC",
      "Dashboard & Data Interfaces",
      "API Integration",
      "Payment Integration & Flows",
      "Backend Contribution",
      "Deployment & CI/CD",
      "Production Debugging",
      "End-to-End Delivery",
    ],
    fullStackContribution: [
      "Spring Boot APIs",
      "Node.js APIs",
      "Business Logic",
      "Database Operations",
      "API Contracts",
      "End-to-End Feature Development",
      "Production Debugging",
      "Deployment & Release",
    ],
    keySignals: ["SaaS", "Marketplace", "Workflow", "ERP"],
    deliveryNote:
      "I work across the product delivery cycle — from shaping requirements and interfaces to implementation, testing, and production. That means owning product UI decisions, engineering the frontend against real APIs and auth, then carrying features through debugging, deployment, and live support.",
  },
] as const;

export const about = {
  heading: "I build products, not just screens.",
  pageHeadingLine1: "I own the product UI.",
  pageHeadingLine2: "From idea to release.",
  pageIntro:
    "I started with client websites and business applications. That work led me into product engineering — where the job is complete workflows, not individual pages. Today I own frontend product surfaces at Code Stream Technology, and I stay involved through integration and release when delivery needs it.",
  storyHeading: "From building websites to owning product systems.",
  short:
    "I'm a Frontend Product Engineer focused on building production software that businesses actually use.",
  background:
    "I started by building client websites and business applications, learning how to turn requirements into working software. That experience led me into product engineering, where my work became less about individual pages and more about complete business workflows.",
  currentScope:
    "My primary responsibility is the product UI — architecture, components, authentication, payments, dashboards, forms, API integration, and complex workflows. I've worked across SaaS, agricultural marketplaces, workflow systems, and ERP, often from client requirements through implementation, backend integration, testing, and deployment.",
  backendRelationship:
    "Frontend engineering is my core strength, but delivery does not stop at the UI. Depending on the project and team, I also handle client alignment, backend development, API design, business logic, database integration, and production release — on my own or with backend engineers.",
  companyStory:
    "At Code Stream Technology, I've worked across SaaS, marketplaces, workflow systems, and ERP — owning frontend architecture and product UI, and contributing to client communication, backend development, and deployment when needed.",
  careerGoal:
    "I'm looking to join a product-focused engineering team where I can own larger frontend surfaces, work closely with product and design, and grow toward senior-level product engineering responsibility.",
} as const;

export const contact = {
  heading: "Tell me what you're building.",
  supporting:
    "If you're hiring for frontend product engineering — or building a product that needs clear UI ownership through delivery — I'd like to hear from you.",
  primaryCta: "Get in touch",
  secondaryCta: "View my work",
  fitItems: [
    "Frontend product engineering with ownership across UI, integration, and delivery",
    "Teams building SaaS, marketplaces, workflow systems, or ERP products",
    "On-site or remote opportunities",
  ],
} as const;

export const skillGroups = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "React Hook Form", "Zod", "ShadCN UI", "Material UI", "Angular"] },
  { title: "Application Engineering", items: ["Component architecture", "State management", "React Query", "Forms", "Dashboards", "RBAC", "Recharts", "Chart.js"] },
  { title: "System Integration", items: ["REST APIs", "Authentication", "JWT", "Stripe", "Razorpay", "API contracts", "WebSockets"] },
  { title: "Backend", items: ["Node.js", "Express", "Spring Boot", "SQL", "MySQL", "MongoDB"] },
  { title: "Mobile", items: ["React Native", "Expo", "Ionic", "Cordova"] },
  { title: "Delivery", items: ["Jest", "React Testing Library", "Debugging", "CI/CD", "Deployment", "Performance"] },
  { title: "Design", items: ["Figma", "UI design", "Responsive design", "Prototyping"] },
  {
    title: "AI Tooling",
    items: [
      "Cursor",
      "Claude Code",
      "GitHub Copilot",
      "ChatGPT",
      "Prompt-assisted workflows",
      "AI-assisted debugging",
    ],
  },
] as const;

export const workCategories = buildWorkCategories(inventory);
export const workPageCopy = inventory.workPage;

export type PortfolioProject = {
  slug: string;
  inventorySlug: string;
  title: string;
  oneLiner: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  myRole: string;
  status: string;
  statusDetail: string;
  category: string;
  type: string;
  archiveCategory: WorkCategoryId;
  frame: ProjectFrame;
  featured: boolean;
  priority: number;
  timeline: string;
  teamSize: number | null;
  liveUrl: string | null;
  image?: string;
  ownership: string[];
  features: string[];
  modules: string[];
  rolesSupported: string[];
  stack: string[];
  stackGrouped: InventoryStack | null;
  challenges: InventoryChallenge[];
  architectureDecisions: string[];
  /** Qualitative outcomes only — never unverified metrics from legacy Present data. */
  impact: string[];
  backendContribution: string;
  caseStudy?: InventoryCaseStudy;
  relatedApplications?: { name: string; platform: string; purpose: string }[];
};

export type PortfolioWebsite = {
  slug: string;
  title: string;
  industry: string;
  scope: string;
  role: string;
  stack: string[];
  liveUrl: string;
  status: string;
  priority: number;
  image?: string;
};

function mapApplication(app: InventoryApplication): PortfolioProject {
  const slug = toRouteSlug(app.slug);
  const rawGrouped = Array.isArray(app.stack) ? null : (app.stack as InventoryStack);
  const stackGrouped = rawGrouped
    ? (Object.fromEntries(
        Object.entries(rawGrouped).map(([key, items]) => [
          key,
          (items ?? []).map(stripTechVersion),
        ]),
      ) as InventoryStack)
    : null;
  return {
    slug,
    inventorySlug: app.slug,
    title: app.displayName || app.name,
    oneLiner: app.oneLiner,
    overview: app.overview || app.description,
    problem: app.problem,
    solution: app.solution,
    role: app.role,
    myRole: app.myRole,
    status: app.status,
    statusDetail: app.statusDetail,
    category: app.category,
    type: app.type,
    archiveCategory: app.archiveCategory,
    frame: app.frame,
    featured: app.featured,
    priority: app.priority,
    timeline: app.timeline,
    teamSize: app.teamSize,
    liveUrl: app.liveUrl,
    image: getProjectImage(slug),
    ownership: app.ownership ?? [],
    features: app.features ?? [],
    modules: app.modules ?? [],
    rolesSupported: app.rolesSupported ?? [],
    stack: flattenStack(app.stack ?? []),
    stackGrouped,
    challenges: (app.engineeringChallenges ?? []).filter((c) => c.title?.trim()),
    architectureDecisions: app.architectureDecisions ?? [],
    impact: app.impact ?? [],
    backendContribution: app.backendContribution ?? "",
    caseStudy: app.caseStudy
      ? {
          ...app.caseStudy,
          technicalImplementation: (app.caseStudy.technicalImplementation ?? []).map(
            stripTechVersion,
          ),
        }
      : undefined,
    relatedApplications: app.relatedApplications,
  };
}

function allApplications(): PortfolioProject[] {
  return [
    ...inventory.productionApplications,
    ...inventory.mobileApplications,
    ...inventory.nonProductionApplications,
  ]
    .map(mapApplication)
    .sort((a, b) => a.priority - b.priority);
}

export const projects: PortfolioProject[] = allApplications();

export const featuredProjects: PortfolioProject[] = projects
  .filter((p) => p.featured && p.archiveCategory === "production")
  .sort((a, b) => a.priority - b.priority)
  .slice(0, 3);

export const websites: PortfolioWebsite[] = inventory.businessWebsites
  .map((site) => ({
    slug: site.slug,
    title: site.displayName,
    industry: site.industry,
    scope: site.scope,
    role: site.role,
    stack: (site.stack ?? []).map(stripTechVersion),
    liveUrl: site.liveUrl,
    status: site.status,
    priority: site.priority,
    image: getWebsiteImage(site.slug),
  }))
  .sort((a, b) => a.priority - b.priority);

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(
  category: WorkCategoryId,
): PortfolioProject[] {
  return projects.filter((p) => p.archiveCategory === category);
}

export function getRelatedProjects(
  project: PortfolioProject,
  limit = 3,
): PortfolioProject[] {
  return projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.archiveCategory === project.archiveCategory,
    )
    .slice(0, limit);
}

/** Legacy skills.ts shape for gradual migration. */
export const skills = skillGroups.map((g) => ({
  category: g.title,
  skills: [...g.items],
}));
