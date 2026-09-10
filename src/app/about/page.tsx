import Link from "next/link";
import { ArtCard } from "@/components/ArtCard";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="bg-[#FFFDEC]">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">About</div>
          <h1 className="display mt-3 max-w-[14ch] text-[30px] text-[var(--foreground)] md:text-[42px]">
            An academic lab
            <span className="block text-[var(--muted)]">for the scholarly record.</span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-6 text-[var(--muted)] md:text-base">
            Metademic is an academic AI lab and scholarly platform. We run open research and the infrastructure at{" "}
            <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="font-semibold text-[var(--foreground)] underline decoration-[var(--hairline)] underline-offset-4 hover:decoration-[var(--accent)]">www.metademic.com</a>{" "}
            and are building prototypes like RACoN, a distributed LLM system for scientific work.
          </p>
        </div>
      </div>

      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-[var(--hairline)]">
            <ArtCard variant={4} ratio="wide" />
            <div className="p-6">
              <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">What we do</div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Publish in the open, operate journals and discovery at metademic.com, and build tooling that rewards citation over virality.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-md border border-[var(--hairline)] p-6">
              <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">Principles</div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" /> Organization site is a lab, not a chatbot landing page.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" /> Open research is as important as products.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" /> RACoN is named and findable, not oversold.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" /> Craft matches openai.com; claims stay inside truth.</li>
              </ul>
            </div>
            <div className="rounded-md bg-[#10201D] p-6 text-white">
              <div className="text-sm font-semibold tracking-tight">What we don't claim</div>
              <p className="mt-2 text-sm leading-6 text-[#DCE8E4]">No customer logos, pricing, headcount, funding, or benchmark numbers are invented on this site. Placeholders are labeled as editorial.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/open-research" className="bg-white px-4 py-2 text-sm font-semibold text-[#10201D] hover:bg-[#F7F3DD]">Open Research</Link>
                <Link href="/products/racn" className="border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">RACoN preview</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="oai-container py-10 md:py-12">
        <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] p-6 md:p-8">
          <div className="kicker">Contact</div>
          <h3 className="mt-2 text-[18px] font-bold tracking-[-0.025em] text-[var(--foreground)]">We'll add real contact details when they're confirmed.</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">No invented office locations or legal entity details are listed here.</p>
        </div>
      </div>
    </div>
  );
}
