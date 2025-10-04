'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Construction, Handshake, Users, ClipboardCheck, Image as ImageIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
        <Separator className="my-4 md:my-6" />
        <div className="p-4 md:p-8 pt-0 flex flex-wrap gap-4">
          <Button size="sm" className="bg-gradient-to-br from-red-500 to-red-700 text-white font-bold shadow-lg rounded-full transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400 px-4 py-2">
            <Construction className="mr-2 h-4 w-4" />
            Estimate Tools
          </Button>
          <Button size="sm" className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold shadow-lg rounded-full transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400 px-4 py-2">
            <Handshake className="mr-2 h-4 w-4" />
            Greetings
          </Button>
          <Button size="sm" className="bg-gradient-to-br from-green-500 to-green-700 text-white font-bold shadow-lg rounded-full transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400 px-4 py-2">
            <Users className="mr-2 h-4 w-4" />
            Visitors
          </Button>
          <Button size="sm" className="bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold shadow-lg rounded-full transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-400 px-4 py-2">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Order Confirm
          </Button>
          <Button size="sm" className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white font-bold shadow-lg rounded-full transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400 px-4 py-2">
            <ImageIcon className="mr-2 h-4 w-4" />
            Gallery
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
