import type { Metadata } from "next";
import { Check } from "lucide-react";
import battesimoAzzurro from "@/assets/photos/allestimenti/allestimento-battesimo-azzurro-angelo.jpg";
import battesimoMinnie from "@/assets/photos/allestimenti/allestimento-battesimo-minnie-rosa.jpg";
import battesimoPiccoloPrincipe from "@/assets/photos/allestimenti/allestimento-battesimo-piccolo-principe.jpg";
import cameraSposa from "@/assets/photos/allestimenti/allestimento-camera-sposa-palloncini.jpg";
import allestimentoSposi from "@/assets/photos/allestimenti/allestimento-sposi-arco-cuore.jpg";
import palloncini70 from "@/assets/photos/handmade/palloncini-70-anni-limoni.jpg";
import gender from "@/assets/photos/eventi/palloncini-gender-reveal-bebe.jpg";
import tortaComunione from "@/assets/photos/allestimenti/torta-prima-comunione-piccolo-principe.jpg";
import tortaPiccoloPrincipe from "@/assets/photos/allestimenti/torta-piccolo-principe-bomboniera.jpg";
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
import { pageByHref } from "@/lib/site";

const page = pageByHref("/allestimenti");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.href },
};

// TODO: have the owner review this copy; it is a first draft built from the site descriptions.
const occasions = [
  {
    title: "Matrimoni",
    text: "Tavoli, centrotavola e dettagli floreali coordinati, per un giorno che ti somigli in ogni angolo.",
    photo: {
      src: cameraSposa,
      alt: "Camera della sposa allestita con palloncini argento e bianchi, scritta Bride sul letto e abito da sposa appeso",
    },
  },
  {
    title: "Battesimi e comunioni",
    text: "Atmosfere delicate, colori tenui e piccoli dettagli fatti a mano per festeggiare in famiglia.",
    photo: {
      src: battesimoAzzurro,
      alt: "Allestimento per battesimo in azzurro con drappeggi, palloncini, nome Francesco, angelo dorato e bomboniere",
    },
  },
  {
    title: "Compleanni e feste",
    text: "Allestimenti a tema per ogni età, dal primo compleanno alle feste con gli amici.",
    photo: {
      src: palloncini70,
      alt: "Composizione di palloncini verdi con il numero 70 dorato, arco decorato con foglie e limoni e bomboniere coordinate",
      position: "center 55%",
    },
  },
];

const gallery = [
  {
    src: battesimoPiccoloPrincipe,
    alt: "Allestimento a tema Piccolo Principe con torta, colonne, palloncini, numero 1 dorato e sagome dei personaggi",
  },
  {
    src: battesimoMinnie,
    alt: "Allestimento rosa a tema Minnie con palloncini, torta, colonne bianche e sagome dei personaggi",
  },
  {
    src: tortaPiccoloPrincipe,
    alt: "Torta a piani a tema Piccolo Principe con stelle dorate, bottiglia personalizzata e bomboniera con orsetto",
  },
  {
    src: tortaComunione,
    alt: "Torta per la prima comunione a tema Piccolo Principe con volpe, aeroplano e citazione sulla rosa",
  },
  {
    src: gender,
    alt: "Composizione di palloncini per gender reveal con due bebè, colonna rosa e azzurra e palloncino nero con punti interrogativi",
  },
];

const includes = [
  "Centrotavola e decorazioni floreali",
  "Tableau e segnaposto",
  "Confettata e sweet table",
  "Backdrop e angoli foto",
  "Bomboniere coordinate",
  "Allestimento e smontaggio in location",
];

const steps = [
  { title: "Ci racconti l'evento", text: "Data, location, numero di ospiti e lo stile che hai in mente." },
  { title: "Progettiamo insieme", text: "Ti proponiamo colori, materiali e dettagli, e li definiamo con te." },
  { title: "Allestiamo per te", text: "Il giorno dell'evento pensiamo a tutto noi: tu devi solo goderti la festa." },
];

export default function AllestimentiPage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <PageHero
          eyebrow="Allestimenti a Catania"
          title="Allestimenti pensati su misura per il tuo evento"
          intro="Matrimoni, battesimi, comunioni, compleanni e feste: progettiamo e realizziamo ogni allestimento partendo da te, dai tuoi colori e dalla storia che vuoi raccontare."
        >
          <WhatsAppButton />
          <OutlineLink href="/come-lavoriamo">Come lavoriamo</OutlineLink>
        </PageHero>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-3 rotate-6 rounded-[2rem] bg-blush shadow-[0_18px_40px_-20px_rgb(60_10_25/0.35)]"
          />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              src={allestimentoSposi}
              sizes="(min-width: 768px) 24rem, 90vw"
              alt="Allestimento con arco a cuore dorato e sagoma degli sposi, fiori, confettata, palloncini e lanterne bianche"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow="Per quali occasioni" title="Cosa possiamo fare per te" />
        <ul className="grid gap-6 md:grid-cols-3">
          {occasions.map((occasion) => (
            <li key={occasion.title} className={`flex flex-col rounded-[1.75rem] bg-card p-3 ${cardShadow}`}>
              <Photo
                src={occasion.photo.src}
                alt={occasion.photo.alt}
                position={occasion.photo.position}
                sizes="(min-width: 768px) 20rem, 100vw"
                className="aspect-4/3 rounded-[1.25rem]"
              />
              <div className="px-2 pt-4 pb-2">
                <h3 className="text-xl leading-tight font-bold text-wine">{occasion.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{occasion.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 rounded-[2rem] bg-blush p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
        <SectionHeading eyebrow="Cosa curiamo" title="Ogni dettaglio, dall'inizio alla fine" />
        <ul className="grid content-start gap-x-8 gap-y-4 sm:grid-cols-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-wine">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wine text-background">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow="Lavori realizzati" title="Alcuni nostri allestimenti" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((photo, i) => (
            <Photo
              key={photo.alt}
              src={photo.src}
              alt={photo.alt}
              sizes={i === 0 ? "(min-width: 768px) 48rem, 100vw" : "(min-width: 768px) 30rem, 80vw"}
              className={`rounded-[1.5rem] ${i === 0 ? "row-span-2 aspect-auto" : "aspect-square"}`}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading eyebrow="Come funziona" title="Tre passi, senza pensieri" />
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col border-t border-wine/20 pt-5">
              <span className="text-sm font-semibold text-rose-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-bold text-wine">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand
        title="Raccontaci il tuo evento"
        text="Scrivici su WhatsApp: raccontaci la tua idea e ti rispondiamo per ogni informazione."
      />
    </PageShell>
  );
}
