import type { ReactNode } from 'react';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen w-full bg-primary overflow-hidden relative">
      {/* Top Section (Header) */}
      <div className="absolute top-0 left-0 right-0 h-[35%] flex flex-col items-center justify-center text-primary-foreground p-4 space-y-4">
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
      </div>

      {/* Bottom Section (Form) */}
      <main className="absolute bottom-0 left-0 right-0 h-[65%] bg-card text-card-foreground rounded-t-[2.5rem] overflow-y-auto">
        <div className="p-8 h-full">
            {children}
        </div>
      </main>
    </div>
  );
}
