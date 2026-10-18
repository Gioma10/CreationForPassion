export const site = {
  name: "Creation for Passion",
  // TODO: replace with the real domain before going live (used for canonical URLs, sitemap, Open Graph).
  url: "https://www.creationforpassion.it",
  city: "Catania",
  description:
    "Allestimenti per matrimoni, battesimi, comunioni e feste a Catania. Bomboniere, decorazioni floreali e creazioni fatte a mano, con spedizioni in Italia e all'estero.",
} as const;

// TODO: replace the placeholder handles and WhatsApp number.
export const socials = [
  { name: "WhatsApp", href: "https://wa.me/390000000000" },
  { name: "Instagram", href: "https://www.instagram.com/creationforpassion" },
  { name: "TikTok", href: "https://www.tiktok.com/@creationforpassion" },
  { name: "Facebook", href: "https://www.facebook.com/creationforpassion" },
] as const;

export type SocialName = (typeof socials)[number]["name"];

export const pages = [
  {
    href: "/allestimenti",
    label: "Allestimenti",
    title: "Allestimenti per eventi a Catania",
    description:
      "Allestimenti per matrimoni, battesimi, comunioni, compleanni e feste a Catania, progettati e realizzati su misura.",
  },
  {
    href: "/handmade",
    label: "Artigianato",
    title: "Creazioni artigianali fatte a mano",
    description:
      "Bomboniere, decorazioni floreali, oggetti per la casa e gadget personalizzati fatti a mano. Spedizioni in Italia e all'estero.",
  },
  {
    href: "/chi-siamo",
    label: "Chi siamo",
    title: "Chi siamo",
    description:
      "Creation for Passion: allestimenti per eventi a Catania e creazioni artigianali nate dalla passione per il fatto a mano.",
  },
  {
    href: "/come-lavoriamo",
    label: "Come lavoriamo",
    title: "Come lavoriamo",
    description:
      "Dal primo contatto al giorno dell'evento: come progettiamo i tuoi allestimenti e realizziamo le creazioni su misura.",
  },
] as const;

export type Service = {
  title: string;
  description: string;
  href?: string;
};

// TODO: add a real photo for each service (next/image `src` + descriptive alt).
export const services = [
  {
    title: "Allestimenti",
    description:
      "Hai bisogno di un'atmosfera pensata per un evento a Catania? Iniziamo da qui.",
    href: "/allestimenti",
  },
  {
    title: "Artigianato",
    description:
      "Cerchi qualcosa fatto a mano? Iniziamo dalle creazioni che raccontano una storia.",
    href: "/handmade",
  },
  {
    title: "Prodotti digitali",
    description:
      "Hai bisogno di qualcosa pensato per il digitale? Iniziamo dalle proposte più adatte.",
  },
] as const satisfies readonly Service[];

export function pageByHref(href: (typeof pages)[number]["href"]) {
  return pages.find((page) => page.href === href)!;
}
