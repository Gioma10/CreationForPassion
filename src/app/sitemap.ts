import type { MetadataRoute } from "next";
import { pages, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs = new Set(["", ...pages.map((p) => p.href), ...services.map((s) => s.href)]);
  return [...hrefs].map((href) => ({ url: `${site.url}${href}` }));
}
