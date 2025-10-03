import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { products } from "@/lib/products";
import { ArrowRight, Wrench, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const galleryImage = PlaceHolderImages.find(p => p.id === 'gallery2');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col justify-center items-center text-center p-4">
          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-xl md:text-2xl font-body font-bold text-accent tracking-widest uppercase mb-2">
                Aravalli steel pvc
            </h2>
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
              Craft Your Space, Your Way
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              Welcome to Aravalli Home Studio. Discover durable steel and versatile PVC furniture, or design your own unique pieces with our AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                  Explore Products <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/customize">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black w-full sm:w-auto">
                  Customize with AI <Wrench className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <Card className="overflow-hidden h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card">
                <CardHeader className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="link" className="text-accent text-lg hover:text-accent/90">
              View All Products <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="bg-card/80 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Why Aravalli?</h2>
              <div className="space-y-6 text-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/20 text-accent rounded-full mt-1">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI-Powered Customization</h3>
                    <p className="text-muted-foreground">Bring your vision to life. Describe your ideal furniture and let our AI generate unique designs for you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/20 text-accent rounded-full mt-1">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Stunning Gallery</h3>
                    <p className="text-muted-foreground">Get inspired by our collection of beautiful installations and product showcases.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {galleryImage && 
                <Card className="p-2 shadow-lg">
                  <div className="aspect-video relative rounded-md overflow-hidden">
                    <Image
                      src={galleryImage.imageUrl}
                      alt={galleryImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={galleryImage.imageHint}
                    />
                  </div>
                </Card>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
