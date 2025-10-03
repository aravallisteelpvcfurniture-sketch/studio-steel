import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">Our Collection</h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Browse our curated selection of high-quality steel and PVC furniture, built to last and designed to impress.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <Card className="overflow-hidden h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card">
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={product.image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    data-ai-hint={product.image.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{product.material}</p>
                <p className="font-semibold text-primary mt-2 text-lg">${product.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
