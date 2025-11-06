'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signup');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="w-48 h-48 relative mb-4 animate-fade-in-up">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M50 5 L95 95 H5 Z" fill="none" stroke="currentColor" strokeWidth="5" />
            <path d="M27 65 L73 65" fill="none" stroke="currentColor" strokeWidth="5" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-wider animate-fade-in-up animation-delay-[500ms]">ARAVALLI</h1>
        <p className="text-lg text-white/80 tracking-widest animate-fade-in-up animation-delay-[700ms]">STEEL & PVC FURNITURE</p>
      </main>
    </div>
  );
}
