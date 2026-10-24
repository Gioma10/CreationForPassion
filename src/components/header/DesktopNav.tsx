"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { NavLogo } from "@/components/header/NavLogo";
import { navLinks } from "@/lib/site";

gsap.registerPlugin(useGSAP);

// Closed, the logo sits alone at the center. Opening, the group slides so the logo moves left while the
// link pill opens out of it to the right; it folds back while the header is hidden.
// `--open` (0 → 1) drives the slide in CSS, so the closed logo is centered from the first server-rendered paint.
// Once open, the pill drops its clip-path so submenus can hang below it; reversing restores the clip.
const linkClass =
  "nav-link invisible text-sm font-medium whitespace-nowrap text-wine transition-colors outline-none hover:text-rose-foreground focus-visible:underline aria-[current]:font-bold";

export function DesktopNav({ open }: { open: boolean }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(root.current, { "--open": 0 }, { "--open": 1, duration: 0.55 })
        .fromTo(
          ".nav-pill",
          { clipPath: "inset(0% 100% 0% 0% round 9999px)" },
          { clipPath: "inset(0% 0% 0% 0% round 9999px)", duration: 0.55 },
          0,
        )
        .fromTo(
          ".nav-pill .nav-link",
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.05 },
          "-=0.3",
        )
        .set(".nav-pill", { clipPath: "none" });
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

  return (
    <div
      ref={root}
      className="hidden items-center [--open:0] [translate:calc((1-var(--open))*(100%-4rem)/2)_0] md:flex"
    >
      <NavLogo />
      <nav
        aria-label={t("label")}
        className="nav-pill pointer-events-auto -ml-8 flex h-12 items-center gap-7 rounded-full border-2 border-background bg-blush pr-7 pl-12 [clip-path:inset(0%_100%_0%_0%_round_9999px)]"
      >
        {navLinks.map((link) => {
          const label = t(`links.${link.key}`);
          const current = pathname === link.href ? "page" : pathname.startsWith(`${link.href}/`) ? "true" : undefined;
          if (!("children" in link)) {
            return (
              <Link key={link.href} href={link.href} aria-current={current} className={linkClass}>
                {label}
              </Link>
            );
          }
          return (
            <div key={link.href} className="group relative">
              <Link href={link.href} aria-current={current} className={`${linkClass} inline-flex items-center gap-1`}>
                {label}
                <ChevronDown className="size-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="flex min-w-56 flex-col rounded-[1.5rem] bg-card p-2 shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={pathname === child.href ? "page" : undefined}
                      className="rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap text-wine outline-none hover:bg-blush focus-visible:bg-blush aria-[current=page]:bg-blush aria-[current=page]:font-bold"
                    >
                      {t(`links.${child.key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
