import type { Metadata } from "next";
import { Flower2, Heart, Ruler } from "lucide-react";
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
  cardShadow,
} from "@/components/page-parts";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/chi-siamo">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "chiSiamo", "/chi-siamo");
}

// TODO: replace with the real story, names and photos; this is placeholder copy to shape the layout.
const values = [
  { key: "passione", icon: Heart },
  { key: "dettagli", icon: Flower2 },
  { key: "misura", icon: Ruler },
] as const;

export default function ChiSiamoPage({ params }: PageProps<"/[locale]/chi-siamo">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("chiSiamo");
  const tCommon = useTranslations("common");
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          intro={t("hero.intro")}
        />
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-4 translate-y-3 -rotate-6 rounded-[2rem] bg-blush"
          />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              id="team"
              sizes="(min-width: 768px) 45rem, 170vw"
              position="78% center"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <SectionHeading eyebrow={t("story.eyebrow")} title={t("story.title")} />
        <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground/80">
          <p>{t("story.paragraph1")}</p>
          <p>{t("story.paragraph2")}</p>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} />
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map(({ key, icon: Icon }) => (
            <li key={key} className="rounded-[1.75rem] bg-blush p-6 md:p-8">
              <span className="grid size-11 place-items-center rounded-full bg-background text-wine">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-wine">{t(`values.items.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{t(`values.items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow={t("lab.eyebrow")} title={t("lab.title")} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Photo
            id="labScatoleCandele"
            position="center 60%"
            sizes="(min-width: 768px) 32rem, 100vw"
            className="col-span-2 aspect-video rounded-[1.5rem] md:row-span-2 md:aspect-auto"
          />
          <Photo
            id="labConfezioneRegalo"
            sizes="(min-width: 768px) 16rem, 50vw"
            className="aspect-square rounded-[1.5rem]"
          />
          <Photo
            id="labCandelaEtichetta"
            sizes="(min-width: 768px) 16rem, 50vw"
            className="aspect-square rounded-[1.5rem]"
          />
          <Photo
            id="labTavoloFiocco"
            sizes="(min-width: 768px) 32rem, 100vw"
            className="col-span-2 aspect-video rounded-[1.5rem]"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <OutlineLink href="/come-lavoriamo">{tCommon("howWeWork")}</OutlineLink>
        </div>
      </section>

      <CtaBand
        title={t("cta.title")}
        text={t("cta.text")}
      />
    </PageShell>
  );
}
