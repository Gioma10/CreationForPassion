import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, type Product } from "@/components/product-card";

const featured: Product[] = [
  { name: "Vase 01", material: "Hand-thrown" },
  { name: "Weave 02", material: "Natural fiber" },
  { name: "Object 03", material: "Ceramic" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-rose-foreground uppercase">
      {children}
      <span className="h-px w-8 bg-rose" />
    </p>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto grid w-full max-w-5xl gap-10 px-6 pt-12 pb-16 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col">
          <Eyebrow>New arrivals</Eyebrow>
          <h1 className="mt-4 text-4xl tracking-tight md:text-5xl">
            Handmade stuff
          </h1>
          <p className="mt-auto max-w-md pt-10 text-lg text-muted-foreground">
            Curated objects for the home, designed to be treasured for a
            lifetime.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/lavori" />}
            className="mt-6 h-11 w-fit rounded-full px-7"
          >
            Explore Collection
          </Button>
        </div>

        <figure className="w-full md:w-64">
          {/* TODO: replace with next/image of the featured piece */}
          <div className="flex aspect-[7/10] items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <ImageIcon className="size-8" />
          </div>
          <figcaption className="mt-4 flex items-center gap-3 text-xs font-semibold">
            Featured Piece
            <span className="h-px w-8 bg-rose" />
          </figcaption>
        </figure>
      </section>

      <section className="relative flex-1 overflow-hidden pt-32 pb-16">
        <div
          aria-hidden
          className="absolute -inset-x-[10%] top-0 h-[200%] rounded-[50%] bg-rose"
        />
        <ul className="relative mx-auto flex max-w-3xl flex-wrap justify-around gap-6 px-6">
          {featured.map((product) => (
            <li key={product.name}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
