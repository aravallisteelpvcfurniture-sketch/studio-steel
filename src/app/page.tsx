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
      <div className="flex-1 p-4 md:p-6 space-y-6">
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
      </div>
    </AppLayout>
  );
}
