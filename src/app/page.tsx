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
            >
              <path
                d="M19.333 10.3333H2.66667C2.48986 10.3333 2.32029 10.263 2.19526 10.138C2.07024 10.013 2 9.84347 2 9.66667C2 8.56 2.89543 7.66667 4 7.66667H20C21.1046 7.66667 22 8.56 22 9.66667C22 9.84347 21.9298 10.013 21.8047 10.138C21.6797 10.263 21.5101 10.3333 21.3333 10.3333H20M6 13.6667H4V12H6V13.6667ZM9 13.6667H7V12H9V13.6667ZM12 13.6667H10V12H12V13.6667ZM19.3333 10.3333L18 17.6667H6L4.66667 10.3333H19.3333Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-wider">FOODCORT</h1>
          <p className="text-sm tracking-widest">FOOD DELIVER SERVICE</p>
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
