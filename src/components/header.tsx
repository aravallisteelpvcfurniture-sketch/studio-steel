'use client';

import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { LogOut, Bell } from 'lucide-react';

export default function Header() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Welcome!</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-2">
           <Button variant="secondary" size="sm" className="bg-white/90 text-primary-dark font-semibold hover:bg-white">
             Check In
           </Button>
           <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
             <Bell className="h-6 w-6" />
           </Button>
        </div>
      </div>
    </header>
  );
}
