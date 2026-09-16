"use client";

import { usePathname } from "next/navigation";
import Navbar, { MobileTabBar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFreelance = pathname.startsWith("/freelance");

  if (isFreelance) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      <Navbar />
      <main id="main" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
