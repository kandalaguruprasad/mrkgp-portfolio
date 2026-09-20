export type WorkCategoryId =
  | "production"
  | "websites"
  | "mobile"
  | "internal-tools";

export type ProjectFrame = "product" | "systems" | "delivery";

export type InventoryChallenge = {
  title: string;
  description: string;
};

export type InventoryStack = Partial<{
  frontend: string[];
  mobile: string[];
  backend: string[];
  database: string[];
  stateManagement: string[];
  authentication: string[];
  payments: string[];
  notifications: string[];
  realtime: string[];
  testing: string[];
  deployment: string[];
  other: string[];
}>;

export type InventoryCaseStudy = {
  heroTitle: string;
  heroSubtitle: string;
  context: string;
  problem: string;
  role: string;
  ownership: string[];
  approach: string;
  technicalImplementation: string[];
  engineeringDecisions: string[];
  production: string;
  outcome: string;
};

export type InventoryApplication = {
  slug: string;
  name: string;
  displayName: string;
  category: string;
  type: string;
  status: string;
  statusDetail: string;
  featured: boolean;
  priority: number;
  archiveCategory: WorkCategoryId;
  frame: ProjectFrame;
  timeline: string;
  teamSize: number | null;
  liveUrl: string | null;
  image: string;
  demo: boolean;
  oneLiner: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  myRole: string;
  role: string;
  backendContribution: string;
  ownership: string[];
  features: string[];
  modules: string[];
  rolesSupported: string[];
  stack: InventoryStack | string[];
  engineeringChallenges: InventoryChallenge[];
  architectureDecisions: string[];
  impact: string[];
  caseStudy?: InventoryCaseStudy;
  screenshots: string[];
  relatedApplications?: { name: string; platform: string; purpose: string }[];
};

export type InventoryWebsite = {
  slug: string;
  displayName: string;
  industry: string;
  scope: string;
  role: string;
  stack: string[];
  liveUrl: string;
  status: string;
  priority: number;
  archiveCategory: "websites";
  image: string;
  screenshots: string[];
};

export type WorkInventory = {
  workInventoryVersion: string;
  lastUpdated: string;
  workPage: {
    title: string;
    intro: string;
  };
  categoryCounts: {
    productionApplications: string;
    businessWebsites: string;
    mobileApplications: string;
    nonProductionApplications: string;
  };
  productionApplications: InventoryApplication[];
  businessWebsites: InventoryWebsite[];
  mobileApplications: InventoryApplication[];
  nonProductionApplications: InventoryApplication[];
};

/** Keep Present_Idea public case-study URLs stable. */
export const ROUTE_SLUG_ALIASES: Record<string, string> = {
  "sree-veeranjaneya-erp": "sree-veeranjaneya",
};

export function toRouteSlug(inventorySlug: string): string {
  return ROUTE_SLUG_ALIASES[inventorySlug] ?? inventorySlug;
}

/** Display tech names without version numbers (e.g. "React 18" → "React"). */
export function stripTechVersion(label: string): string {
  return label
    .replace(
      /\b(Next\.js|React Native|React|TypeScript|JavaScript|Angular|Node\.js|Expo|Vue\.js|NestJS|Nest\.js)\s+v?\d+(?:\.\d+)*\b/gi,
      "$1",
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeStackValue(
  stack: InventoryStack | string[] | readonly string[],
): InventoryStack | string[] {
  if (Array.isArray(stack)) {
    return stack.map(stripTechVersion);
  }
  const out: InventoryStack = {};
  for (const [key, items] of Object.entries(stack as InventoryStack)) {
    if (!items?.length) continue;
    (out as Record<string, string[]>)[key] = items.map(stripTechVersion);
  }
  return out;
}

export function flattenStack(
  stack: InventoryStack | string[] | readonly string[],
): string[] {
  const normalized = normalizeStackValue(stack);
  if (Array.isArray(normalized)) return normalized;
  return Object.values(normalized)
    .flat()
    .filter((item): item is string => typeof item === "string");
}

export function buildWorkCategories(inventory: WorkInventory) {
  const counts = inventory.categoryCounts;
  return [
    {
      id: "production" as const,
      value: counts.productionApplications,
      tab: "Production",
      label: "Production Web Products",
      supporting:
        "SaaS, marketplaces, workflow systems, and ERP where I owned product UI and frontend delivery.",
    },
    {
      id: "mobile" as const,
      value: counts.mobileApplications,
      tab: "Mobile",
      label: "Mobile Applications",
      supporting:
        "Release-ready mobile clients — tutoring, marketplace, operations, and QR-menu products.",
    },
    {
      id: "internal-tools" as const,
      value: counts.nonProductionApplications,
      tab: "Internal tools",
      label: "Internal Tools",
      supporting:
        "Internal tools and product UI prototypes — dashboards, admin systems, and specialized workflows.",
    },
    {
      id: "websites" as const,
      value: counts.businessWebsites,
      tab: "Websites",
      label: "Business Websites",
      supporting: "Live client and organization websites across industries.",
    },
  ];
}
