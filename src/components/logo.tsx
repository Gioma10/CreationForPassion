import Link from "next/link";
import { cn } from "@/lib/utils";

// Placeholder until the real "Creation for Passion" artwork is added to /public.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Creation for Passion, home"
      className={cn(
        "flex size-24 flex-col items-center justify-center rounded-full bg-blush font-script leading-none text-[#8c1c3a] ring-4 ring-background",
        className
      )}
    >
      <span className="text-2xl">Creation</span>
      <span className="text-xs">for</span>
      <span className="text-2xl">Passion</span>
    </Link>
  );
}
