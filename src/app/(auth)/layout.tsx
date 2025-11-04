import type { ReactNode } from 'react';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <header className="bg-background border-b p-4 flex items-center justify-center space-x-3">
             <Image 
                src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                alt="Aravalli Logo"
                width={40}
                height={40}
                className="rounded-full"
            />
            <h1 className="text-xl font-bungee">
              <span className="font-bold text-destructive">Aravalli</span><span className="font-bold text-foreground">Steel</span>
            </h1>
        </header>
        <main className="flex-grow flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md">
                {children}
            </div>
        </main>
    </div>
  );
}
