'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth, useUser } from '@/firebase';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Bell, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Header() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4">
        <div className="flex items-center space-x-2">
           <Link href="/" className="flex items-center space-x-2">
            <Image
                src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                alt="Aravalli Logo"
                width={40}
                height={40}
                className="rounded-full"
            />
            <span className="text-xl font-bold text-foreground">ARAVALLI</span>
          </Link>
        </div>

        <div className="flex-1 justify-center px-4 hidden md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full rounded-full bg-muted pl-10"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2">
           <Button variant="outline" size="sm" className="hidden sm:inline-flex">
             Check In
           </Button>
           <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted">
             <Bell className="h-6 w-6" />
           </Button>
        </div>
      </div>
    </header>
  );
}
