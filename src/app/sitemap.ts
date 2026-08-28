import type { MetadataRoute } from "next";

const BASE = "https://metademic.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/open-research", "/products/racn", "/chat", "/download", "/news", "/research", "/about"];
  return routes.map((p) => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));
}
