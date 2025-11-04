'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

const ScanIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7V4H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 17V20H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 4H20V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 20H20V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/gallery', label: 'Catalogue', icon: Folder },
  { href: '/scan', label: 'Scan', icon: ScanIcon },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/more', label: 'More', icon: MoreHorizontal },
];

const AUTH_PATHNAMES = ['/login', '/signup'];

export default function BottomNav() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser({ disableRedirect: true });

  if (isUserLoading || !user || AUTH_PATHNAMES.includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full">
      <div className="bg-background/95 backdrop-blur-lg border-t h-16 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.href === '/scan') {
                 return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center text-white -translate-y-4"
                        aria-label={item.label}
                    >
                        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-xl transform transition-transform hover:scale-110">
                             <item.icon />
                        </div>
                    </Link>
                 )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "flex flex-col items-center justify-center gap-1 transition-colors w-16",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className={cn(
                    "text-xs font-medium",
                     isActive ? "font-bold" : ""
                )}>
                    {item.label}
                </span>
              </Link>
            );
          })}
      </div>
    </nav>
  );
}
