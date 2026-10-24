import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { HandmadeSubpage } from "@/components/handmade-subpage";
import { pageMetadata } from "@/i18n/metadata";
import type { PhotoId } from "@/lib/photos";

export async function generateMetadata({ params }: PageProps<"/[locale]/fatto-a-mano/gadget-personalizzati">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "gadgetPersonalizzati", "/fatto-a-mano/gadget-personalizzati");
}

// TODO: have the owner review this copy and add photos dedicated to this page.
const rows = [
  { key: "plexiglass", photo: "alberoPlexiglass" },
  { key: "legno", photo: "labCandelaEtichetta" },
  { key: "confezioni", photo: "labScatoleCandele" },
] as const satisfies readonly { key: string; photo: PhotoId; id?: string }[];

export default function GadgetPersonalizzatiPage({ params }: PageProps<"/[locale]/fatto-a-mano/gadget-personalizzati">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("gadgetPersonalizzati");
  return (
    <HandmadeSubpage
      hero={{ eyebrow: t("hero.eyebrow"), title: t("hero.title"), intro: t("hero.intro") }}
      heroPhoto="labTavoloFiocco"
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
