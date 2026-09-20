"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(20,22,26,0.22)]",
  secondary:
    "bg-surface text-ink border border-line-strong hover:-translate-y-0.5 hover:border-ink/25",
  ghost: "bg-transparent text-ink hover:bg-grouped",
  onDark:
    "bg-white text-[#16181c] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)]",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-[22px] py-[11px] text-sm",
  lg: "min-h-12 px-[26px] py-[15px] text-[15px]",
};

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium transition-[transform,background-color,color,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  arrow,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  arrow?: boolean;
}) {
  return (
    <button
      className={`${base} group ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {arrow ? (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  external,
  arrow,
  download,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
  arrow?: boolean;
  download?: boolean | string;
}) {
  const cls = `${base} group ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  );

  if (
    download ||
    external ||
    href.startsWith("mailto:") ||
    href.startsWith("http") ||
    href.startsWith("#")
  ) {
    return (
      <a
        href={href}
        className={cls}
        {...(download
          ? {
              download:
                typeof download === "string" ? download : true,
            }
          : {})}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function IconButton({
  children,
  className = "",
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex cursor-pointer items-center justify-center min-h-11 min-w-11 rounded-full bg-surface border border-line text-ink hover:bg-grouped transition-colors active:scale-[0.96] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
