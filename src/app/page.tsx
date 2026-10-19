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
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* On desktop the home is a single screen: the deck's card sizes and the rising arc depend on this fixed height.
          On mobile it grows with the content, so larger system font sizes don't push it under the footer. */}
      <div className="flex min-h-dvh flex-col overflow-hidden md:h-dvh">
        <SiteHeader />
        <ServicesHero />
        <Footer />
      </div>
    </>
  );
}
