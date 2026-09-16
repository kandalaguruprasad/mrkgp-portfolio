export type { PortfolioProject, PortfolioWebsite } from "./content";
export type { WorkCategoryId, ProjectFrame, InventoryCaseStudy } from "./work-inventory";

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
}
