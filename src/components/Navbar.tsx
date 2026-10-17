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
      className="text-xs font-medium whitespace-nowrap transition-colors md:text-sm hover:text-rose-foreground"
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 flex justify-center px-4 pt-8">
      <nav className="pointer-events-auto grid h-12 w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center rounded-full bg-blush px-3 md:px-6">
        <div className="flex justify-around gap-3">
          {leftLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
        <Logo className="mx-2 -my-6 md:mx-4" />
        <div className="flex justify-around gap-3">
          {rightLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
      </nav>
    </header>
  );
}
