import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import allestimentoSposi from "@/assets/photos/allestimenti/allestimento-sposi-arco-cuore.jpg";
import barattoloGesso from "@/assets/photos/artigianato/barattolo-gesso-fiocco.jpg";
import {
  CtaBand,
  PageHero,
  PageShell,
  Photo,
  SectionHeading,
  WhatsAppButton,
  cardShadow,
} from "@/components/page-parts";
import { pageByHref } from "@/lib/site";

const page = pageByHref("/come-lavoriamo");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.href },
};

// TODO: have the owner confirm timings and answers before going live.
const steps = [
  {
    title: "Ci scrivi",
    text: "Mandaci un messaggio su WhatsApp o sui social: raccontaci che evento stai organizzando o cosa ti serve.",
  },
  {
    title: "Ci conosciamo",
    text: "Parliamo della data, dello stile, dei colori e di cosa hai in mente. Se vuoi, mandaci foto e ispirazioni.",
  },
  {
    title: "Ti diamo qualche idea",
    text: "Ti raccontiamo come immaginiamo il tuo evento: idee, colori e materiali. Li definiamo insieme finché non ti convincono.",
  },
  {
    title: "Realizziamo",
    text: "Creiamo tutto a mano. Per gli allestimenti pensiamo noi alla location il giorno dell'evento; le creazioni te le spediamo.",
  },
];

const faqs = [
  {
    question: "Quanto tempo prima devo contattarvi?",
    answer:
      "Prima è, meglio è. Per un matrimonio conviene scriverci qualche mese prima; per bomboniere e creazioni dipende dalle quantità. Scrivici e ti diciamo subito se siamo disponibili per la tua data.",
  },
  {
    question: "Lavorate solo a Catania?",
    answer:
      "Gli allestimenti li realizziamo a Catania e dintorni. Le creazioni fatte a mano le spediamo in tutta Italia e all'estero.",
  },
  {
    question: "Posso personalizzare una creazione?",
    answer:
      "Sì, è quello che facciamo più volentieri: nomi, date, colori e materiali si scelgono insieme.",
  },
  {
    question: "Come posso avere informazioni?",
    answer:
      "Scrivici su WhatsApp o sui social con il tipo di evento, la data e un'idea dello stile che ti piace: ti rispondiamo per ogni dubbio.",
  },
];

export default function ComeLavoriamoPage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <PageHero
          eyebrow="Come lavoriamo"
          title="Dal primo messaggio al giorno della festa"
          intro="Che si tratti di un allestimento o di una creazione fatta a mano, lavoriamo sempre così: ascoltiamo, progettiamo insieme e realizziamo ogni dettaglio con cura."
        >
          <WhatsAppButton />
        </PageHero>

        <div className="relative mx-auto grid w-full max-w-md grid-cols-[1.15fr_1fr] items-center gap-4">
          <div className={`rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              cover
              src={allestimentoSposi}
              sizes="(min-width: 768px) 15rem, 50vw"
              alt="Allestimento con arco a cuore dorato e sagoma degli sposi, fiori, confettata, palloncini e lanterne bianche"
              className="aspect-3/4 rounded-[1.5rem]"
            />
          </div>
          <div className={`translate-y-8 rotate-3 rounded-[2rem] bg-card p-3 ${cardShadow}`}>
            <Photo
              src={barattoloGesso}
              sizes="(min-width: 768px) 13rem, 45vw"
              alt="Barattolo in gesso bianco con fiocco verde e fiori decorativi fatti a mano su un runner dorato"
              className="aspect-4/5 rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading eyebrow="Il percorso" title="Quattro passi insieme" />
        <ol className="relative grid gap-10 md:grid-cols-2 md:gap-6">
          <span aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-wine/15 md:hidden" />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[3rem_1fr] gap-5 md:grid-cols-[4rem_1fr] md:gap-6 md:rounded-[1.75rem] md:bg-blush md:p-8"
            >
              <span className="grid size-12 place-items-center rounded-full bg-wine text-lg font-bold text-background md:size-16 md:text-2xl">
                {i + 1}
              </span>
              <div className="pt-2 md:pt-3">
                <h3 className="text-xl font-bold text-wine md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-foreground/75">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <SectionHeading eyebrow="Domande frequenti" title="Hai qualche dubbio?" />
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-[1.5rem] bg-blush px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-wine [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-foreground/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand
        title="Iniziamo dal primo passo"
        text="Scrivici su WhatsApp: è il modo più veloce per raccontarci la tua idea."
      />
    </PageShell>
  );
}
