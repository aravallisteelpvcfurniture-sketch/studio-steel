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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white rounded-full animate-pulse-slow delay-1000"></div>
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
        <div className="w-32 h-32 relative mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L10 90H25L50 40L75 90H90L50 10Z" fill="currentColor"/>
            <path d="M35 70H65" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="animate-fade-in-up animation-delay-1000">
          <h1 className="text-4xl font-bold tracking-wider">ARAVALLI</h1>
          <p className="text-sm tracking-widest">STEEL & PVC FURNITURE</p>
        </div>
      </main>
    </div>
  );
}
