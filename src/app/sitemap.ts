import type { MetadataRoute } from "next";
import { pages, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ href: "" }, ...pages].map((page) => ({
    url: `${site.url}${page.href}`,
  }));
}
