import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  CtaBand,
  PageHero,
  PageShell,
  Photo,
  SectionHeading,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/come-lavoriamo">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "comeLavoriamo", "/come-lavoriamo");
}

// TODO: have the owner confirm timings and answers before going live.
const steps = ["scrivi", "conosciamo", "idee", "realizziamo"] as const;

const faqs = ["anticipo", "zona", "personalizzare", "informazioni"] as const;

export default function ComeLavoriamoPage({ params }: PageProps<"/[locale]/come-lavoriamo">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("comeLavoriamo");
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          intro={t("hero.intro")}
        >
          <WhatsAppButton />
        </PageHero>

        <div className="relative mx-auto grid w-full max-w-md grid-cols-[1.15fr_1fr] items-center gap-4">
          <div className={`rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              id="sposiArcoCuore"
              sizes="(min-width: 768px) 15rem, 50vw"
              className="aspect-3/4 rounded-[1.5rem]"
            />
          </div>
          <div className={`translate-y-8 rotate-3 rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              id="barattoloGesso"
              sizes="(min-width: 768px) 13rem, 45vw"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading eyebrow={t("steps.eyebrow")} title={t("steps.title")} />
        <ol className="relative grid gap-10 md:grid-cols-2 md:gap-6">
          <span aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-wine/15 md:hidden" />
          {steps.map((step, i) => (
            <li
              key={step}
              className="relative grid grid-cols-[3rem_1fr] gap-5 md:grid-cols-[4rem_1fr] md:gap-6 md:rounded-[1.75rem] md:bg-blush md:p-8"
            >
              <span className="grid size-12 place-items-center rounded-full bg-wine text-lg font-bold text-background md:size-16 md:text-2xl">
                {i + 1}
              </span>
              <div className="pt-2 md:pt-3">
                <h3 className="text-xl font-bold text-wine md:text-2xl">{t(`steps.items.${step}.title`)}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-foreground/75">{t(`steps.items.${step}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details key={faq} className="group rounded-[1.5rem] bg-blush px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-wine [&::-webkit-details-marker]:hidden">
                {t(`faq.items.${faq}.question`)}
                <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-foreground/75">{t(`faq.items.${faq}.answer`)}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand
        title={t("cta.title")}
        text={t("cta.text")}
      />
    </PageShell>
  );
}
