import type { Metadata } from "next";
import { Baby, Gift, Sparkles } from "lucide-react";
import fioccoNascita from "@/assets/photos/handmade/fiocco-nascita-azzurro-nome.jpg";
import gender from "@/assets/photos/eventi/palloncini-gender-reveal-bebe.jpg";
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
import { services } from "@/lib/site";

const service = services.find((s) => s.href === "/eventi")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: { canonical: service.href },
};

// TODO: have the owner confirm the copy for each event and add a real photo for baby shower and bomboniera express.
const events = [
  {
    icon: Sparkles,
    title: "Gender reveal",
    text: "Fiocco rosa o azzurro? Prepariamo l'allestimento, i palloncini e la sorpresa per svelarlo a tutti nel momento più emozionante.",
    photo: {
      src: gender,
      alt: "Composizione di palloncini per gender reveal con due bebè, colonna rosa e azzurra e palloncino nero con punti interrogativi",
    },
  },
  {
    icon: Baby,
    title: "Baby shower",
    text: "Una festa dolce per aspettare il nuovo arrivo: decorazioni, tavolo dei dolci e piccoli pensieri per gli invitati, nei colori che preferisci.",
  },
  {
    icon: Gift,
    title: "Bomboniera express",
    text: "Ti servono le bomboniere in poco tempo? Scrivici la data: realizziamo a mano bomboniere curate anche quando i tempi sono stretti.",
  },
];

export default function EventiPage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <PageHero
          eyebrow="Eventi"
          title="Le feste più belle, pensate per te"
          intro="Dalla sorpresa del gender reveal alla dolcezza di un baby shower, fino alle bomboniere da preparare in fretta: ci occupiamo noi di ogni dettaglio."
        >
          <WhatsAppButton />
          <OutlineLink href="/come-lavoriamo">Come lavoriamo</OutlineLink>
        </PageHero>

        <div className="relative mx-auto w-full max-w-sm max-md:hidden">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-3 rotate-6 rounded-[2rem] bg-blush"
          />
          <div className={`relative rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              src={fioccoNascita}
              sizes="(min-width: 768px) 24rem, 90vw"
              alt="Fiocco nascita azzurro con nome Damiano in plexiglass dorato, orsetto e fiori, accanto a una bomboniera coordinata"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <ul className="grid gap-6 md:grid-cols-3">
        {events.map(({ icon: Icon, title, text, photo }) => (
          <li key={title} className={`flex flex-col rounded-[1.75rem] bg-card p-3 ${cardShadow}`}>
            {photo ? (
              <Photo
                src={photo.src}
                alt={photo.alt}
                sizes="(min-width: 768px) 20rem, 100vw"
                className="aspect-4/3 rounded-[1.25rem]"
              />
            ) : (
              <PhotoPlaceholder className="aspect-4/3 rounded-[1.25rem]" />
            )}
            <div className="px-2 pt-4 pb-2">
              <span className="grid size-10 place-items-center rounded-full bg-blush text-wine">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-4 text-xl leading-tight font-bold text-wine">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <CtaBand
        title="Hai una festa in programma?"
        text="Scrivici su WhatsApp con la data e il tipo di evento: ti rispondiamo subito."
      />
    </PageShell>
  );
}
