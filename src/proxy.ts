import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Every page, but not Next internals, API routes or files with an extension (images, favicon, sitemap.xml).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
