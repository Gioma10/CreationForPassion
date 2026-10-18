import type { Metadata } from "next";
import { services } from "@/lib/site";

const service = services.find((s) => s.href === "/prodotti-digitali")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: { canonical: service.href },
};

export default function ProdottiDigitaliPage() {
  return (
    <main className="mx-auto min-h-0 w-full max-w-5xl flex-1 overflow-y-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight">{service.title}</h1>
    </main>
  );
}
