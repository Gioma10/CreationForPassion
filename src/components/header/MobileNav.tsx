"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { NavLogo } from "@/components/header/NavLogo";
import { navLinks, pages } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// Logo on the left, menu toggle on the right, current page title between them once the page is scrolled.
// Collapsed (the home), the logo sits alone at the center; `--open` (0 → 1) slides it left as the toggle appears.
export function MobileNav({ showTitle, collapsed }: { showTitle: boolean; collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const current = pages.find((link) => link.href === pathname);
  const title = current && t(`links.${current.key}`);
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const reveal = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      reveal.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(root.current, { "--open": 0 }, { "--open": 1, duration: 0.55 })
        .fromTo(
          ".menu-toggle",
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.35 },
          "-=0.25",
        );

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
    const timeline = reveal.current;
    if (!timeline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.progress(collapsed ? 0 : 1).pause();
    } else if (collapsed) {
      timeline.reverse();
    } else {
      timeline.play();
    }
  }, [collapsed]);

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
    <div ref={root} className="@container relative flex w-full items-center gap-3 [--open:0] md:hidden">
      <div className="shrink-0 [translate:calc((1-var(--open))*(50cqw-50%))_0]">
        <NavLogo />
      </div>
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
        aria-label={open ? t("closeMenu") : t("openMenu")}
        className="menu-toggle pointer-events-auto invisible grid size-11 place-items-center rounded-full bg-blush text-wine transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-rose active:scale-90"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav
        id="mobile-menu"
        aria-label={t("label")}
        className="menu-panel pointer-events-auto invisible absolute top-full right-0 mt-3 w-[min(17rem,calc(100vw-2.5rem))] rounded-[1.75rem] bg-card p-2 opacity-0 shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]"
      >
        {navLinks.map((link) => (
          <div key={link.href}>
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className="block rounded-full px-4 py-3 text-base font-semibold text-wine outline-none hover:bg-blush focus-visible:bg-blush aria-[current=page]:bg-blush"
            >
              {t(`links.${link.key}`)}
            </Link>
            {"children" in link &&
              link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === child.href ? "page" : undefined}
                  className="ml-4 block rounded-full px-4 py-2 text-sm font-medium text-wine/80 outline-none hover:bg-blush focus-visible:bg-blush aria-[current=page]:bg-blush aria-[current=page]:text-wine"
                >
                  {t(`links.${child.key}`)}
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </div>
  );
}
