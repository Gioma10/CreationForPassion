import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/header/SiteHeader";

export default function PagesLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}
