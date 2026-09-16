"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "/", label: "Home", match: "/", exact: true },
  { href: "/projects", label: "Work", match: "/projects" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/contact", label: "Contact", match: "/contact" },
];

function useActive() {
  const pathname = usePathname();
  return (link: (typeof links)[number]) => {
    if (!link.match) return false;
    if ("exact" in link && link.exact) return pathname === link.match;
    return pathname.startsWith(link.match);
  };
}

function scrollToHash(href: string, pathname: string) {
  if (href === "/" && pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (href.startsWith("/#") && pathname === "/") {
    const id = href.slice(2);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* Desktop: centered floating pill. Mobile: flush translucent bar + slide-down
   sheet, remounted per route via `key` so it always opens closed. */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="pointer-events-none hidden justify-center px-4 pt-4 lg:flex">
        <DesktopPill />
      </div>
      <MobileBarWrapper />
    </header>
  );
}

function DesktopPill() {
  const pathname = usePathname();
  const isActive = useActive();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-auto flex items-center gap-7 rounded-full border border-line bg-white/75 py-[9px] pl-[22px] pr-[9px] shadow-[var(--shadow-nav)] backdrop-blur-xl backdrop-saturate-[1.8]"
    >
      <BrandMark className="text-[15px]" />
      <div className="flex items-center gap-1">
        {links.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => scrollToHash(link.href, pathname)}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3.5 py-[7px] text-[13.5px] transition-colors duration-[var(--duration-fast)] ${
                active
                  ? "bg-[rgba(20,22,26,0.06)] font-medium text-ink"
                  : "font-normal text-ink-secondary hover:bg-[rgba(20,22,26,0.045)] hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      <Link
        href="/contact"
        className="rounded-full bg-accent px-[17px] py-[9px] text-[13.5px] font-medium text-white transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(20,22,26,0.24)]"
      >
        Get in touch
      </Link>
    </nav>
  );
}

function MobileBarWrapper() {
  const pathname = usePathname();
  return <MobileBar key={pathname} pathname={pathname} />;
}

function MobileBar({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const isActive = useActive();

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between border-b border-line bg-[rgba(245,245,243,0.82)] px-4 py-2 backdrop-blur-xl backdrop-saturate-[1.8]">
        <BrandMark className="text-[16px]" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line bg-surface text-ink active:scale-95"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-b border-line bg-surface/97 p-2 shadow-[var(--shadow-float)] backdrop-blur-xl">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setOpen(false);
                  scrollToHash(link.href, pathname);
                }}
                aria-current={active ? "page" : undefined}
                className={`block rounded-[var(--radius-control)] px-4 py-3 text-sm font-medium ${
                  active ? "bg-grouped text-ink" : "text-ink-secondary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-[var(--radius-control)] bg-accent px-4 py-3 text-center text-sm font-medium text-white"
          >
            Get in touch
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/* Sticky bottom tab bar — the design shows it only on the mobile home
   screen, so it renders there and nowhere else (the hamburger sheet covers
   navigation on every other route). Light translucent pill with a scrim so
   content reads cleanly beneath it. */
export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  const tabs = [
    { href: "/", label: "Home", exact: true },
    { href: "/projects", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  const active = (t: (typeof tabs)[number]) =>
    t.exact ? pathname === "/" : pathname.startsWith(t.href);

  return (
    <div className="pointer-events-none sticky bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-10 before:absolute before:inset-x-0 before:bottom-0 before:top-0 before:-z-10 before:bg-gradient-to-t before:from-background before:from-40% before:to-transparent lg:hidden">
      <nav
        aria-label="Mobile"
        className="pointer-events-auto flex gap-1 rounded-full border border-line bg-white/85 p-[5px] shadow-[var(--shadow-float)] backdrop-blur-xl"
      >
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active(t) ? "page" : undefined}
            className={`rounded-full px-[18px] py-[9px] text-[13px] transition-colors ${
              active(t)
                ? "bg-accent font-medium text-white"
                : "text-ink-secondary"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
