"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Image
        src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760021643/aravalli-removebg-preview_h79b1w.png"
        alt="Aravalli Steel PVC Logo"
        width={200}
        height={200}
        priority
      />
    </main>
  );
}
