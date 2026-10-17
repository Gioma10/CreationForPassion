import { ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type Product = {
  name: string;
  material: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card size="sm" className="w-32 gap-2 rounded-2xl ring-0 shadow-sm">
      <CardContent className="space-y-2">
        {/* TODO: replace with next/image once product photos are in /public */}
        <div className="flex aspect-[5/3] items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <ImageIcon className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold">{product.name}</p>
          <p className="text-[0.65rem] text-muted-foreground">
            {product.material}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
