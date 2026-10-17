import Link from "next/link";
import { Logo } from "@/components/logo";
import { pages } from "@/lib/site";

const leftLinks = pages.slice(0, 2);
const rightLinks = pages.slice(2);

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-center text-xs leading-tight font-medium transition-colors hover:text-rose-foreground md:text-sm md:whitespace-nowrap"
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="relative z-50 flex shrink-0 justify-center px-4 pt-8">
      <nav className="grid h-12 w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center rounded-full bg-blush px-3 md:px-6">
        <div className="flex items-center justify-around gap-2 md:gap-3">
          {leftLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
        <Logo className="mx-2 -my-6 md:mx-4" />
        <div className="flex items-center justify-around gap-2 md:gap-3">
          {rightLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </nav>
    </header>
  );
}
