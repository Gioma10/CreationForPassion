import type { Metadata } from "next";
import { MailOpen, QrCode, type LucideIcon } from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  CtaBand,
  OutlineLink,
  PageHero,
  PageShell,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import { pageMetadata } from "@/i18n/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/prodotti-digitali">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "prodottiDigitali", "/prodotti-digitali");
}

// TODO: add real examples (screenshots of an invite and a QR menu) once the owner has them.
const products = [
  { key: "inviti", icon: MailOpen, tags: ["matrimoni", "compleanni", "battesimi"] },
  { key: "qrCode", icon: QrCode, tags: ["ristoranti", "bar", "eventi"] },
] as const satisfies readonly { key: string; icon: LucideIcon; tags: readonly string[] }[];

export default function ProdottiDigitaliPage({ params }: PageProps<"/[locale]/prodotti-digitali">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("prodottiDigitali");
  const tCommon = useTranslations("common");
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          intro={t("hero.intro")}
        >
          <WhatsAppButton />
          <OutlineLink href="/come-lavoriamo">{tCommon("howWeWork")}</OutlineLink>
        </PageHero>

        <div aria-hidden className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4 max-md:hidden">
          {products.map((product, i) => (
            <div
              key={product.key}
              className={cn(
                "grid aspect-3/4 place-items-center rounded-[2rem] bg-card p-3",
                cardShadow,
                i === 0 ? "-rotate-6" : "mt-12 rotate-6",
              )}
            >
              <span className="grid size-20 place-items-center rounded-full bg-blush text-wine">
                <product.icon className="size-9" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <ul className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <li key={product.key} className={`flex flex-col rounded-[1.75rem] bg-card p-6 md:p-8 ${cardShadow}`}>
            <span className="grid size-12 place-items-center rounded-full bg-blush text-wine">
              <product.icon className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl leading-tight font-bold text-wine">{t(`items.${product.key}.title`)}</h2>
            <p className="mt-3 leading-relaxed text-foreground/75">{t(`items.${product.key}.text`)}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-wine/15 px-3 py-1 text-xs font-semibold text-wine"
                >
                  {t(`tags.${tag}`)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <CtaBand
        title={t("cta.title")}
        text={t("cta.text")}
      />
    </PageShell>
  );
}
