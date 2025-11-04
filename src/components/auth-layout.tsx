import type { ReactNode } from 'react';
import { Wave } from './ui/wave';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex flex-col bg-background">
        <header className="relative h-48 bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex flex-col items-center justify-center text-center p-4">
            <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center mb-2 shadow-lg">
                 <Image 
                    src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                    alt="Aravalli Logo"
                    width={80}
                    height={80}
                    className="rounded-full"
                />
            </div>
            <h1 className="text-2xl font-bold text-shadow-lg" style={{fontFamily: 'Bungee, sans-serif'}}>Aravalli Steel</h1>
            <Wave className="text-background" />
        </header>
        <main className="flex-grow px-6 pb-8 z-10 -mt-8">
            {children}
        </main>
    </div>
  );
}
