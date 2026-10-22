import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { PageHero, PageShell } from "@/components/page-parts";
import { pageMetadata } from "@/i18n/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "privacy", "/privacy");
}

// TODO: have the owner review this generic policy; update it if the site adds forms, analytics or embeds.
const sections = [
  { key: "titolare" },
  {
    key: "dati",
    items: [
      "sections.dati.items.navigazione",
      "sections.dati.items.cookie",
      "sections.dati.items.contatti",
    ],
  },
  { key: "finalita" },
  { key: "cookie" },
  { key: "hosting" },
  { key: "terzi" },
  { key: "conservazione" },
  {
    key: "diritti",
    items: [
      "sections.diritti.items.accesso",
      "sections.diritti.items.rettifica",
      "sections.diritti.items.cancellazione",
      "sections.diritti.items.limitazione",
      "sections.diritti.items.portabilita",
      "sections.diritti.items.reclamo",
    ],
  },
  { key: "modifiche" },
] as const;

export default function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("privacy");
  const values = { name: site.name, owner: site.owner, email: site.email };
  return (
    <PageShell>
      <section>
        <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} intro={t("hero.intro")} />
        <p className="mt-4 text-sm text-foreground/60">{t("updated")}</p>
      </section>

      <div className="flex max-w-2xl flex-col gap-10">
        {sections.map((section) => (
          <section key={section.key}>
            <h2 className="text-xl font-bold text-wine md:text-2xl">{t(`sections.${section.key}.title`)}</h2>
            <p className="mt-3 leading-relaxed text-foreground/75">{t(`sections.${section.key}.text`, values)}</p>
            {"items" in section && (
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-foreground/75 marker:text-rose">
                {section.items.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
