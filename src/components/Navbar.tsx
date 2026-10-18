"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/logo";
import { pages } from "@/lib/site";

gsap.registerPlugin(useGSAP);

const leftLinks = pages.slice(0, 2);
const rightLinks = pages.slice(2);

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="nav-link invisible text-center text-xs leading-tight font-medium transition-colors hover:text-rose-foreground md:text-sm md:whitespace-nowrap"
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(
          ".nav-bg-left",
          { clipPath: "inset(0% 0% 0% 100% round 9999px)" },
          { clipPath: "inset(0% 0% 0% 0% round 9999px)", duration: 0.5 }
        )
        .fromTo(
          ".nav-bg-right",
          { clipPath: "inset(0% 100% 0% 0% round 9999px)" },
          { clipPath: "inset(0% 0% 0% 0% round 9999px)", duration: 0.5 },
          "<"
        )
        .fromTo(
          ".nav-left .nav-link",
          { x: 16, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.35, stagger: { each: 0.06, from: "end" } },
          "-=0.25"
        )
        .fromTo(
          ".nav-right .nav-link",
          { x: -16, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.35, stagger: 0.06 },
          "<"
        );
    },
    { scope: container }
  );

  function toggle() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) tl.current?.play();
    else tl.current?.reverse();
  }

  return (
    <header ref={container} className="relative z-50 flex shrink-0 justify-center px-4 pt-8">
      <nav
        id="main-nav"
        className="relative isolate grid h-12 w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center px-3 md:px-6"
      >
        <span
          aria-hidden
          className="nav-bg-left absolute inset-y-0 left-0 right-1/2 -z-10 rounded-l-full bg-blush [clip-path:inset(0%_0%_0%_100%_round_9999px)]"
        />
        <span
          aria-hidden
          className="nav-bg-right absolute inset-y-0 right-0 left-1/2 -z-10 rounded-r-full bg-blush [clip-path:inset(0%_100%_0%_0%_round_9999px)]"
        />

        <div className="nav-left flex items-center justify-around gap-2 md:gap-3">
          {leftLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="main-nav"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          className="mx-2 -my-6 cursor-pointer rounded-full transition-transform duration-150 ease-out outline-none select-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-90 active:duration-75 md:mx-4"
        >
          <Logo />
        </button>
        <div className="nav-right flex items-center justify-around gap-2 md:gap-3">
          {rightLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </nav>
    </header>
  );
}
