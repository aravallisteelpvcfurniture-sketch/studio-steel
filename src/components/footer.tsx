import Link from 'next/link';
import { Mountain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card/80 border-t mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center gap-2">
            <Mountain className="h-7 w-7 text-primary" />
            <span className="text-lg font-headline font-bold">Aravalli Home Studio</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Aravalli Home Studio. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/products" className="text-sm hover:text-primary transition-colors">Products</Link>
            <Link href="/gallery" className="text-sm hover:text-primary transition-colors">Gallery</Link>
            <Link href="/customize" className="text-sm hover:text-primary transition-colors">Customize</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
