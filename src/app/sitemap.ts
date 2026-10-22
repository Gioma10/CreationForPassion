import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...navLinks.map((link) => link.href)].map((href) => ({ url: `${site.url}${href}` }));
}
