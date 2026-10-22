import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";
import { socials } from "@/lib/site";
import { cn } from "@/lib/utils";

export { Photo } from "@/components/photo";

const whatsapp = socials.find((social) => social.name === "WhatsApp")!;

export const cardShadow = "shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-wine uppercase">
      {children}
      <span className="h-px w-8 bg-wine/60" />
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-wine md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

// TODO: replace each placeholder with next/image once real photos are available.
export function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-blush text-wine/40", className)}>
      <ImageIcon className="size-8" />
    </div>
  );
}

// Desktop only: on mobile the pinned WhatsApp button in SiteHeader does this job.
export function WhatsAppButton({ inverted = false }: { inverted?: boolean }) {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "hidden h-11 items-center gap-2.5 rounded-full px-6 text-base font-medium transition-colors md:inline-flex",
        inverted
          ? "bg-background text-wine hover:bg-blush"
          : "bg-wine text-background hover:bg-wine/90",
      )}
    >
      <SocialIcon name="WhatsApp" className="size-4" />
      Scrivici su WhatsApp
    </a>
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="flex flex-col items-start gap-6 rounded-[2rem] bg-wine p-8 text-background md:flex-row md:items-center md:justify-between md:p-12">
      <div className="max-w-lg">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-3 text-background/80">{text}</p>
      </div>
      <WhatsAppButton inverted />
    </section>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 overflow-x-clip">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-6 pt-8 pb-20 md:gap-28">
        {children}
      </div>
    </main>
  );
}

export function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-wine/20 px-6 text-base font-medium text-wine transition-colors hover:bg-blush"
    >
      {children}
      <ArrowUpRight className="size-4" />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-tight tracking-tight text-balance text-wine">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-base text-wine/85 md:text-lg">{intro}</p>
      {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}
