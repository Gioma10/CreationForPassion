import { siFacebook, siInstagram, siTiktok, siWhatsapp } from "simple-icons";
import type { SocialName } from "@/lib/site";

const icons = {
  WhatsApp: siWhatsapp,
  Instagram: siInstagram,
  TikTok: siTiktok,
  Facebook: siFacebook,
} satisfies Record<SocialName, { path: string }>;

export function SocialIcon({
  name,
  className,
}: {
  name: SocialName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={icons[name].path} />
    </svg>
  );
}
