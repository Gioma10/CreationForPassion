import type { MetadataRoute } from "next";
import { pages, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...pages.map((link) => link.href)].map((href) => ({ url: `${site.url}${href}` }));
}
