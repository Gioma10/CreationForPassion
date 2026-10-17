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
    <main className="flex min-h-0 flex-1 flex-col">
      <section className="mx-auto grid min-h-0 w-full max-w-5xl flex-1 @container-size grid-rows-[minmax(0,1fr)] gap-10 px-6 pt-10 pb-6 md:grid-cols-[1fr_auto]">
        <div className="flex min-h-0 flex-col">
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

        {/* Width follows the section height (cqh) so the 7:10 photo always fits without scrolling. */}
        <figure className="hidden w-[min(16rem,calc((100cqh-2rem)*0.7))] flex-col md:flex">
          {/* TODO: replace with next/image of the featured piece */}
          <div className="flex aspect-7/10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <ImageIcon className="size-8" />
          </div>
          <figcaption className="mt-4 flex items-center gap-3 text-xs font-semibold">
            Featured Piece
            <span className="h-px w-8 bg-rose" />
          </figcaption>
        </figure>
      </section>

      <section className="relative flex h-[clamp(11rem,32dvh,17rem)] shrink-0 items-end overflow-hidden pb-[4dvh]">
        <div
          aria-hidden
          className="absolute inset-x-[-10%] top-0 h-[40vw] rounded-[50%] bg-rose"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-[20vw] bottom-0 bg-rose"
        />
        <ul className="relative mx-auto flex w-full max-w-3xl justify-around gap-3 px-4">
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
