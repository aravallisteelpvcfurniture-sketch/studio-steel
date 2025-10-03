'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const heroImage = placeholderImages.dashboardHero;

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="relative h-64 md:h-96">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            data-ai-hint={heroImage['data-ai-hint']}
            priority
          />
        </div>
        <div className="p-4 md:p-8">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to your Dashboard</h2>
          {/* You can add more dashboard content here */}
        </div>
      </div>
    </AppLayout>
  );
}
