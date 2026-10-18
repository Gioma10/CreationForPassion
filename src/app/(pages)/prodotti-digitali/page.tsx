import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppButton, cardShadow } from "@/components/page-parts";
import { services } from "@/lib/site";

const service = services.find((s) => s.href === "/prodotti-digitali")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: { canonical: service.href },
};

// A new service with no catalogue yet: the page's only job is to start a WhatsApp conversation.
export default function ProdottiDigitaliPage() {
  return (
    <main className="flex flex-1 items-center overflow-x-clip px-6 py-16">
      <section className="relative mx-auto w-full max-w-xl">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-blush"
        />
        <div
          className={`relative flex flex-col items-center rounded-[2rem] bg-card px-6 py-12 text-center md:px-12 md:py-16 ${cardShadow}`}
        >
          <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold tracking-widest text-wine uppercase">
            Novità
          </span>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3rem)] leading-tight font-bold tracking-tight text-wine">
            Prodotti digitali
          </h1>
          <p className="mt-4 max-w-md text-base text-wine/85 md:text-lg">
            È una novità e la stiamo costruendo insieme a voi. Ti serve qualcosa di digitale per il tuo
            evento o per la tua attività? Scrivici e ne parliamo.
          </p>
          <div className="mt-8">
            <WhatsAppButton />
            <p className="flex items-center gap-2 text-sm font-semibold text-wine md:hidden">
              Scrivici dal pulsante WhatsApp in alto
              <ArrowUpRight className="size-4" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
