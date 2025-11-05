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

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in-up">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
                className="w-16 h-16 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M9.17157 14.8284C10.7337 16.3905 13.2663 16.3905 14.8284 14.8284L17.6569 12L12 6.34315L6.34315 12L9.17157 14.8284Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12H4.5M19.5 12H22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2V3.5M12 20.5V22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-wider">Aravalli Steel</h1>
          <p className="text-sm tracking-widest">PVC Furniture</p>
        </div>
      </main>
    </div>
  );
}
