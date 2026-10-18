import Link from "next/link";
import { ArrowUpRight, Check, ImageIcon } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";
import { socials } from "@/lib/site";
import type { ServicePageContent } from "@/lib/service-pages";

const whatsapp = socials.find((social) => social.name === "WhatsApp")!;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-wine uppercase">
      {children}
      <span className="h-px w-8 bg-wine/60" />
    </p>
  );
}

// TODO: replace each placeholder with next/image once real photos are available.
function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-blush text-wine/40 ${className ?? ""}`}
    >
      <ImageIcon className="size-8" />
    </div>
  );
}

function WhatsAppButton({ inverted = false }: { inverted?: boolean }) {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 items-center gap-2.5 rounded-full px-6 text-base font-medium transition-colors ${
        inverted
          ? "bg-background text-wine hover:bg-blush"
          : "bg-wine text-background hover:bg-wine/90"
      }`}
    >
      <SocialIcon name="WhatsApp" className="size-4" />
      Scrivici su WhatsApp
    </a>
  );
}

export function ServicePage({ content }: { content: ServicePageContent }) {
  return (
    <main className="min-h-0 flex-1 overflow-x-clip overflow-y-auto">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-6 pt-8 pb-20 md:gap-28">
        <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <div className="flex flex-col items-start">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-tight tracking-tight text-balance text-wine">
              {content.title}
            </h1>
            <p className="mt-4 max-w-md text-base text-wine/85 md:text-lg">
              {content.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Link
                href="/come-lavoriamo"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-wine/20 px-6 text-base font-medium text-wine transition-colors hover:bg-blush"
              >
                Come lavoriamo
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-3 rotate-6 rounded-[2rem] bg-blush shadow-[0_18px_40px_-20px_rgb(60_10_25/0.35)]"
            />
            <div className="relative rounded-[2rem] bg-card p-3 shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]">
              <PhotoPlaceholder className="aspect-4/5 rounded-[1.5rem]" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div>
            <Eyebrow>Per quali occasioni</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-wine md:text-4xl">
              Cosa possiamo fare per te
            </h2>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {content.offers.map((offer) => (
              <li
                key={offer.title}
                className="flex flex-col rounded-[1.75rem] bg-card p-3 shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]"
              >
                <PhotoPlaceholder className="aspect-4/3 rounded-[1.25rem]" />
                <div className="px-2 pt-4 pb-2">
                  <h3 className="text-xl leading-tight font-bold text-wine">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {offer.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 rounded-[2rem] bg-blush p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
          <div>
            <Eyebrow>Cosa curiamo</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-wine">
              Ogni dettaglio, dall&apos;inizio alla fine
            </h2>
          </div>
          <ul className="grid content-start gap-x-8 gap-y-4 sm:grid-cols-2">
            {content.includes.map((item) => (
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
          <div>
            <Eyebrow>Lavori realizzati</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-wine md:text-4xl">
              Alcune nostre creazioni
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 5 }, (_, i) => (
              <PhotoPlaceholder
                key={i}
                className={`rounded-[1.5rem] ${i === 0 ? "row-span-2 aspect-auto" : "aspect-square"}`}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div>
            <Eyebrow>Come funziona</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-wine md:text-4xl">
              Tre passi, senza pensieri
            </h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-3">
            {content.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col border-t border-wine/20 pt-5">
                <span className="text-sm font-semibold text-rose-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-bold text-wine">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col items-start gap-6 rounded-[2rem] bg-wine p-8 text-background md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight">{content.cta.title}</h2>
            <p className="mt-3 text-background/80">{content.cta.text}</p>
          </div>
          <WhatsAppButton inverted />
        </section>
      </div>
    </main>
  );
}
