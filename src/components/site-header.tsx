import Link from "next/link";
import { Logo } from "@/components/logo";

const leftLinks = [
  { href: "/job", label: "Job" },
  { href: "/lavori", label: "I miei lavori" },
];

const rightLinks = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium transition-colors hover:text-rose-foreground"
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="flex justify-center px-4 pt-6">
      <nav className="grid h-12 w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center rounded-full bg-blush px-6">
        <div className="flex justify-around gap-4">
          {leftLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
        <Logo className="mx-4 -my-6" />
        <div className="flex justify-around gap-4">
          {rightLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
      </nav>
    </header>
  );
}
