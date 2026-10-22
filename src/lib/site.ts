import type { PhotoId } from "@/lib/photos";

// Copy lives in messages/*.json; this module holds only what is the same in every language.
export const site = {
  name: "Creation for Passion",
  // TODO: replace with the real domain before going live (used for canonical URLs, sitemap, Open Graph).
  url: "https://www.creationforpassion.it",
  city: "Catania",
} as const;

// TODO: replace the placeholder handles and WhatsApp number.
export const socials = [
  { name: "WhatsApp", href: "https://wa.me/390000000000" },
  { name: "Instagram", href: "https://www.instagram.com/creationforpassion" },
  { name: "TikTok", href: "https://www.tiktok.com/@creationforpassion" },
  { name: "Facebook", href: "https://www.facebook.com/creationforpassion" },
] as const;

export type SocialName = (typeof socials)[number]["name"];

// `key` names the label under `nav.links` in messages.
export const navLinks = [
  { href: "/allestimenti", key: "allestimenti" },
  { href: "/artigianato", key: "artigianato" },
  { href: "/eventi", key: "eventi" },
  { href: "/chi-siamo", key: "chiSiamo" },
  { href: "/come-lavoriamo", key: "comeLavoriamo" },
] as const;

// `key` names the card copy under `home.services` in messages.
export const services = [
  { key: "allestimenti", href: "/allestimenti", photo: "battesimoAzzurro" },
  { key: "artigianato", href: "/artigianato", photo: "borsetta" },
  { key: "eventi", href: "/eventi", photo: "genderReveal" },
] as const satisfies readonly { key: string; href: string; photo: PhotoId }[];

export type Service = (typeof services)[number];
