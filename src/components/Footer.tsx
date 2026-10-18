import { SocialIcon } from "@/components/social-icon";
import { site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative flex h-[clamp(9rem,26dvh,14rem)] shrink-0 items-end overflow-hidden pb-[3dvh]">
      <div
        aria-hidden
        className="absolute inset-x-[-10%] top-0 h-[40vw] rounded-[50%] bg-rose"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-[20vw] bottom-0 bg-rose"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 text-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Dove ci trovi
        </h2>
        <ul className="flex gap-3">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center gap-2 rounded-full bg-background px-3 text-sm font-medium shadow-sm transition-transform hover:-translate-y-0.5 md:px-4"
              >
                <SocialIcon name={social.name} className="size-4" />
                <span className="sr-only md:not-sr-only">{social.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-foreground/60">
          © {site.name} · Allestimenti a {site.city} · Creazioni handmade
          spedite in Italia e all&apos;estero
        </p>
      </div>
    </footer>
  );
}
