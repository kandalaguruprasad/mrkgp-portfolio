import type { ReactNode } from "react";

export function ContentContainer({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[var(--content-max)] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
