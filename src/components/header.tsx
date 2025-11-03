'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth, useUser } from '@/firebase';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Bell, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Header() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    if (auth) {
      auth.signOut();
      router.push('/auth');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 bg-primary text-primary-foreground rounded-xl shadow-lg">
        <div className="flex items-center space-x-2">
           <Link href="/" className="flex items-center space-x-2">
            <Image
                src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                alt="Aravalli Logo"
                width={32}
                height={32}
                className="rounded-full"
            />
            <span className="text-lg font-bold tracking-tight">ARAVALLI</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
                <Input
                placeholder="Search..."
                className="w-full rounded-full bg-primary/80 text-primary-foreground placeholder:text-primary-foreground/70 pl-9 h-9 border-0 focus-visible:ring-ring"
                />
            </div>
           <Button variant="secondary" size="sm" className="hidden sm:inline-flex h-9">
             Check In
           </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-primary/80">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <p className="font-semibold">New Estimate Request</p>
                    <p className="text-xs text-muted-foreground">You have a new estimate request from John Doe.</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <p className="font-semibold">Order Confirmed</p>
                    <p className="text-xs text-muted-foreground">Your order #12345 has been confirmed.</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <p className="font-semibold">New Message</p>
                    <p className="text-xs text-muted-foreground">You have a new message in the help chat.</p>
                  </div>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem className="justify-center text-sm text-primary hover:!text-primary">
                    View all notifications
                 </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
                <Link href="/profile">
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-primary/80">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User'} />
                            <AvatarFallback className="bg-secondary text-secondary-foreground">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </Link>
            )}
        </div>
      </div>
    </header>
  );
}
