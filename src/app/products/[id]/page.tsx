import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wand2 } from 'lucide-react';
import Link from 'next/link';
import { SimilarProducts } from '@/components/similar-products';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { Card } from '@/components/ui/card';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* Image Gallery */}
        <div className="sticky top-24">
          <Card className="overflow-hidden shadow-lg">
            <div className="aspect-square relative">
              <Image
                src={product.image.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-ai-hint={product.image.imageHint}
              />
            </div>
          </Card>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary">{product.material}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mt-4">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <AddToCartButton />
            <Link href={`/customize?type=${product.type}`} className='w-full sm:w-auto'>
              <Button variant="outline" size="lg" className="w-full">
                <Wand2 className="mr-2" />
                Customize this Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* AI Recommendations */}
      <SimilarProducts currentProduct={product} />
    </div>
  );
}
