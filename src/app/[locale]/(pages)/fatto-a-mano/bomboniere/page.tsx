import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { HandmadeSubpage } from "@/components/handmade-subpage";
import { pageMetadata } from "@/i18n/metadata";
import type { PhotoId } from "@/lib/photos";

export async function generateMetadata({ params }: PageProps<"/[locale]/fatto-a-mano/bomboniere">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "bomboniere", "/fatto-a-mano/bomboniere");
}

// TODO: have the owner review this copy and add photos dedicated to this page.
const rows = [
  { key: "classiche", photo: "bomboniereSposi" },
  { key: "gesso", photo: "barattoloGesso" },
  { key: "express", photo: "team", id: "express" },
] as const satisfies readonly { key: string; photo: PhotoId; id?: string }[];

export default function BombonierePage({ params }: PageProps<"/[locale]/fatto-a-mano/bomboniere">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("bomboniere");
  return (
    <HandmadeSubpage
      hero={{ eyebrow: t("hero.eyebrow"), title: t("hero.title"), intro: t("hero.intro") }}
      heroPhoto="labConfezioneRegalo"
      heading={{ eyebrow: t("heading.eyebrow"), title: t("heading.title") }}
      rows={rows.map((row) => ({
        ...row,
        title: t(`rows.${row.key}.title`),
        text: t(`rows.${row.key}.text`),
      }))}
      cta={{ title: t("cta.title"), text: t("cta.text") }}
    />
  );
}
