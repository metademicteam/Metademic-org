import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, news } from "@/lib/content";
import { ArtCard } from "@/components/ArtCard";

export function generateStaticParams() {
  return news.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? post.title : "News" };
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return notFound();

  return (
    <article className="bg-white">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 font-medium tracking-wide text-white">{post.category}</span>
            <span className="text-zinc-500">{post.date} · {post.readTime}</span>
          </div>
          <h1 className="display mt-4 max-w-[18ch] text-[28px] text-zinc-900 md:text-[40px]">{post.title}</h1>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-6 text-zinc-600 md:text-base">{post.excerpt}</p>
          <div className="mt-3 text-xs text-zinc-500">Editorial placeholder — no invented commercial proof is claimed on this page.</div>
        </div>
      </div>

      <div className="oai-container pt-8">
        <div className="overflow-hidden rounded-[22px] border border-zinc-200">
          <ArtCard variant={post.art} ratio="wide" />
        </div>

        <div className="mx-auto max-w-[720px] py-8 md:py-10">
          <div className="prose prose-zinc max-w-none prose-p:leading-7 prose-p:text-zinc-700 prose-headings:tracking-tight">
            <p>
              This is an article template in the language of openai.com — generous whitespace, hairline rules, and restrained typography. Copy here is placeholder written in the voice of an academic lab: plain, precise, non-hype.
            </p>
            <h2>What this page is</h2>
            <p>
              A faithful template for news stories. Swap in real copy when you have it; the layout, spacing, and art-card treatment already match the reference.
            </p>
            <blockquote>
              “Open research is as important as products; metademic.com is a real destination, not a footer link.”
            </blockquote>
            <p>
              The scholarly platform at{" "}
              <a href="https://www.metademic.com" target="_blank" rel="noreferrer">
                www.metademic.com
              </a>{" "}
              remains the canonical home for journals and publications. This article links out rather than duplicating that system.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--hairline)] pt-6">
            <Link href="/news" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">← All news</Link>
            <Link href="/open-research" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">Open Research</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
