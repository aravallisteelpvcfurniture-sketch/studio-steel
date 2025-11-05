'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-primary text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="mb-8">
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

      <footer className="relative z-10 w-full p-8 flex justify-center">
        <Link href="/signup" passHref>
          <Button
            size="lg"
            variant="ghost"
            className="w-16 h-16 rounded-full bg-accent hover:bg-accent/90"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </Button>
        </Link>
      </footer>
    </div>
  );
}
