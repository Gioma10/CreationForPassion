"use client";

import { Globe } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Endonyms: each language is named in itself, so it reads the same in every locale.
const languages = [
  { locale: "it", name: "Italiano" },
  { locale: "en", name: "English" },
] as const satisfies readonly { locale: Locale; name: string }[];

// Real links to the same page in each language, so the switch works without JavaScript and crawlers follow it.
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className={cn("flex items-center gap-2 text-sm", className)}>
      <Globe aria-hidden className="size-4 text-wine/60" />
      {languages.map(({ locale, name }, i) => (
        <span key={locale} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="size-1 rounded-full bg-wine/30" />}
          <Link
            href={pathname}
            locale={locale}
            scroll={false}
            lang={locale}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "rounded-sm underline-offset-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-rose",
              locale === current
                ? "font-semibold text-wine underline decoration-rose decoration-2"
                : "text-foreground/60 hover:text-wine",
            )}
          >
            {name}
          </Link>
        </span>
      ))}
    </nav>
  );
}
