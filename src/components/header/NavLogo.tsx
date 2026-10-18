"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { HOME_RESET_EVENT } from "@/lib/home-reset";
import { cn } from "@/lib/utils";

export function NavLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      onClick={() => window.dispatchEvent(new Event(HOME_RESET_EVENT))}
      aria-label="Creation for Passion, torna alla home"
      className={cn(
        "pointer-events-auto relative z-10 shrink-0 rounded-full transition-transform duration-150 ease-out outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-95",
        className,
      )}
    >
      <Logo />
    </Link>
  );
}
