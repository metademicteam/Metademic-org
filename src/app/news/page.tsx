import { GridCard } from "@/components/PostCard";
import { news } from "@/lib/content";

export const metadata = { title: "News" };

const researchAreas = [
  {
    title: "Tabular data",
    desc: "Two-dimensional tables (rows/columns) used for classification, regression, and ranking.",
    stats: { publications: 11, posts: 2, datasets: 2 },
  },
  {
    title: "Large-scale machine learning",
    desc: "Training powerful models efficiently and making resources accessible to the community.",
    stats: { publications: 18, posts: 2, datasets: 0 },
  },
  {
    title: "Generative models",
    desc: "Their power in computer vision for image generation and various applications.",
    stats: { publications: 21, posts: 6, datasets: 0 },
  },
  {
    title: "Graph machine learning",
    desc: "Representing data from social networks, molecules, and text, and analyzing graph-structured data.",
    stats: { publications: 18, posts: 7, datasets: 2 },
  },
  {
    title: "Neural algorithmic reasoning",
    desc: "Building models that execute classic algorithms, combining neural networks with theoretical guarantees.",
    stats: { publications: 2, posts: 2, datasets: 0 },
  },
  {
    title: "Computer vision",
    desc: "Contributions to the community, specifically in image retrieval and generative modelling.",
    stats: { publications: 43, posts: 5, datasets: 1 },
  },
];

export default function NewsPage() {
  return (
    <div className="bg-[#FFFDEC]">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">News</div>
          <h1 className="display mt-3 max-w-[14ch] text-[30px] text-[var(--foreground)] md:text-[42px]">News</h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)] md:text-[15px]">
            Updates from the lab and the scholarly platform. Editorial placeholders — no invented customers or pricing.
          </p>
        </div>
      </div>

      <div className="oai-container pt-8 pb-12">
        {/* Research Areas Section */}
        <div className="mb-12">
          <div className="mb-8">
            <div className="kicker">Research areas</div>
            <h2 className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[var(--foreground)] md:text-[26px]">
              Our research covers the most significant areas in modern machine learning.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="border border-[var(--hairline)] bg-[var(--panel)] p-6"
              >
                <h3 className="text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{area.desc}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--muted)]">
                  {area.stats.publications > 0 && (
                    <span className="border border-[var(--hairline)] bg-[var(--panel-2)] px-2 py-1 font-semibold">
                      {area.stats.publications} publications
                    </span>
                  )}
                  {area.stats.posts > 0 && (
                    <span className="border border-[var(--hairline)] bg-[var(--panel-2)] px-2 py-1 font-semibold">
                      {area.stats.posts} posts
                    </span>
                  )}
                  {area.stats.datasets > 0 && (
                    <span className="border border-[var(--hairline)] bg-[var(--panel-2)] px-2 py-1 font-semibold">
                      {area.stats.datasets} datasets
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div className="border-t border-[var(--hairline-soft)] pt-8">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--hairline-soft)] pb-4">
            <div>
              <div className="kicker">Latest</div>
              <h2 className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[var(--foreground)] md:text-[26px]">
                News
              </h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((p) => (
              <GridCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
