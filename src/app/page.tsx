import Link from "next/link";
import type { Metadata } from "next";
import { ArtCard } from "@/components/ArtCard";
import SectionHeader from "@/components/SectionHeader";
import { FeaturedCard, GridCard } from "@/components/PostCard";
import { featured, news, research } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "https://metademic.org" },
};

export default function Home() {
  return (
    <div className="bg-[#FFFDEC]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [...news, ...research].slice(0, 6).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://metademic.org/news/${p.slug}`,
            name: p.title,
          })),
        }}
      />
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--hairline-soft)]">
        <div className="absolute -right-48 -top-64 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.10),transparent_67%)]" />
        <div className="oai-container py-16 md:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <div className="kicker">Independent research · intelligent systems · distributed computing</div>
              <h1 className="mt-5 text-[clamp(46px,7vw,88px)] font-extrabold leading-[0.94] tracking-[-0.055em] text-[var(--foreground)]">
                Build systems that can think, coordinate, and endure.
              </h1>
              <p className="mt-5 max-w-[760px] text-lg leading-7 text-[var(--muted)]">
                Metademic is an independent research lab. We explore how intelligent, distributed systems can move from research concepts into useful infrastructure — and we publish what we find.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products/racn" className="inline-flex h-[46px] items-center gap-2 bg-[var(--accent)] px-5 text-xs font-bold tracking-wide text-[#FFFDEC] hover:bg-[var(--accent-2)]">
                  EXPLORE PRODUCTS →
                </Link>
                <Link href="/open-research" className="inline-flex h-[46px] items-center gap-2 border border-[var(--hairline)] bg-[var(--panel)] px-5 text-xs font-bold tracking-wide text-[var(--foreground)] hover:border-[#AAA58E]">
                  READ RESEARCH
                </Link>
              </div>
            </div>
            <div className="border border-[var(--hairline)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,243,221,0.96))]">
              <div className="border-b border-[var(--hairline)] px-5 py-5">
                <div className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--foreground)]">2026→</div>
                <div className="text-xs font-bold text-[var(--muted)]">ROADMAP HORIZON</div>
              </div>
              <div className="border-b border-[var(--hairline)] px-5 py-5">
                <div className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--foreground)]">07</div>
                <div className="text-xs font-bold text-[var(--muted)]">LAB MEMBERS / SLOTS</div>
              </div>
              <div className="px-5 py-5">
                <div className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--foreground)]">Live</div>
                <div className="text-xs font-bold text-[var(--muted)]">SCHOLARLY PLATFORM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarly platform — primary CTA */}
      <div className="oai-container pt-10 md:pt-12">
        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="overflow-hidden rounded-md border border-[var(--hairline)] bg-[var(--panel)]">
            <ArtCard variant={2} ratio="wide" />
            <div className="p-6">
              <div className="kicker">Scholarly platform · Live</div>
              <h3 className="mt-2 text-[20px] font-bold tracking-[-0.025em] text-[var(--foreground)]">Open research at metademic.com</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Journals, publications, researcher profiles — the live scholarly information system operated by Metademic. Link to it — don't clone it here.
              </p>
              <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 border border-[var(--hairline)] bg-[var(--panel)] px-4 py-2 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)]">
                VISIT WWW.METADEMIC.COM
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
          <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] p-5">
            <div className="kicker">From the lab</div>
            <h3 className="mt-2 text-[18px] font-bold tracking-[-0.025em] text-[var(--foreground)]">Latest research</h3>
            <div className="mt-4 grid gap-4">
              {research.slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/research/${p.slug}`} className="group flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <div>
                    <div className="text-sm font-semibold leading-5 text-[var(--foreground)] group-hover:text-[var(--accent-2)]">{p.title}</div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">{p.date} · {p.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/research" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-2)]">
              ALL RESEARCH →
            </Link>
          </div>
        </div>
      </div>

      {/* Focus areas */}
      <div className="oai-container pt-10 md:pt-12">
        <div className="border-t border-[var(--hairline-soft)] pt-10 md:pt-12">
          <SectionHeader kicker="Focus areas" title="From research to working systems" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel)] p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">01 / SYSTEMS</div>
              <h3 className="mt-4 text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">Resource coordination</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Architectures for finding, scheduling, sharing, and measuring compute resources across heterogeneous devices.</p>
            </div>
            <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel)] p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">02 / INTELLIGENCE</div>
              <h3 className="mt-4 text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">Adaptive autonomy</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Machine-learning and control methods that make complex systems more robust, efficient, and responsive.</p>
            </div>
            <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel)] p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">03 / TRANSLATION</div>
              <h3 className="mt-4 text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">Deployable products</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Prototype research in software and hardware so technical ideas can be tested under real operating constraints.</p>
            </div>
          </div>
        </div>
      </div>

      {/* News — reduced from 6 to 4 */}
      <div className="oai-container pt-10 md:pt-12">
        <div className="border-t border-[var(--hairline-soft)] pt-10 md:pt-12">
          <SectionHeader kicker="Recent" title="News" href="/news" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">{news.slice(0, 4).map((p) => <GridCard key={p.slug} post={p} />)}</div>
          <div className="mt-6 md:hidden"><Link href="/news" className="inline-flex items-center gap-1 rounded-md border border-[var(--hairline)] px-4 py-2 text-sm font-semibold">View all news <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg></Link></div>
        </div>
      </div>

      {/* Research preview — reduced from 4 to 3 */}
      <div className="oai-container pt-10 md:pt-12">
        <div className="border-t border-[var(--hairline-soft)] pt-10 md:pt-12">
          <SectionHeader kicker="From the lab" title="Latest research" href="/research" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">{research.slice(0, 3).map((p) => <GridCard key={p.slug} post={p} />)}</div>
        </div>
      </div>

      {/* Manifesto */}
      <div className="oai-container py-10 md:py-12">
        <div className="border-t border-[var(--hairline-soft)] pt-10 md:pt-12">
          <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div>
                <div className="kicker">Why Metademic</div>
                <h3 className="mt-2 max-w-[20ch] text-[clamp(27px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.035em] text-[var(--foreground)]">
                  Open research is the <em className="not-italic text-[var(--accent)]">product</em>.
                </h3>
                <p className="mt-3 max-w-[55ch] text-sm leading-6 text-[var(--muted)] md:text-[15px]">
                  We operate metademic.com as scholarly infrastructure — and build prototypes like RACoN to help researchers work with long, cited, reproducible sources.
                </p>
              </div>
              <div className="overflow-hidden rounded-md border border-[var(--hairline)] bg-[var(--panel)]">
                <ArtCard variant={6} ratio="wide" />
                <div className="p-4">
                  <div className="text-sm font-semibold text-[var(--foreground)]">Scholarly infrastructure + hybrid compute</div>
                  <div className="mt-1 text-sm leading-6 text-[var(--muted)]">Journals at metademic.com, prototypes from the lab.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
