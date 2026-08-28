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
    <div className="flex items-end justify-between gap-4 border-b border-[var(--hairline)] pb-4">
      <div>
        {kicker && <div className="kicker">{kicker}</div>}
        <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-zinc-900 md:text-[26px]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="hidden shrink-0 items-center gap-1 rounded-full border border-zinc-200 px-3.5 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 md:inline-flex">
          {cta}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      )}
    </div>
  );
}
