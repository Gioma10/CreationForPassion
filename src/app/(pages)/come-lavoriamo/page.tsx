import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { CtaBand, PageHero, PageShell, SectionHeading, WhatsAppButton } from "@/components/page-parts";
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
    title: "Ti facciamo una proposta",
    text: "Prepariamo una proposta su misura con idee, materiali e preventivo. La sistemiamo insieme finché non ti convince.",
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
    question: "Come ricevo un preventivo?",
    answer:
      "Scrivici su WhatsApp con il tipo di evento, la data e un'idea dello stile che ti piace: ti rispondiamo con una proposta su misura.",
  },
];

export default function ComeLavoriamoPage() {
  return (
    <PageShell>
      <section className="max-w-2xl">
        <PageHero
          eyebrow="Come lavoriamo"
          title="Dal primo messaggio al giorno della festa"
          intro="Che si tratti di un allestimento o di una creazione fatta a mano, lavoriamo sempre così: ascoltiamo, progettiamo insieme e realizziamo ogni dettaglio con cura."
        >
          <WhatsAppButton />
        </PageHero>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading eyebrow="Il percorso" title="Quattro passi insieme" />
        <ol className="relative flex flex-col gap-10 md:gap-12">
          <span aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-wine/15 md:left-8" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-5 md:grid-cols-[4rem_1fr] md:gap-8">
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
