import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export default function PagesLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}
