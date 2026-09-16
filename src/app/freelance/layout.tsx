import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Redirecting to the contact page.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://mrkgp.com/contact" },
};

export default function FreelanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
