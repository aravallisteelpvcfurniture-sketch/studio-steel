import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-card/80 border-t mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Aravalli Steel Logo" width={140} height={35} className="h-9 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Aravalli Steel. All rights reserved.</p>
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
