import SectionHeader from "@/components/SectionHeader";
import { GridCard } from "@/components/PostCard";
import { research, featured } from "@/lib/content";
import { FeaturedCard } from "@/components/PostCard";

export const metadata = { title: "Research" };

export default function ResearchIndex() {
  return (
    <div className="bg-[#FFFDEC]">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">Research</div>
          <h1 className="display mt-3 max-w-[14ch] text-[30px] text-[var(--foreground)] md:text-[42px]">Research</h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)] md:text-[15px]">
            Papers, notes, and benchmarks from the lab. Placeholders are honest — we don’t present editorial cards as publications.
          </p>
        </div>
      </div>

      <div className="oai-container pt-8">
        <div className="rounded-md border border-[var(--hairline)] p-6 md:p-7">
          <div className="kicker">Featured</div>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FeaturedCard post={featured} />
            <div className="rounded-md bg-[var(--panel-2)] p-5 text-sm leading-6 text-[var(--muted)]">
              <div className="font-semibold text-[var(--foreground)]">How to read this index</div>
              <p className="mt-2">Each card links to a template article page. Replace with real papers when ready; the IA already mirrors openai.com — research is parallel to product, not buried under it.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="oai-container py-10">
        <SectionHeader title="All research" kicker="Index" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {research.map((p) => (
            <GridCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
