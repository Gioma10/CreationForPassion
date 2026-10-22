import type { Metadata } from "next";
import { Check } from "lucide-react";
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

export async function generateMetadata({ params }: PageProps<"/[locale]/allestimenti">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "allestimenti", "/allestimenti");
}

// TODO: have the owner review this copy; it is a first draft built from the site descriptions.
const occasions = [
  { key: "matrimoni", photo: "cameraSposa" },
  { key: "battesimi", photo: "battesimoAzzurro" },
  { key: "compleanni", photo: "compleanno10Corona" },
] as const satisfies readonly { key: string; photo: PhotoId }[];

const gallery = [
  "battesimoPiccoloPrincipe",
  "battesimoMinnie",
  "compleannoAristogatti",
  "battesimoAviatore",
  "compleannoMarino",
] as const satisfies readonly PhotoId[];

const includes = [
  "centrotavola",
  "tableau",
  "confettata",
  "backdrop",
  "bomboniere",
  "allestimento",
] as const;

const steps = ["racconti", "progettiamo", "allestiamo"] as const;

export default function AllestimentiPage({ params }: PageProps<"/[locale]/allestimenti">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("allestimenti");
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

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-3 rotate-6 rounded-[2rem] bg-blush shadow-[0_18px_40px_-20px_rgb(60_10_25/0.35)]"
          />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              id="sposiArcoCuore"
              sizes="(min-width: 768px) 24rem, 90vw"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow={t("occasions.eyebrow")} title={t("occasions.title")} />
        <ul className="grid gap-6 md:grid-cols-3">
          {occasions.map((occasion) => (
            <li key={occasion.key} className={`flex flex-col rounded-[1.75rem] bg-card p-3 ${cardShadow}`}>
              <Photo
                id={occasion.photo}
                sizes="(min-width: 768px) 20rem, 100vw"
                className="aspect-4/3 rounded-[1.25rem]"
              />
              <div className="px-2 pt-4 pb-2">
                <h3 className="text-xl leading-tight font-bold text-wine">{t(`occasions.items.${occasion.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{t(`occasions.items.${occasion.key}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 rounded-[2rem] bg-blush p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
        <SectionHeading eyebrow={t("includes.eyebrow")} title={t("includes.title")} />
        <ul className="grid content-start gap-x-8 gap-y-4 sm:grid-cols-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-wine">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wine text-background">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {t(`includes.items.${item}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((photo, i) => (
            <Photo
              key={photo}
              id={photo}
              sizes={i === 0 ? "(min-width: 768px) 48rem, 100vw" : "(min-width: 768px) 30rem, 80vw"}
              className={`rounded-[1.5rem] ${i === 0 ? "row-span-2 aspect-auto" : "aspect-square"}`}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow={t("steps.eyebrow")} title={t("steps.title")} />
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step} className="flex flex-col border-t border-wine/20 pt-5">
              <span className="text-sm font-semibold text-rose-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-bold text-wine">{t(`steps.items.${step}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{t(`steps.items.${step}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand
        title={t("cta.title")}
        text={t("cta.text")}
      />
    </PageShell>
  );
}
