"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { NavLogo } from "@/components/header/NavLogo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// Logo on the left, menu toggle on the right, current page title between them once the page is scrolled.
export function MobileNav({ showTitle }: { showTitle: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = navLinks.find((link) => link.href === pathname)?.label;
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(
          ".menu-panel",
          { autoAlpha: 0, y: -8, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, transformOrigin: "top right" },
        )
        .fromTo(
          ".menu-panel a",
          { autoAlpha: 0, x: -8 },
          { autoAlpha: 1, x: 0, duration: 0.25, stagger: 0.04 },
          "-=0.15",
        );
    },
    { scope: root },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.progress(open ? 1 : 0).pause();
    } else if (open) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Next keeps pages alive in <Activity>: close the menu when this page gets hidden, so it isn't open on return.
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <div ref={root} className="relative flex w-full items-center gap-3 md:hidden">
      <NavLogo />
      <p
        aria-hidden={!showTitle}
        className={cn(
          "min-w-0 flex-1 truncate text-center text-base font-semibold text-wine transition-opacity duration-300",
          showTitle && title ? "opacity-100" : "opacity-0",
        )}
      >
        {title}
      </p>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        className="pointer-events-auto grid size-11 place-items-center rounded-full bg-blush text-wine transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-rose active:scale-90"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav
        id="mobile-menu"
        aria-label="Navigazione principale"
        className="menu-panel pointer-events-auto invisible absolute top-full right-0 mt-3 w-[min(17rem,calc(100vw-2.5rem))] rounded-[1.75rem] bg-card p-2 opacity-0 shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={pathname === link.href ? "page" : undefined}
            className="block rounded-full px-4 py-3 text-base font-semibold text-wine outline-none hover:bg-blush focus-visible:bg-blush aria-[current=page]:bg-blush"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
