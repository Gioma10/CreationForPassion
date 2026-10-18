import type { Metadata } from "next";
import { Flower2, Heart, Ruler } from "lucide-react";
import teamPhoto from "@/assets/photos/team-bomboniere-evento.jpg";
import {
  CtaBand,
  OutlineLink,
  PageHero,
  PageShell,
  Photo,
  PhotoPlaceholder,
  SectionHeading,
  cardShadow,
} from "@/components/page-parts";
import { pageByHref } from "@/lib/site";

const page = pageByHref("/chi-siamo");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.href },
};

// TODO: replace with the real story, names and photos; this is placeholder copy to shape the layout.
const values = [
  {
    icon: Heart,
    title: "Passione",
    text: "È nel nostro nome: ogni progetto nasce dalla voglia di creare qualcosa di bello.",
  },
  {
    icon: Flower2,
    title: "Cura dei dettagli",
    text: "Dal centrotavola al nastro della bomboniera, niente è lasciato al caso.",
  },
  {
    icon: Ruler,
    title: "Su misura",
    text: "Non esistono due eventi uguali: partiamo sempre da te e dalla tua storia.",
  },
];

export default function ChiSiamoPage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <PageHero
          eyebrow="Chi siamo"
          title="Creare è la nostra passione"
          intro="Siamo Creation for Passion, un piccolo laboratorio creativo di Catania. Progettiamo allestimenti per eventi e realizziamo a mano creazioni che raccontano una storia: la tua."
        />
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-4 translate-y-3 -rotate-6 rounded-[2rem] bg-blush"
          />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              src={teamPhoto}
              sizes="(min-width: 768px) 45rem, 170vw"
              alt="Il team di Creation for Passion sistema le bomboniere fatte a mano su un tavolo durante un evento"
              position="78% center"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <SectionHeading eyebrow="La nostra storia" title="Tutto è nato dal fatto a mano" />
        <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground/80">
          <p>
            Abbiamo iniziato creando bomboniere e piccoli oggetti per amici e famiglia. Pezzo dopo
            pezzo, la passione è diventata un lavoro: oggi seguiamo eventi interi, dall&apos;idea
            all&apos;allestimento.
          </p>
          <p>
            Lavoriamo a Catania e dintorni per gli allestimenti, e spediamo le nostre creazioni in
            tutta Italia e all&apos;estero.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow="In cosa crediamo" title="Quello che ci guida" />
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-[1.75rem] bg-blush p-6 md:p-8">
              <span className="grid size-11 place-items-center rounded-full bg-background text-wine">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-wine">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow="Dietro le quinte" title="Il nostro laboratorio" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PhotoPlaceholder className="col-span-2 aspect-video rounded-[1.5rem] md:row-span-2 md:aspect-auto" />
          <PhotoPlaceholder className="aspect-square rounded-[1.5rem]" />
          <PhotoPlaceholder className="aspect-square rounded-[1.5rem]" />
          <PhotoPlaceholder className="col-span-2 aspect-video rounded-[1.5rem]" />
        </div>
        <div className="flex flex-wrap gap-3">
          <OutlineLink href="/come-lavoriamo">Come lavoriamo</OutlineLink>
        </div>
      </section>

      <CtaBand
        title="Conosciamoci"
        text="Scrivici su WhatsApp per raccontarci la tua idea: ci fa sempre piacere."
      />
    </PageShell>
  );
}
