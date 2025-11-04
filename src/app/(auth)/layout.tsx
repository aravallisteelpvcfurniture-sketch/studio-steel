import type { ReactNode } from 'react';
import Image from 'next/image';
import { Wave } from '@/components/ui/wave';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <header className="relative bg-gradient-to-r from-purple-600 to-fuchsia-500 text-primary-foreground py-10 px-6 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
                        <Image 
                            src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                            alt="Aravalli Logo"
                            width={60}
                            height={60}
                            className="rounded-full p-1"
                        />
                    </div>
                </div>
                <h1 className="text-2xl font-bold tracking-wider">
                  <span className="font-bungee text-white">Aravalli</span> <span className="font-bungee text-white/90">Steel</span>
                </h1>
            </div>
            <Wave className="text-muted/40" />
        </header>
        <main className="flex-grow flex items-center justify-center p-4 md:p-8 -mt-8">
            <div className="w-full max-w-md z-10">
                {children}
            </div>
        </main>
    </div>
  );
}
