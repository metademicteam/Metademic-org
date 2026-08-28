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
    <div className="bg-white">
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
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-6 md:py-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-black px-2.5 py-1 font-medium tracking-wide text-white">Organization</span>
            <span className="text-zinc-500">Metademic — academic AI lab & scholarly platform</span>
          </div>
          <h1 className="display mt-4 max-w-[15ch] text-[32px] text-zinc-900 md:text-[44px] lg:text-[52px]">
            An academic lab
            <span className="block text-zinc-500">for open science.</span>
          </h1>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-6 text-zinc-600 md:text-base">
            Open research at <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">www.metademic.com</a> — journals, publications, researcher profiles. And{" "}
            <Link href="/products/racn" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">RACN</Link>: a hybrid P2P LLM — <em>install the node once, use it everywhere on the web</em>.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-zinc-500">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">Concept → Simulation → Prototype → LAN → Distributed AI → Security → WAN → Scale → Public Preview → Global Hybrid → Sustainable Service</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/chat" className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Start chatting — RACN</Link>
            <Link href="/download" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">Download node</Link>
            <Link href="/open-research" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">Open Research</Link>
          </div>
        </div>
      </div>

      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.85fr]">
          <FeaturedCard post={featured} />
          <div className="grid gap-4">
            <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4 md:p-5">
              <div className="kicker">Open Research</div>
              <h3 className="mt-2 text-[18px] font-semibold tracking-tight text-zinc-900">The scholarly platform is live.</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Journals, articles, researcher profiles run at <span className="font-medium text-zinc-900">metademic.com</span> — the lab that operates that system.</p>
              <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50">
                Visit www.metademic.com
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.5 7H10.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </a>
              <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white"><ArtCard variant={2} ratio="wide" /></div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/open-research" className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50">Open Research overview</Link>
                <Link href="/research" className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50">Research index</Link>
              </div>
            </div>
            <div className="rounded-[22px] border border-zinc-900 bg-zinc-900 p-5 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium tracking-wide">Hybrid · Half-installed</div>
              <h3 className="mt-3 text-[18px] font-semibold tracking-tight">RACN — install once, chat anywhere</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">P2P mesh + pipeline. 500 credits on signup. Contribute GPU to earn. Confidential → SealedBox.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/download" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100">Download node<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M7 3.5V10.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M4.5 8L7 10.5L9.5 8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
                <Link href="/chat" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">Open chat →</Link>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-white/10"><ArtCard variant={6} ratio="wide" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="oai-container pt-10 md:pt-12">
        <Link href="/roadmap" className="group flex items-center justify-between gap-4 rounded-[18px] border border-zinc-200 bg-zinc-50 px-5 py-4 hover:bg-white md:px-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">Roadmap</div>
            <div className="mt-1 text-[15px] font-semibold tracking-tight text-zinc-900">Concept → Sustainable Service — view the full timeline →</div>
            <div className="mt-1 text-sm text-zinc-600">RACN from concept to WAN — each validation stage maps to Papers 1–7.</div>
          </div>
          <span className="hidden shrink-0 rounded-full bg-black px-4 py-2 text-sm font-medium text-white group-hover:bg-zinc-800 md:inline-flex">Open roadmap</span>
        </Link>
      </div>

      <div className="oai-container pt-10 md:pt-12">
        <SectionHeader kicker="Recent" title="News" href="/news" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{news.slice(0, 6).map((p) => <GridCard key={p.slug} post={p} />)}</div>
        <div className="mt-6 md:hidden"><Link href="/news" className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium">View all news <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg></Link></div>
      </div>

      <div className="oai-container pt-10 md:pt-12">
        <SectionHeader kicker="From the lab" title="Latest research" href="/research" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{research.slice(0, 4).map((p) => <GridCard key={p.slug} post={p} />)}</div>
      </div>

      <div className="oai-container py-10 md:py-12">
        <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="kicker">Why Metademic</div>
              <h3 className="mt-2 max-w-[20ch] text-[22px] font-semibold leading-tight tracking-[-0.02em] text-zinc-900 md:text-[28px]">Open research is the product.</h3>
              <p className="mt-3 max-w-[55ch] text-sm leading-6 text-zinc-600 md:text-[15px]">
                We operate <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">metademic.com</a> as scholarly infrastructure — and build RACN to help researchers work with long, cited, reproducible sources.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/chat" className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Chat with RACN</Link>
                <Link href="/about" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">About Metademic</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[18px] border border-zinc-200 bg-white">
              <ArtCard variant={1} ratio="wide" />
              <div className="p-4"><div className="text-sm font-medium text-zinc-900">Scholarly infrastructure + hybrid compute</div><div className="mt-1 text-sm leading-6 text-zinc-600">Journals at metademic.com, P2P inference via RACN — install once, use everywhere on the web.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
