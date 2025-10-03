import {
  Card
} from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery'));
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">Inspiration Gallery</h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        See how our furniture transforms spaces. Explore real-life installations and discover ideas for your own home.
      </p>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="break-inside-avoid">
             <Card className="overflow-hidden group">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
             </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
