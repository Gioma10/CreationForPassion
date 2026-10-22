import type { StaticImageData } from "next/image";
import battesimoAzzurro from "@/assets/photos/allestimenti/allestimento-battesimo-azzurro-angelo.jpg";
import borsetta from "@/assets/photos/handmade/borsetta-fiori-cera-busto.jpg";
import gender from "@/assets/photos/eventi/palloncini-gender-reveal-bebe.jpg";

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
    title: "Allestimenti per eventi a Catania",
    description:
      "Allestimenti per matrimoni, battesimi, comunioni, compleanni e feste a Catania, progettati e realizzati su misura.",
  },
  {
    href: "/handmade",
    title: "Creazioni artigianali fatte a mano",
    description:
      "Bomboniere, candele e gesso, composizioni di palloncini e gadget personalizzati fatti a mano. Spedizioni in Italia e all'estero.",
  },
  {
    href: "/chi-siamo",
    title: "Chi siamo",
    description:
      "Creation for Passion: allestimenti per eventi a Catania e creazioni artigianali nate dalla passione per il fatto a mano.",
  },
  {
    href: "/come-lavoriamo",
    title: "Come lavoriamo",
    description:
      "Dal primo contatto al giorno dell'evento: come progettiamo i tuoi allestimenti e realizziamo le creazioni su misura.",
  },
] as const;

export const navLinks = [
  { href: "/allestimenti", label: "Allestimenti" },
  { href: "/handmade", label: "Artigianato" },
  { href: "/eventi", label: "Eventi" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/come-lavoriamo", label: "Come lavoriamo" },
] as const;

export type Service = {
  title: string;
  description: string;
  href: string;
  photo: { src: StaticImageData; alt: string };
};

export const services = [
  {
    title: "Allestimenti",
    description:
      "Hai bisogno di un'atmosfera pensata per un evento a Catania? Iniziamo da qui.",
    href: "/allestimenti",
    photo: {
      src: battesimoAzzurro,
      alt: "Allestimento per battesimo in azzurro con drappeggi, palloncini, nome Francesco, angelo dorato e bomboniere",
    },
  },
  {
    title: "Artigianato",
    description:
      "Cerchi qualcosa fatto a mano? Iniziamo dalle creazioni che raccontano una storia.",
    href: "/handmade",
    photo: {
      src: borsetta,
      alt: "Composizione in una borsetta bianca con busto, farfalla e fiori decorativi fatti a mano nei toni del rosso",
    },
  },
  {
    title: "Eventi",
    description:
      "Gender reveal, baby shower o bomboniere last minute? Iniziamo dalla tua festa.",
    href: "/eventi",
    photo: {
      src: gender,
      alt: "Composizione di palloncini per gender reveal con due bebè, colonna rosa e azzurra e palloncino nero con punti interrogativi",
    },
  },
] as const satisfies readonly Service[];

export function pageByHref(href: (typeof pages)[number]["href"]) {
  return pages.find((page) => page.href === href)!;
}
