import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { HandmadeSubpage } from "@/components/handmade-subpage";
import { pageMetadata } from "@/i18n/metadata";
import type { PhotoId } from "@/lib/photos";

export async function generateMetadata({ params }: PageProps<"/[locale]/fatto-a-mano/candele-e-gesso">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "candeleGesso", "/fatto-a-mano/candele-e-gesso");
}

// TODO: have the owner review this copy and add photos dedicated to this page.
const rows = [
  { key: "candele", photo: "labCandelaEtichetta" },
  { key: "gesso", photo: "annaffiatoio" },
  { key: "fiori", photo: "borsetta" },
] as const satisfies readonly { key: string; photo: PhotoId; id?: string }[];

export default function CandeleGessoPage({ params }: PageProps<"/[locale]/fatto-a-mano/candele-e-gesso">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("candeleGesso");
  return (
    <HandmadeSubpage
      hero={{ eyebrow: t("hero.eyebrow"), title: t("hero.title"), intro: t("hero.intro") }}
      heroPhoto="candeleSucculente"
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
