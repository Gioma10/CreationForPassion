import type { Organization, WithContext } from "schema-dts";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/ServicesHero";
import { SiteHeader } from "@/components/header/SiteHeader";
import { site, socials } from "@/lib/site";

const jsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
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
    "Candele e oggetti in gesso fatti a mano",
    "Composizioni di palloncini",
    "Gadget personalizzati",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* The home is a single screen: the hero's card sizes and the rising arc depend on this fixed height. */}
      <div className="flex h-dvh flex-col overflow-hidden">
        <SiteHeader />
        <ServicesHero />
        <Footer />
      </div>
    </>
  );
}
