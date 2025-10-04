'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

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
      <div className="w-full h-full flex-grow bg-slate-800">
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
          <Button size="sm" className="bg-gradient-to-br from-red-500 to-red-700 text-white font-bold shadow-lg rounded-full transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400 px-4 py-2">
            <Construction className="mr-2 h-4 w-4" />
            Estimate Tools
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
