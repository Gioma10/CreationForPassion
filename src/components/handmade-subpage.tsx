import { useTranslations } from "next-intl";
import {
  CtaBand,
  FeatureRow,
  OutlineLink,
  PageHero,
  PageShell,
  Photo,
  SectionHeading,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import type { PhotoId } from "@/lib/photos";

type Copy = { eyebrow: string; title: string };

// Shared layout for the pages under /fatto-a-mano: hero with one photo, a run of alternating rows, then the CTA.
export function HandmadeSubpage({
  hero,
  heroPhoto,
  heading,
  rows,
  cta,
}: {
  hero: Copy & { intro: string };
  heroPhoto: PhotoId;
  heading: Copy;
  rows: { key: string; id?: string; photo: PhotoId; title: string; text: string }[];
  cta: { title: string; text: string };
}) {
  const tCommon = useTranslations("common");
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
          <WhatsAppButton />
          <OutlineLink href="/fatto-a-mano">{tCommon("allHandmade")}</OutlineLink>
        </PageHero>

        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-3 rotate-6 rounded-[2rem] bg-blush" />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              id={heroPhoto}
              sizes="(min-width: 768px) 24rem, 90vw"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-12 md:gap-16">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} />
        {rows.map((row, i) => (
          <FeatureRow
            key={row.key}
            id={row.id}
            photo={row.photo}
            number={i + 1}
            title={row.title}
            text={row.text}
            reverse={i % 2 === 1}
          />
        ))}
      </section>

      <CtaBand title={cta.title} text={cta.text} />
    </PageShell>
  );
}
