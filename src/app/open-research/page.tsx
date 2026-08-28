import Link from "next/link";
import { ArtCard } from "@/components/ArtCard";

export const metadata = { title: "Open Research" };

export default function OpenResearchPage() {
  return (
    <div className="bg-white">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">Open Research</div>
          <h1 className="display mt-3 max-w-[16ch] text-[30px] text-zinc-900 md:text-[42px]">
            Open research
            <span className="block text-zinc-500">is the product.</span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-6 text-zinc-600 md:text-base">
            Metademic operates a scholarly information system at{" "}
            <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">
              www.metademic.com
            </a>{" "}
            — journals, publications, and researcher profiles. This site is the organization homepage. Open Research is a first-class destination, not a footer link.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Visit www.metademic.com</a>
            <Link href="/research" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">Browse research</Link>
          </div>
        </div>
      </div>

      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[22px] border border-zinc-200 p-6 md:p-7">
            <div className="kicker">Destination</div>
            <h2 className="mt-2 text-[20px] font-semibold tracking-tight text-zinc-900">www.metademic.com</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              The live scholarly platform. Journals, article pages, search and discovery, and researcher profiles. Link to it — don’t restyle or clone it here.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-zinc-700">
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> Journals and editorial scope</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> Publications and article-level pages</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> Researcher profiles and attribution</li>
            </ul>
            <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              Open metademic.com
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M6 3.5H11V8.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 3.5 5.5 9" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M3.5 5.5V11H9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-50">
            <ArtCard variant={2} ratio="wide" />
            <div className="p-6">
              <div className="text-sm font-medium text-zinc-900">Scholarly infrastructure</div>
              <div className="mt-1 text-sm leading-6 text-zinc-600">Journals and researcher profiles live at metademic.com. The art card is a placeholder — no fake team photos or invented publications.</div>
            </div>
          </div>
        </div>

        <div id="journals" className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 p-5">
            <div className="text-sm font-semibold tracking-tight text-zinc-900">Principles</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Publish in the open. Preserve provenance. Correct visibly. Open access does not mean open-washing.</p>
            <Link href="/research/open-access-does-not-mean-open-washing" className="mt-3 inline-flex text-sm font-medium text-zinc-900">Read the note →</Link>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-5">
            <div className="text-sm font-semibold tracking-tight text-zinc-900">Journals</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Titles and scope live on metademic.com. We link out rather than duplicate the catalog here.</p>
            <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-zinc-900">Browse on metademic.com →</a>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-5">
            <div className="text-sm font-semibold tracking-tight text-zinc-900">Corrections</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Retractions and corrections are part of the record. Principles and examples from the platform.</p>
            <Link href="/research/retraction-and-correction-principles" className="mt-3 inline-flex text-sm font-medium text-zinc-900">Principles →</Link>
          </div>
        </div>
      </div>

      <div className="oai-container py-10 md:py-12">
        <div className="rounded-[24px] border border-zinc-900 bg-zinc-900 p-6 text-white md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-white px-2.5 py-1 font-medium text-zinc-900">Products</span>
            <span className="text-zinc-400">Preview</span>
          </div>
          <h3 className="mt-3 text-[20px] font-semibold tracking-tight md:text-[24px]">RACN belongs here too.</h3>
          <p className="mt-2 max-w-[60ch] text-sm leading-6 text-zinc-300">
            A distributed LLM for long, cited, reproducible sources — built to work next to the journal, not in place of it.
          </p>
          <Link href="/products/racn" className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
            Explore RACN
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
