'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LogOut, User as UserIcon, Settings, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth, useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const AUTH_PATHNAMES = ['/login', '/signup'];

export default function Header() {
  const { user, isUserLoading } = useUser({ disableRedirect: true });
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    if (auth) {
        auth.signOut().then(() => {
            router.push('/login');
        });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length > 1 && nameParts[1]) {
        return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  }

  const isAuthPage = AUTH_PATHNAMES.includes(pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center bg-background/95 backdrop-blur-sm px-4 border-b">
        <div className="flex items-center space-x-2">
           <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                 <Image 
                    src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
                    alt="Aravalli Logo"
                    width={40}
                    height={40}
                    className="rounded-full p-1"
                />
            </div>
             <h1 className="text-xl font-bungee">
              <span className="font-bold text-destructive">Aravalli</span><span className="font-bold text-foreground">Steel</span>
            </h1>
          </Link>
        </div>

        <div className={cn("flex flex-1 items-center justify-end space-x-2")}>
            {user && (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                            <Avatar className="h-10 w-10 border-2 border-primary/50">
                                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User'} />
                                <AvatarFallback className="bg-muted text-muted-foreground">
                                    {getInitials(user.displayName)}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>
                            <p className="font-semibold truncate">{user.displayName}</p>
                            <p className="text-xs text-muted-foreground font-normal truncate">{user.email}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem onClick={() => router.push('/profile')}>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/profile/edit')}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    </header>
  );
}
