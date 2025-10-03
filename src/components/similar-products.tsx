import { recommendSimilarFurniture } from '@/ai/flows/recommend-similar-furniture';
import { Product } from '@/lib/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export async function SimilarProducts({ currentProduct }: { currentProduct: Product }) {
  // In a real app, userId would come from session/auth.
  // The AI flow is mocked, so the user ID is just for demonstration.
  const recommendations = await recommendSimilarFurniture({ userId: 'user-123' });

  // Filter out the current product from recommendations if it appears
  const filteredRecommendations = recommendations.filter(rec => rec.itemId !== currentProduct.id).slice(0, 5);

  if (filteredRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 md:mt-24">
      <h2 className="text-2xl md:text-3xl font-headline font-bold mb-8">You Might Also Like</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {filteredRecommendations.map((item, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card group">
                  <Link href={`/products/${item.itemId}`}>
                    <div className="aspect-square relative bg-muted">
                       <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint="furniture piece"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-md truncate">{item.name}</h3>
                      <p className="text-muted-foreground text-sm truncate">{item.description}</p>
                      <p className="font-semibold text-primary mt-2">${item.price}</p>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
