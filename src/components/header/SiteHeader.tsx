"use client";

import { DesktopNav } from "@/components/header/DesktopNav";
import { MobileNav } from "@/components/header/MobileNav";
import { useHideOnScroll } from "@/components/header/use-hide-on-scroll";
import { SocialIcon } from "@/components/social-icon";
import { socials } from "@/lib/site";
import { cn } from "@/lib/utils";

const whatsapp = socials.find((social) => social.name === "WhatsApp")!;

export function SiteHeader() {
  const { hidden, scrolled, show } = useHideOnScroll();

  return (
    <>
      {/* Transparent and click-through at the top of the page. On mobile, once scrolled, it becomes a white bar.
          Hiding on scroll is desktop only. */}
      <header
        onFocusCapture={show}
        className={cn(
          "pointer-events-none sticky top-0 z-50 shrink-0 py-3 transition-[background-color,box-shadow] duration-300 md:py-0 md:pt-6 md:transition-transform md:ease-out",
          scrolled && "max-md:pointer-events-auto max-md:bg-background max-md:shadow-[0_8px_20px_-14px_rgb(60_10_25/0.35)]",
          hidden && "md:-translate-y-[calc(100%+1.5rem)]",
        )}
      >
        <div className="mx-auto flex w-full max-w-5xl items-center px-5 md:justify-center md:px-6">
          <MobileNav showTitle={scrolled} />
          <DesktopNav hidden={hidden} />
        </div>
      </header>

      {/* Mobile only, pinned bottom left. */}
      <a
        href={whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrivici su WhatsApp"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-50 grid size-12 place-items-center rounded-full bg-wine text-background shadow-[0_8px_20px_-6px_rgb(0_0_0/0.35)] transition-transform duration-150 ease-out active:scale-90 md:hidden"
      >
        <SocialIcon name="WhatsApp" className="size-6" />
      </a>
    </>
  );
}
