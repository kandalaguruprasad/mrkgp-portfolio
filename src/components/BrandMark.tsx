import Link from "next/link";

/** Wordmark with accent period matching brand blue. */
export function BrandMark({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`font-semibold tracking-[-0.02em] text-ink ${className}`}
    >
      mrKGP
      <span className="text-[#2F6DF0]" aria-hidden>
        .
      </span>
    </Link>
  );
}

export function BrandMarkText({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-[-0.02em] ${className}`}>
      mrKGP
      <span className="text-[#2F6DF0]" aria-hidden>
        .
      </span>
    </span>
  );
}
