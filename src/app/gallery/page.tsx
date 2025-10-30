import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import placeholderImages from "@/lib/placeholder-images.json";
import Image from "next/image";

export default function GalleryPage() {
  const galleryImages = placeholderImages.galleryImages;

  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Our Creations</h1>
            <p className="text-muted-foreground mt-2">A showcase of our finest steel and PVC furniture work.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardContent className="p-0 aspect-w-1 aspect-h-1">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  data-ai-hint={image['data-ai-hint']}
                />
              </CardContent>
               <CardFooter className="p-3 bg-background/80 backdrop-blur-sm">
                <p className="text-sm font-semibold truncate">{image.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
