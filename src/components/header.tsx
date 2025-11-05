'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LogOut, User as UserIcon, Settings, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth, useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Wave } from './ui/wave';
import { Skeleton } from './ui/skeleton';

const AUTH_PATHNAMES = ['/login', '/signup'];
const GRADIENT_HEADER_PAGES = ['/', '/profile'];

const MainAppHeader = () => {
    const { user, isUserLoading } = useUser({ disableRedirect: true });
    const router = useRouter();

    if (isUserLoading) {
        return (
            <div className="p-6 flex justify-between items-center">
                <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-14 w-14 rounded-full" />
            </div>
        )
    }

    if (!user) return null;

    return (
        <div className="p-6 flex justify-between items-center">
            <div>
                <p className="text-muted-foreground font-medium">Welcome</p>
                <h1 className="text-2xl font-bold text-foreground truncate max-w-[200px]">{user.displayName || 'User'}</h1>
            </div>
             <Avatar className="h-14 w-14 border-2 border-background shadow-md" onClick={() => router.push('/profile')}>
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                    {user.displayName?.charAt(0) || 'A'}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}


export default function Header() {
  const { user, isUserLoading } = useUser({ disableRedirect: true });
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = AUTH_PATHNAMES.includes(pathname);
  const isGradientHeaderPage = GRADIENT_HEADER_PAGES.includes(pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all",
        isGradientHeaderPage 
            ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-primary-foreground' 
            : 'bg-background/95 backdrop-blur-sm border-b'
    )}>
        {isGradientHeaderPage ? (
            <div className="relative pt-safe-top">
                <MainAppHeader />
                <Wave className="text-background" />
            </div>
        ) : (
             <div className="flex h-16 items-center px-4 pt-safe-top">
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
                         <Avatar className="h-10 w-10 border-2 border-primary/50" onClick={() => router.push('/profile')}>
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                                {user.displayName?.charAt(0) || 'A'}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        )}
    </header>
  );
}
