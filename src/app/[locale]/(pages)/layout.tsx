import { type Locale } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/header/SiteHeader";

export default function PagesLayout({ children, params }: LayoutProps<"/[locale]">) {
  // Layouts render in parallel with the root one, so the header and footer need the locale set here too.
  setRequestLocale(use(params).locale as Locale);
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}
