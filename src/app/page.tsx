import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-black text-white">
      <Image
        src="https://picsum.photos/seed/welcome/1200/1800"
        alt="Modern furniture"
        fill
        className="object-cover opacity-50"
        data-ai-hint="modern furniture"
      />
      <div className="relative z-10 p-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tighter">aravallisteelpvcfurniture</h1>
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
          Find Your <br />
          Dream Furniture
        </h2>
        <p className="max-w-md text-lg text-gray-300 mb-10">
          We help you find the best furniture for your home, so you can live in comfort and style.
        </p>
        <div className="w-full max-w-sm">
          <Link href="/signup" passHref>
            <Button size="lg" className="w-full mb-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Sign Up
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button size="lg" variant="outline" className="w-full bg-transparent border-accent text-accent hover:bg-accent/10">
              Sign In
            </Button>
          </Link>
        </div>
      </main>
      <footer className="relative z-10 p-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} aravallisteelpvcfurniture
      </footer>
    </div>
  );
}
