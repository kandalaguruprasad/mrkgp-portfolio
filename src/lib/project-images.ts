/** Factual screenshot paths under public/Projects Images. */

const PROJECT_IMAGES: Record<string, string> = {
  procoach: "/Projects Images/SaaS/procoach-coaching-marketplace-ui.png",
  khetivalah: "/Projects Images/SaaS/khetivalah-agriculture-marketplace-ui.png",
  "rdr-tech": "/Projects Images/SaaS/rdr-tech-workflow-platform-ui.png",
  "hero-app": "/Projects Images/Mobile/myhero-tutoring-marketplace-app-ui.png",
  "khetivala-app":
    "/Projects Images/Mobile/khetivala-app-agriculture-mobile-ui.png",
  "rdrtech-app": "/Projects Images/Mobile/rdr-tech-app-workflow-mobile-ui.png",
  "cs-menu-scanner":
    "/Projects Images/Mobile/cs-menu-scanner-qr-menu-app-ui.png",
  "optimo-logix":
    "/Projects Images/NonProduction/optimo-logix-logistics-web-ui.png",
  "school-admin-pro":
    "/Projects Images/NonProduction/school-admin-pro-education-admin-ui.png",
  "annotation-tool":
    "/Projects Images/NonProduction/annotation-tool-labeling-web-ui.png",
};

const WEBSITE_IMAGES: Record<string, string> = {
  codestream: "/Projects Images/website/codestream-agency-website.png",
  whatwhyhowlearn:
    "/Projects Images/website/whatwhyhowlearn-education-website.png",
  rcsquare: "/Projects Images/website/rcsquare-technologies-website.png",
  "sree-veeranjaneya-industries":
    "/Projects Images/website/sree-veeranjaneya-industries-website.png",
  sgreens: "/Projects Images/website/sgreens-business-website.png",
  "excel-education": "/Projects Images/website/excel-education-website.png",
  "bharat-infra-mart": "/Projects Images/website/bharat-infra-mart-website.png",
  "mig-dyno": "/Projects Images/website/mig-dyno-website.png",
};

export function getProjectImage(routeSlug: string): string | undefined {
  const path = PROJECT_IMAGES[routeSlug];
  return path ? path.replace(/ /g, "%20") : undefined;
}

export function getWebsiteImage(slug: string): string | undefined {
  const path = WEBSITE_IMAGES[slug];
  return path ? path.replace(/ /g, "%20") : undefined;
}
