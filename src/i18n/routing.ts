import { defineRouting } from "next-intl/routing";

// Italian keeps today's URLs (/allestimenti); English lives under /en (/en/allestimenti).
export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "as-needed",
});
