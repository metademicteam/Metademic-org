export type Category = "Research" | "Product" | "Company" | "Security" | "Engineering";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  featured?: boolean;
  art: 1 | 2 | 3 | 4 | 5 | 6;
  href?: string;
  external?: boolean;
  body?: string;
};

export const featured: Post = {
  slug: "distributed-reasoning-for-science",
  title: "Distributed reasoning for science: why RACN is built for the scholarly record",
  excerpt:
    "How a distributed LLM changes what a research lab can verify, cite, and reproduce — and why it belongs next to the journal, not in place of it.",
  category: "Research",
  date: "Aug 26, 2026",
  readTime: "12 min read",
  featured: true,
  art: 6,
};

export const news: Post[] = [
  {
    slug: "metademic-joins-open-research-coalition",
    title: "Metademic joins the Open Research Coalition",
    excerpt: "Committing our journals and tooling to open, verifiable scholarship.",
    category: "Company",
    date: "Aug 22, 2026",
    readTime: "4 min read",
    art: 2,
  },
  {
    slug: "racn-early-preview",
    title: "RACN: early preview for research partners",
    excerpt: "A distributed LLM system designed for scientific work — now in limited preview.",
    category: "Product",
    date: "Aug 18, 2026",
    readTime: "6 min read",
    art: 3,
  },
  {
    slug: "scholarly-platform-update",
    title: "metademic.com: faster discovery across journals and profiles",
    excerpt: "Updates to search, article pages, and researcher profiles on the live platform.",
    category: "Product",
    date: "Aug 12, 2026",
    readTime: "3 min read",
    art: 1,
  },
  {
    slug: "open-research-report-2026",
    title: "Open Research report 2026",
    excerpt: "What we published, reviewed, and opened this year — and what remains to do.",
    category: "Research",
    date: "Aug 05, 2026",
    readTime: "8 min read",
    art: 4,
  },
  {
    slug: "retraction-and-correction-principles",
    title: "Retraction and correction principles",
    excerpt: "How we handle errors in the scholarly record, with examples from metademic.com.",
    category: "Research",
    date: "Jul 29, 2026",
    readTime: "7 min read",
    art: 6,
  },
  {
    slug: "interview-building-for-science",
    title: "Building for science, not for feeds",
    excerpt: "On infrastructure that rewards citation over virality.",
    category: "Company",
    date: "Jul 22, 2026",
    readTime: "5 min read",
    art: 5,
  },
];

export const research: Post[] = [
  {
    slug: "mapping-citation-graphs-at-scale",
    title: "Mapping citation graphs at scale without losing provenance",
    excerpt: "A method for large-scale citation resolution that preserves source fidelity.",
    category: "Research",
    date: "Aug 14, 2026",
    readTime: "14 min read",
    art: 6,
  },
  {
    slug: "evaluating-llms-on-peer-review",
    title: "Evaluating LLMs on peer review: a benchmark and its limits",
    excerpt: "We test model assistance in review and show where human judgment still dominates.",
    category: "Research",
    date: "Aug 01, 2026",
    readTime: "11 min read",
    art: 1,
  },
  {
    slug: "field-notes-distributed-inference",
    title: "Field notes: distributed inference for long-context scientific documents",
    excerpt: "Early lessons from RACN’s inference layer on 100k+ token papers.",
    category: "Engineering",
    date: "Jul 28, 2026",
    readTime: "9 min read",
    art: 3,
  },
  {
    slug: "open-access-does-not-mean-open-washing",
    title: "Open access does not mean open-washing",
    excerpt: "Definitions, checks, and tooling we use to keep “open” honest.",
    category: "Research",
    date: "Jul 16, 2026",
    readTime: "6 min read",
    art: 2,
  },
];

export const allPosts: Post[] = [featured, ...news, ...research];

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}
