import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block size-14 overflow-hidden rounded-full bg-blush ring-2 ring-background md:size-16",
        className
      )}
    >
      <Image
        src="/cforp.png"
        alt={site.name}
        fill
        sizes="64px"
        loading="eager"
        className="object-contain"
      />
    </span>
  );
}
