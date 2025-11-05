import { ArrowRight, Lock, User } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-500">aravallisteelpvcfurniture</h1>
        <div className="flex items-center space-x-2">
          <User size={20} />
          <Lock size={20} />
        </div>
      </header>
      <main className="flex-grow flex flex-col justify-center px-6">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Find your dream taxi to start your journey
          </h2>
        </div>
        <div className="mt-8 relative w-full h-64">
           <Image
            src="https://picsum.photos/seed/1/800/600"
            alt="Yellow Taxi"
            fill
            className="object-contain"
            data-ai-hint="yellow car"
           />
        </div>
        <div className="mt-auto pb-8">
            <button className="w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-full flex items-center justify-center text-lg">
                Get Started <ArrowRight className="ml-2" />
            </button>
        </div>
      </main>
    </div>
  );
}
