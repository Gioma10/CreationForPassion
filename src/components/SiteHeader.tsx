"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { SocialIcon } from "@/components/social-icon";
import { HOME_RESET_EVENT } from "@/lib/home-reset";
import { socials } from "@/lib/site";

const whatsapp = socials.find((social) => social.name === "WhatsApp")!;

export function SiteHeader() {
  return (
    // Sticky but transparent: pointer-events-none so the empty strip doesn't block clicks on the content scrolling under it.
    <header className="pointer-events-none sticky top-0 z-50 flex shrink-0 items-center px-5 pt-4 md:justify-center md:px-0 md:pt-6">
      <Link
        href="/"
        onClick={() => window.dispatchEvent(new Event(HOME_RESET_EVENT))}
        aria-label="Creation for Passion, torna alla home"
        className="pointer-events-auto rounded-full transition-transform duration-150 ease-out outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-95"
      >
        <Logo />
      </Link>

      {/* Mobile only: pinned so it stays reachable while scrolling. Top offset centers it on the logo. */}
      <a
        href={whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrivici su WhatsApp"
        className="fixed top-5 right-5 z-50 grid size-12 place-items-center rounded-full bg-wine text-background shadow-[0_8px_20px_-6px_rgb(0_0_0/0.35)] transition-transform duration-150 ease-out active:scale-90 md:hidden"
      >
        <SocialIcon name="WhatsApp" className="size-6" />
      </a>
    </header>
  );
}
