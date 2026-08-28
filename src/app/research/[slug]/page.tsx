import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, research, featured } from "@/lib/content";
import { ArtCard } from "@/components/ArtCard";

export function generateStaticParams() {
  return [...research, featured].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? post.title : "Research" };
}

export default async function ResearchArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || (post.category !== "Research" && !post.featured && post.slug !== featured.slug)) {
    if (!post || post.category !== "Research") {
      // allow featured which is Research category
      if (!post || post.slug !== featured.slug) return notFound();
    }
  }

  return (
    <article className="bg-white">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 font-medium tracking-wide text-white">{post.category}</span>
            <span className="text-zinc-500">{post.date} · {post.readTime}</span>
            <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 font-medium text-zinc-700">Peer-reviewed where applicable</span>
          </div>
          <h1 className="display mt-4 max-w-[18ch] text-[28px] text-zinc-900 md:text-[40px]">{post.title}</h1>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-6 text-zinc-600 md:text-base">{post.excerpt}</p>
          <div className="mt-3 text-xs text-zinc-500">Template article — no fake benchmarks or citations are claimed here.</div>
        </div>
      </div>

      <div className="oai-container pt-8">
        <div className="overflow-hidden rounded-[22px] border border-zinc-200">
          <ArtCard variant={post.art} ratio="wide" />
        </div>

        <div className="mx-auto max-w-[720px] py-8 md:py-10">
          <div className="prose prose-zinc max-w-none prose-p:leading-7 prose-p:text-zinc-700 prose-headings:tracking-tight">
            <p>
              Research pages use the same template as openai.com — title, deck, hero art card, then long-form prose with hairline dividers. This copy is editorial placeholder in a serious-lab voice.
            </p>
            <h2>Method</h2>
            <p>Describe the question, the corpus, and the evaluation. Link to metademic.com where the scholarly record is the source of truth.</p>
            <h2>Results</h2>
            <p>Report what was found without inventing numbers. If a claim is not yet verified, say so plainly.</p>
            <h2>Limitations</h2>
            <p>Every paper has them. Name them early.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--hairline)] pt-6">
            <Link href="/research" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">← Research index</Link>
            <Link href="/open-research" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">Open Research</Link>
            <Link href="/products/racn" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Explore RACN</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
