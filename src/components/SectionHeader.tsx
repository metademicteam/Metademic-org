import Link from "next/link";

export default function SectionHeader({
  kicker,
  title,
  href,
  cta = "View all",
}: {
  kicker?: string;
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--hairline-soft)] pb-4">
      <div>
        {kicker && <div className="kicker">{kicker}</div>}
        <h2 className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[var(--foreground)] md:text-[26px]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="hidden shrink-0 items-center gap-1 border-b border-[var(--hairline)] pb-1 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex">
          {cta}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      )}
    </div>
  );
}
