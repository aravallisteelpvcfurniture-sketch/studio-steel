'use client';
import { Button } from '@/components/ui/button';
import { ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="relative h-screen w-full bg-background flex flex-col overflow-hidden">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-primary">RideCab</h1>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 z-10">
        <div className="max-w-md">
          <h2 className="text-5xl font-bold leading-tight text-foreground">
            Find your dream taxi to start your journey
          </h2>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 h-3/5">
        <div className="relative w-full h-full">
          <Image
            src="https://picsum.photos/seed/1/800/1200"
            alt="Yellow Taxi"
            layout="fill"
            objectFit="cover"
            className="translate-x-1/4"
            data-ai-hint="yellow car"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
      </div>
      
      <footer className="w-full p-6 z-10">
        <Link href="/login" passHref>
          <Button
            className="w-full h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-between px-8"
          >
            <User className="w-6 h-6" />
            <span className="text-xl font-semibold">Get Started</span>
            <div className="flex items-center">
              <ChevronRight className="w-6 h-6" />
              <ChevronRight className="w-6 h-6 -ml-4" />
              <ChevronRight className="w-6 h-6 -ml-4" />
            </div>
          </Button>
        </Link>
      </footer>
    </div>
  );
}
