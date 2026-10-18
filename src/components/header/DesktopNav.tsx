"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavLogo } from "@/components/header/NavLogo";
import { navLinks } from "@/lib/site";

gsap.registerPlugin(useGSAP);

// Logo on the left; the link pill opens out of it to the right, and folds back while the header is hidden.
export function DesktopNav({ hidden }: { hidden: boolean }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(
          ".nav-pill",
          { clipPath: "inset(0% 100% 0% 0% round 9999px)" },
          { clipPath: "inset(0% 0% 0% 0% round 9999px)", duration: 0.55 },
        )
        .fromTo(
          ".nav-pill a",
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.05 },
          "-=0.3",
        );
    },
    { scope: root },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.progress(hidden ? 0 : 1).pause();
    } else if (hidden) {
      timeline.reverse();
    } else {
      timeline.play();
    }
  }, [hidden]);

  return (
    <div ref={root} className="hidden items-center md:flex">
      <NavLogo />
      <nav
        aria-label="Navigazione principale"
        className="nav-pill pointer-events-auto -ml-8 flex h-12 items-center gap-7 rounded-full border-2 border-background bg-blush pr-7 pl-12 [clip-path:inset(0%_100%_0%_0%_round_9999px)]"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className="invisible text-sm font-medium whitespace-nowrap text-wine transition-colors outline-none hover:text-rose-foreground focus-visible:underline aria-[current=page]:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
