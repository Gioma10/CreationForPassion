import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "relative block size-20 overflow-hidden rounded-full bg-blush ring-4 ring-background md:size-24",
        className
      )}
    >
      <Image
        src="/cforp.png"
        alt="Creation for Passion"
        fill
        sizes="96px"
        priority
        className="object-contain"
      />
    </Link>
  );
}
