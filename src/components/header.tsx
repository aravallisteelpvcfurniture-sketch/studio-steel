'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { User as UserIcon, LogOut, Bell } from 'lucide-react';

export default function Header() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/auth');
  };

  const getInitials = (email?: string | null) => {
    return email ? email.charAt(0).toUpperCase() : <UserIcon />;
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-slate-800">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
              alt="Aravalli Steel PVC"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold">Aravalli Steel PVC</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push('/auth')}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
