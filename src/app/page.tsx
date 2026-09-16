import dynamic from "next/dynamic";
import { getProjectBySlug, getProjectsByCategory } from "@/lib/content";
import { PageEnter } from "@/components/ui/motion";
import { HomeHero } from "@/components/home/HomeHero";
import { Lifecycle } from "@/components/home/Lifecycle";

const sectionFallback = () => (
  <div className="section-y" aria-hidden />
);

const FlagshipProCoach = dynamic(
  () =>
    import("@/components/home/FlagshipProCoach").then((m) => m.FlagshipProCoach),
  { loading: sectionFallback },
);

const SelectedWork = dynamic(
  () => import("@/components/home/SelectedWork").then((m) => m.SelectedWork),
  { loading: sectionFallback },
);

const ProductPhilosophy = dynamic(
  () =>
    import("@/components/home/ProductPhilosophy").then(
      (m) => m.ProductPhilosophy,
    ),
  { loading: sectionFallback },
);

const ExperienceTimeline = dynamic(
  () =>
    import("@/components/home/ExperienceTimeline").then(
      (m) => m.ExperienceTimeline,
    ),
  { loading: sectionFallback },
);

const TechnicalBreadth = dynamic(
  () =>
    import("@/components/home/TechnicalBreadth").then((m) => m.TechnicalBreadth),
  { loading: sectionFallback },
);

const PersonalAbout = dynamic(
  () => import("@/components/home/PersonalAbout").then((m) => m.PersonalAbout),
  { loading: sectionFallback },
);

const ClosingCta = dynamic(
  () => import("@/components/home/ClosingCta").then((m) => m.ClosingCta),
  { loading: sectionFallback },
);

export default function HomePage() {
  const production = getProjectsByCategory("production");
  const procoach = getProjectBySlug("procoach") ?? production[0];

  return (
    <PageEnter>
      <HomeHero />
      <Lifecycle />
      <FlagshipProCoach project={procoach} />
      <SelectedWork projects={production} />
      <ProductPhilosophy />
      <ExperienceTimeline />
      <TechnicalBreadth />
      <PersonalAbout />
      <ClosingCta />
    </PageEnter>
  );
}
