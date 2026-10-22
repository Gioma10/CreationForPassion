"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/logo";
import { HOME_RESET_EVENT } from "@/lib/home-reset";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NavLogo({ className }: { className?: string }) {
  const t = useTranslations("nav");
  return (
    <Link
      href="/"
      onClick={() => window.dispatchEvent(new Event(HOME_RESET_EVENT))}
      aria-label={t("homeLink", { name: site.name })}
      className={cn(
        "pointer-events-auto relative z-10 shrink-0 rounded-full transition-transform duration-150 ease-out outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-95",
        className,
      )}
    >
      <Logo />
    </Link>
  );
}
