'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClipboardList, Handshake, Users, ClipboardCheck, Calculator, Video, GalleryVertical, Tag, BookOpen } from 'lucide-react';


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const sliderImages = [
    placeholderImages.heroSlider1,
    placeholderImages.heroSlider2,
    placeholderImages.heroSlider3,
  ];

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <AppLayout>
        <div className="flex-1 p-4 md:p-6">
          <Skeleton className="h-full w-full" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 p-4 md:p-6 space-y-6 pb-24">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-[16/7] items-center justify-center p-0 overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-full object-cover"
                      data-ai-hint={image['data-ai-hint']}
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#2563EB' }}>
                <Link href="/estimate">
                    <ClipboardList className="h-6 w-6" />
                    <span>Estimate</span>
                </Link>
            </Button>
             <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#D97706' }}>
                <Link href="/greetings">
                    <Handshake className="h-6 w-6" />
                    <span>Greetings</span>
                </Link>
            </Button>
             <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#059669' }}>
                <Link href="#">
                    <Users className="h-6 w-6" />
                    <span>Visitors</span>
                </Link>
            </Button>
            <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#be123c' }}>
                <Link href="#">
                    <ClipboardCheck className="h-6 w-6" />
                    <span>Order Confirm</span>
                </Link>
            </Button>
            <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#6d28d9' }}>
                <Link href="#">
                    <Calculator className="h-6 w-6" />
                    <span>Stairs Estimate</span>
                </Link>
            </Button>
            <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#db2777' }}>
                <Link href="#">
                    <Video className="h-6 w-6" />
                    <span>Video/Reels</span>
                </Link>
            </Button>
             <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#4f46e5' }}>
                <Link href="/gallery">
                    <GalleryVertical className="h-6 w-6" />
                    <span>Gallery</span>
                </Link>
            </Button>
             <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#e11d48' }}>
                <Link href="#">
                    <Tag className="h-6 w-6" />
                    <span>Offer</span>
                </Link>
            </Button>
             <Button asChild className="h-24 flex-col gap-2 text-sm font-semibold" style={{ backgroundColor: '#2563eb' }}>
                <Link href="/products">
                    <BookOpen className="h-6 w-6" />
                    <span>Catalog</span>
                </Link>
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
