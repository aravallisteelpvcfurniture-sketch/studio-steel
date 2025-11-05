'use client';
import { Button } from '@/components/ui/button';
import { ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <header className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-yellow-500">RideCab</div>
        <button className="rounded-full bg-gray-100 p-2">
          <User className="h-6 w-6 text-gray-600" />
        </button>
      </header>
      <main className="flex-1 flex flex-col items-start justify-center p-8 space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Find your dream taxi to start your journey
        </h1>
        <div className="relative w-full h-64">
           <Image
            src="https://picsum.photos/seed/yellow-car/800/600"
            alt="Yellow cab"
            fill
            className="object-contain"
            data-ai-hint="yellow car"
          />
        </div>
      </main>
      <footer className="p-4">
         <div className="flex items-center justify-between rounded-full bg-yellow-400 p-2">
           <button className="p-3 rounded-full bg-yellow-500 text-white">
             <User size={24} />
           </button>
           <Link href="#" className="text-lg font-semibold text-white">
            Get Started
           </Link>
           <button className="p-3 rounded-full bg-yellow-500 text-white">
             <ChevronRight size={24} />
           </button>
         </div>
       </footer>
    </div>
  );
}
