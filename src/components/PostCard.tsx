import Link from "next/link";
import type { Post } from "@/lib/content";
import { ArtCard } from "./ArtCard";

export function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/research/${post.slug}`} className="group block">
      <ArtCard variant={post.art} ratio="wide" shimmer />
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-zinc-900 px-2.5 py-1 font-medium tracking-wide text-white">{post.category}</span>
        <span className="text-zinc-500">{post.date} · {post.readTime}</span>
      </div>
      <h3 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-900 group-hover:text-zinc-700 md:text-[26px]">{post.title}</h3>
      <p className="mt-2 max-w-[65ch] text-[15px] leading-6 text-zinc-600">{post.excerpt}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-900">
        Read more
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform group-hover:translate-x-0.5"><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </Link>
  );
}

export function GridCard({ post }: { post: Post }) {
  const href = post.slug.startsWith("racn") || post.category === "Product" ? `/products/racn` : post.category === "Research" ? `/research/${post.slug}` : `/news/${post.slug}`;
  return (
    <Link href={href} className="group flex flex-col">
      <ArtCard variant={post.art} ratio="square" />
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 font-medium text-zinc-700">{post.category}</span>
        <span className="text-zinc-500">{post.date}</span>
      </div>
      <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-5 tracking-[-0.01em] text-zinc-900 group-hover:text-zinc-700">{post.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-600">{post.excerpt}</p>
      <span className="mt-2 text-xs font-medium text-zinc-500">{post.readTime}</span>
    </Link>
  );
}

export function RowCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug}`} className="group grid grid-cols-[96px_1fr] gap-4 md:grid-cols-[160px_1fr]">
      <div className="overflow-hidden rounded-xl">
        <ArtCard variant={post.art} ratio="square" />
      </div>
      <div className="min-w-0 py-1">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 font-medium text-zinc-700">{post.category}</span>
          <span className="text-zinc-500">{post.date} · {post.readTime}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-5 tracking-[-0.01em] text-zinc-900 group-hover:text-zinc-700 md:text-base">{post.title}</h3>
        <p className="mt-1 hidden text-sm leading-5 text-zinc-600 md:line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
