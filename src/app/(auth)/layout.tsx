import type { ReactNode } from 'react';
import { Wave } from '@/components/ui/wave';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
        <header className="relative h-56 bg-primary flex flex-col items-center justify-center text-center p-4">
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-2">
                 <Image 
                    src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                    alt="Aravalli Logo"
                    width={64}
                    height={64}
                    className="rounded-full"
                />
            </div>
            <h1 className="text-3xl font-bungee text-foreground">
              Aravalli<span className="font-extrabold">Steel</span>
            </h1>
            <Wave className="text-background" />
        </header>
        <main className="flex-grow px-6 pt-8 pb-8 z-10">
            {children}
        </main>
    </div>
  );
}
