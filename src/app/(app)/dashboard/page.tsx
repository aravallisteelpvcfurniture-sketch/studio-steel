import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-lg">
            Crafting Dreams, Building Futures
          </h1>
          <p className="mt-4 max-w-xl md:max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow-md">
            Welcome to Aravalli Home Studio, where we blend robust steel with versatile PVC to create furniture that's not just beautiful, but built to last.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="bg-white/90 text-black hover:bg-white">
                Explore Collection
              </Button>
            </Link>
            <Link href="/customize">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Design Your Own
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
