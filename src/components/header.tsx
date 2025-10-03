'use client';

import Link from 'next/link';
import { Menu, Home, ShoppingBasket, Wrench, GalleryVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home /> },
  { href: '/products', label: 'Products', icon: <ShoppingBasket /> },
  { href: '/customize', label: 'Customize', icon: <Wrench /> },
  { href: '/gallery', label: 'Gallery', icon: <GalleryVertical /> },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <div className="relative h-10 w-40">
              <Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759490183/image-2_asr8zs.jpg" alt="Aravalli Steel Logo" fill objectFit="contain" />
            </div>
            <span className="font-headline text-lg font-bold tracking-wide">Aravalli steel pvc</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Sign Up
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-6 pt-10">
                  <Link href="/" className="flex flex-col items-center gap-2 mb-4" onClick={() => setIsMenuOpen(false)}>
                     <div className="relative h-10 w-40">
                        <Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759490183/image-2_asr8zs.jpg" alt="Aravalli Steel Logo" layout="fill" objectFit="contain" />
                     </div>
                     <span className="font-headline text-lg font-bold tracking-wide">Aravalli steel pvc</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-4 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <div className="border-t pt-6 space-y-4">
                    <Link href="/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/signup" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
