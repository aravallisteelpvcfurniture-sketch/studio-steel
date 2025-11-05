import type { ReactNode } from 'react';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-primary">
      <header className="flex flex-col items-center justify-center text-primary-foreground p-8 space-y-4">
        <div className="w-24 h-24 rounded-full bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm">
          <Image
            src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
            alt="Aravalli Logo"
            width={80}
            height={80}
            className="rounded-full p-1"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wider font-bungee">
            Aravalli Steel
          </h1>
          <p className="text-sm text-primary-foreground/80 tracking-widest">
            PVC FURNITURE
          </p>
        </div>
      </header>
      <main className="absolute bottom-0 left-0 right-0 h-[65%]">
        <div className="bg-card text-card-foreground rounded-t-[2.5rem] h-full w-full p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
