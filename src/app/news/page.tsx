import SectionHeader from "@/components/SectionHeader";
import { GridCard } from "@/components/PostCard";
import { news } from "@/lib/content";

export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <div className="bg-white">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">News</div>
          <h1 className="display mt-3 max-w-[14ch] text-[30px] text-zinc-900 md:text-[42px]">News</h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-zinc-600 md:text-[15px]">
            Updates from the lab and the scholarly platform. Editorial placeholders — no invented customers or pricing.
          </p>
        </div>
      </div>
      <div className="oai-container pt-8 pb-12">
        <SectionHeader title="Latest" kicker="All stories" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((p) => (
            <GridCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
