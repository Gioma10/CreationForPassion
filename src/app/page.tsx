import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, socials } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/cforp.png`,
  image: `${site.url}/cforp.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "IT",
  },
  areaServed: site.city,
  sameAs: socials.map((social) => social.href),
  makesOffer: [
    "Allestimenti per matrimoni",
    "Allestimenti per battesimi e comunioni",
    "Allestimenti per compleanni e feste",
    "Bomboniere fatte a mano",
    "Decorazioni floreali",
    "Oggetti per la casa fatti a mano",
    "Gadget personalizzati",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-rose-foreground uppercase">
      {children}
      <span className="h-px w-8 bg-rose" />
    </p>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto grid min-h-0 w-full max-w-5xl flex-1 @container-size grid-rows-[minmax(0,1fr)] gap-10 px-6 pt-10 pb-6 md:grid-cols-[1fr_auto]">
        <div className="flex min-h-0 flex-col">
          <Eyebrow>Allestimenti & handmade</Eyebrow>
          <h1 className="mt-4 max-w-xl text-[clamp(1.75rem,5.5dvh,3rem)] leading-tight tracking-tight text-balance">
            Allestimenti per eventi a Catania e creazioni fatte a mano
          </h1>
          <p className="mt-auto max-w-lg pt-4 text-base text-muted-foreground md:text-lg">
            Matrimoni, battesimi, comunioni e feste curati in ogni dettaglio.
            Bomboniere e oggetti fatti a mano, spediti anche all&apos;estero.
          </p>
          <div className="mt-5 flex gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/allestimenti" />}
              className="h-10 rounded-full px-5 md:h-11 md:px-7"
            >
              Vedi allestimenti
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/homemade" />}
              variant="outline"
              className="h-10 rounded-full px-5 md:h-11 md:px-7"
            >
              Creazioni handmade
            </Button>
          </div>
        </div>

        {/* Width follows the section height (cqh) so the 7:10 photo always fits without scrolling. */}
        <figure className="hidden w-[min(16rem,calc((100cqh-2rem)*0.7))] flex-col md:flex">
          {/* TODO: replace with next/image of a real setup; give it a descriptive alt, e.g. "Allestimento floreale per matrimonio a Catania". */}
          <div className="flex aspect-7/10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <ImageIcon className="size-8" />
          </div>
          <figcaption className="mt-4 flex items-center gap-3 text-xs font-semibold">
            Allestimento in evidenza
            <span className="h-px w-8 bg-rose" />
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
