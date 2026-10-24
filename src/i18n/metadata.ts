import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Href = "/" | "/allestimenti" | "/fatto-a-mano" | "/eventi" | "/chi-siamo" | "/come-lavoriamo" | "/privacy";

// Canonical URL for this language plus hreflang links to every translation of the same page.
export function localeAlternates(locale: Locale, href: Href): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href })]),
  );
  return {
    canonical: getPathname({ locale, href }),
    languages: { ...languages, "x-default": getPathname({ locale: routing.defaultLocale, href }) },
  };
}

export async function pageMetadata(
  locale: Locale,
  namespace: "allestimenti" | "fattoAMano" | "eventi" | "chiSiamo" | "comeLavoriamo" | "privacy",
  href: Href,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `${namespace}.meta` });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, href),
  };
}
