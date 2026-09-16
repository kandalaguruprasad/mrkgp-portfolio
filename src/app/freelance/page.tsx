"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Freelance sales experience retired from primary IA. */
export default function FreelancePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-[#1d1d1f] px-6">
      <p className="text-sm text-[#6e6e73]">
        Redirecting to contact…
      </p>
    </main>
  );
}
