import type { Metadata } from "next";
import { Baby, Gift, Sparkles, type LucideIcon } from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  CtaBand,
  OutlineLink,
  PageHero,
  PageShell,
  Photo,
  PhotoPlaceholder,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import { pageMetadata } from "@/i18n/metadata";
import type { PhotoId } from "@/lib/photos";

export async function generateMetadata({ params }: PageProps<"/[locale]/eventi">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "eventi", "/eventi");
}

// TODO: have the owner confirm the copy for each event and add a real photo for bomboniera express (it borrows the chi siamo team photo for now).
const events = [
  { key: "genderReveal", icon: Sparkles, photo: "genderRevealBimbi" },
  { key: "babyShower", icon: Baby, photo: "babyShowerOrsetto" },
  { key: "bomboniereExpress", icon: Gift, photo: "team" },
] as const satisfies readonly { key: string; icon: LucideIcon; photo?: PhotoId }[];

export default function EventiPage({ params }: PageProps<"/[locale]/eventi">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("eventi");
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

        <div className="relative mx-auto w-full max-w-sm max-md:hidden">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-3 rotate-6 rounded-[2rem] bg-blush"
          />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              id="arcoAzzurroPampas"
              sizes="(min-width: 768px) 24rem, 90vw"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <ul className="grid gap-6 md:grid-cols-3">
        {events.map((event) => (
          <li key={event.key} className={`flex flex-col rounded-[1.75rem] bg-card p-3 ${cardShadow}`}>
            {"photo" in event ? (
              <Photo
                id={event.photo}
                sizes="(min-width: 768px) 20rem, 100vw"
                className="aspect-4/3 rounded-[1.25rem]"
              />
            ) : (
              <PhotoPlaceholder className="aspect-4/3 rounded-[1.25rem]" />
            )}
            <div className="px-2 pt-4 pb-2">
              <span className="grid size-10 place-items-center rounded-full bg-blush text-wine">
                <event.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-xl leading-tight font-bold text-wine">{t(`items.${event.key}.title`)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{t(`items.${event.key}.text`)}</p>
            </div>
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
