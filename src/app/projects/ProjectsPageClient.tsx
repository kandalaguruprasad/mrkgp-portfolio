"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getProjectsByCategory,
  websites,
  workPageCopy,
} from "@/lib/content";
import { ContentContainer } from "@/components/ui/Layout";
import { MotionReveal, PageEnter } from "@/components/ui/motion";
import {
  EditorialRow,
  FlagshipPanel,
  WebsiteCard,
  WorkCard,
} from "@/components/work/WorkPieces";

type Tab = "production" | "mobile" | "non-production" | "websites";

const tabs: { id: Tab; label: string }[] = [
  { id: "production", label: "Production" },
  { id: "mobile", label: "Mobile" },
  { id: "non-production", label: "Non-production" },
  { id: "websites", label: "Websites" },
];

function parseTab(value: string | null): Tab {
  return tabs.some((t) => t.id === value) ? (value as Tab) : "production";
}

export default function ProjectsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = parseTab(searchParams.get("category"));

  const setTab = useCallback(
    (next: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", next);
      router.replace(`/projects?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const production = useMemo(() => getProjectsByCategory("production"), []);
  const mobile = useMemo(() => getProjectsByCategory("mobile"), []);
  const nonProduction = useMemo(
    () => getProjectsByCategory("non-production"),
    [],
  );

  const bySlug = (s: string) =>
    production.find((p) => p.inventorySlug === s || p.slug === s);
  const procoach = bySlug("procoach");
  const kheti = bySlug("khetivalah");
  const alsoBuilt = production.filter(
    (p) => !["procoach", "khetivalah"].includes(p.inventorySlug),
  );

  const count =
    tab === "production"
      ? production.length
      : tab === "mobile"
        ? mobile.length
        : tab === "non-production"
          ? nonProduction.length
          : websites.length;

  return (
    <PageEnter>
      <section className="pb-14 pt-16 md:pt-20">
        <ContentContainer>
          <MotionReveal>
            <p className="text-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              Work
            </p>
            <h1 className="mt-5 max-w-[52rem] text-[clamp(2.125rem,7vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.042em] text-ink">
              {workPageCopy.title}
            </h1>
            <p className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-ink-secondary">
              {workPageCopy.intro}
            </p>
          </MotionReveal>

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Work categories"
              className="flex max-w-full gap-[3px] self-start overflow-x-auto rounded-[12px] bg-[rgba(20,22,26,0.05)] p-[3px] [scrollbar-width:none]"
            >
              {tabs.map((t) => {
                const selected = t.id === tab;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTab(t.id)}
                    className={`inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-[9px] px-3.5 py-2 text-[13.5px] transition-colors sm:px-4 ${
                      selected
                        ? "bg-surface font-medium text-ink shadow-[0_1px_3px_rgba(20,22,26,0.1)]"
                        : "font-normal text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            <span className="text-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              {String(count).padStart(2, "0")} {tab === "websites" ? "sites" : "projects"}
            </span>
          </div>
        </ContentContainer>
      </section>

      {tab === "production" ? (
        <>
          {procoach ? (
            <ContentContainer className="pb-7">
              <FlagshipPanel project={procoach} />
            </ContentContainer>
          ) : null}
          {kheti ? (
            <ContentContainer className="py-7">
              <EditorialRow project={kheti} />
            </ContentContainer>
          ) : null}
          <ContentContainer className="pb-24 pt-7 md:pb-32">
            <MotionReveal>
              <p className="mb-6 text-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Also built
              </p>
            </MotionReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {alsoBuilt.map((p, i) => (
                <WorkCard key={p.slug} project={p} tone={i === 0 ? "tint" : "surface"} />
              ))}
            </div>
          </ContentContainer>
        </>
      ) : (
        <ContentContainer className="pb-24 pt-4 md:pb-32">
          {tab === "websites" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {websites.map((site) => (
                <WebsiteCard
                  key={site.slug}
                  title={site.title}
                  industry={site.industry}
                  scope={site.scope}
                  liveUrl={site.liveUrl}
                  image={site.image}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {(tab === "mobile" ? mobile : nonProduction).map((p) => (
                <WorkCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </ContentContainer>
      )}
    </PageEnter>
  );
}
