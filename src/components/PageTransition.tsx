"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* Lightweight route transition: a keyed wrapper re-runs the CSS page-enter
   animation on navigation. No exit animation and no JS animation loop, so a
   navigation can never leave the page stuck faded out. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
