import type { Metadata } from "next";
import { Hand, Palette, Truck } from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  CtaBand,
  OutlineLink,
  PageHero,
  PageShell,
  Photo,
  SectionHeading,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import { pageMetadata } from "@/i18n/metadata";
import type { PhotoId } from "@/lib/photos";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/artigianato">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "artigianato", "/artigianato");
}

// TODO: have the owner review this copy; it is a first draft built from the site descriptions.
const promises = [
  { key: "handmade", icon: Hand },
  { key: "custom", icon: Palette },
  { key: "shipping", icon: Truck },
] as const;

const categories = [
  {
    key: "bomboniere",
    tags: ["matrimoni", "battesimi", "comunioni", "lauree"],
    photo: "fioccoNascita",
    position: "center 40%",
  },
  { key: "candele", tags: ["candele", "gesso", "bomboniere", "regali"], photo: "barattoloGesso" },
  {
    key: "palloncini",
    tags: ["compleanni", "feste", "ricorrenze"],
    photo: "compleanno10Corona",
  },
  { key: "gadget", tags: ["regali", "eventi", "personalizzati"], photo: "alberoPlexiglass" },
] as const satisfies readonly { key: string; tags: readonly string[]; photo: PhotoId; position?: string }[];

const customOptions = ["nomi", "date", "colori", "materiali", "biglietti", "confezione"] as const;

export default function ArtigianatoPage({ params }: PageProps<"/[locale]/artigianato">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("artigianato");
  const tCommon = useTranslations("common");
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          intro={t("hero.intro")}
        >
          <WhatsAppButton />
          <OutlineLink href="/come-lavoriamo">{tCommon("howWeWork")}</OutlineLink>
        </PageHero>

        <div className="grid grid-cols-[1.2fr_1fr] grid-rows-2 gap-3 md:gap-4">
          <Photo
            cover
            id="borsetta"
            sizes="(min-width: 768px) 20rem, 60vw"
            className="row-span-2 aspect-3/5 rounded-[1.75rem] md:aspect-auto"
          />
          <Photo
            cover
            id="annaffiatoio"
            position="center 60%"
            sizes="(min-width: 768px) 14rem, 45vw"
            className="aspect-square rounded-[1.75rem]"
          />
          <Photo
            cover
            id="candeleSucculente"
            position="center 30%"
            sizes="(min-width: 768px) 14rem, 45vw"
            className="aspect-square rounded-[1.75rem]"
          />
        </div>
      </section>

      <ul className="grid gap-6 border-y border-wine/15 py-8 md:grid-cols-3 md:gap-10">
        {promises.map(({ key, icon: Icon }) => (
          <li key={key} className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-wine">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-wine">{t(`promises.${key}.title`)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/75">{t(`promises.${key}.text`)}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-12 md:gap-16">
        <SectionHeading eyebrow={t("categories.eyebrow")} title={t("categories.title")} />
        {categories.map((category, i) => (
          <article
            key={category.key}
            className="grid items-center gap-6 md:grid-cols-2 md:gap-14"
          >
            <div className={cn("rounded-[2rem] bg-card p-3", cardShadow, i % 2 === 1 && "md:order-2")}>
              <Photo
                id={category.photo}
                position={"position" in category ? category.position : undefined}
                sizes="(min-width: 768px) 32rem, 100vw"
                className="aspect-4/3 rounded-[1.5rem]"
              />
            </div>
            <div>
              <span className="text-sm font-semibold text-rose-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-wine md:text-3xl">{t(`categories.items.${category.key}.title`)}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-foreground/75">{t(`categories.items.${category.key}.text`)}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-wine/15 px-3 py-1 text-xs font-semibold text-wine"
                  >
                    {t(`tags.${tag}`)}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="flex flex-col items-center rounded-[2rem] bg-blush px-6 py-12 text-center md:px-12 md:py-16">
        <SectionHeading
          eyebrow={t("custom.eyebrow")}
          title={t("custom.title")}
          className="flex flex-col items-center"
        />
        <p className="mt-4 max-w-lg text-wine/85">
          {t("custom.text")}
        </p>
        <ul className="mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
          {customOptions.map((option) => (
            <li
              key={option}
              className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-wine shadow-sm"
            >
              {t(`custom.options.${option}`)}
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title={t("cta.title")}
        text={t("cta.text")}
      />
    </PageShell>
  );
}
