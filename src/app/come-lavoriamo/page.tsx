import type { Metadata } from "next";
import { pageByHref } from "@/lib/site";

const page = pageByHref("/come-lavoriamo");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.href },
};

export default function ComeLavoriamoPage() {
  return (
    <main className="mx-auto min-h-0 w-full max-w-5xl flex-1 overflow-y-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight">{page.title}</h1>
    </main>
  );
}
