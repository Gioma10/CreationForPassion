import type { Metadata } from "next";
import { Hand, Palette, Truck } from "lucide-react";
import {
  CtaBand,
  OutlineLink,
  PageHero,
  PageShell,
  PhotoPlaceholder,
  SectionHeading,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import { pageByHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const page = pageByHref("/handmade");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.href },
};

// TODO: have the owner review this copy; it is a first draft built from the site descriptions.
const promises = [
  { icon: Hand, title: "Fatto a mano", text: "Ogni pezzo nasce nel nostro laboratorio, uno alla volta." },
  { icon: Palette, title: "Su misura", text: "Nomi, date, colori e materiali scelti insieme a te." },
  { icon: Truck, title: "Spedito ovunque", text: "Spediamo in tutta Italia e all'estero." },
];

const categories = [
  {
    title: "Bomboniere",
    text: "Piccoli ricordi da regalare ai tuoi ospiti, coordinati con i colori e lo stile della festa.",
    tags: ["Matrimoni", "Battesimi", "Comunioni", "Lauree"],
  },
  {
    title: "Decorazioni floreali",
    text: "Composizioni e dettagli floreali per la casa, per una ricorrenza o per un regalo speciale.",
    tags: ["Casa", "Ricorrenze", "Regali"],
  },
  {
    title: "Oggetti per la casa",
    text: "Pezzi unici per dare alla tua casa un tocco che ti somiglia.",
    tags: ["Decorazioni", "Pezzi unici"],
  },
  {
    title: "Gadget personalizzati",
    text: "Gadget con nomi, date o iniziali, da tenere per te o da regalare.",
    tags: ["Regali", "Eventi", "Personalizzati"],
  },
];

const customOptions = [
  "Nomi e iniziali",
  "Date speciali",
  "Colori a scelta",
  "Materiali",
  "Biglietti e tag",
  "Confezione regalo",
];

export default function HandmadePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
        <PageHero
          eyebrow="Fatto a mano"
          title="Creazioni artigianali che raccontano una storia"
          intro="Bomboniere, decorazioni floreali, oggetti per la casa e gadget personalizzati: ogni pezzo nasce a mano, con cura, e può essere fatto su misura per te."
        >
          <WhatsAppButton />
          <OutlineLink href="/come-lavoriamo">Come lavoriamo</OutlineLink>
        </PageHero>

        <div className="grid grid-cols-[1.2fr_1fr] grid-rows-2 gap-3 md:gap-4">
          <PhotoPlaceholder className="row-span-2 aspect-3/5 rounded-[1.75rem] md:aspect-auto" />
          <PhotoPlaceholder className="aspect-square rounded-[1.75rem]" />
          <PhotoPlaceholder className="aspect-square rounded-[1.75rem] bg-rose/40" />
        </div>
      </section>

      <ul className="grid gap-6 border-y border-wine/15 py-8 md:grid-cols-3 md:gap-10">
        {promises.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-wine">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-wine">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/75">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-12 md:gap-16">
        <SectionHeading eyebrow="Le nostre creazioni" title="Cosa realizziamo a mano" />
        {categories.map((category, i) => (
          <article
            key={category.title}
            className="grid items-center gap-6 md:grid-cols-2 md:gap-14"
          >
            <div className={cn("rounded-[2rem] bg-card p-3", cardShadow, i % 2 === 1 && "md:order-2")}>
              <PhotoPlaceholder className="aspect-4/3 rounded-[1.5rem]" />
            </div>
            <div>
              <span className="text-sm font-semibold text-rose-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-wine md:text-3xl">{category.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-foreground/75">{category.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-wine/15 px-3 py-1 text-xs font-semibold text-wine"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="flex flex-col items-center rounded-[2rem] bg-blush px-6 py-12 text-center md:px-12 md:py-16">
        <SectionHeading
          eyebrow="Su misura per te"
          title="Lo vuoi personalizzato?"
          className="flex flex-col items-center"
        />
        <p className="mt-4 max-w-lg text-wine/85">
          Ogni creazione può essere adattata a te: raccontaci l&apos;occasione e scegliamo insieme i
          dettagli.
        </p>
        <ul className="mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
          {customOptions.map((option) => (
            <li
              key={option}
              className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-wine shadow-sm"
            >
              {option}
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Hai in mente una creazione?"
        text="Scrivici su WhatsApp: ti aiutiamo a trasformare la tua idea in un oggetto unico."
      />
    </PageShell>
  );
}
