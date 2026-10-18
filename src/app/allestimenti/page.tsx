import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { pageByHref } from "@/lib/site";
import { allestimenti } from "@/lib/service-pages";

const page = pageByHref("/allestimenti");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.href },
};

export default function AllestimentiPage() {
  return <ServicePage content={allestimenti} />;
}
