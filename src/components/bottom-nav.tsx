'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const ScanIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="container flex h-16 max-w-md mx-auto items-center">
        <div className="flex w-full items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.href === '/scan') {
                 return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center"
                    >
                        <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center -translate-y-4 border-4 border-background shadow-lg">
                             <item.icon />
                        </div>
                    </Link>
                 )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              >
                <div className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300 relative h-10 w-10",
                )}>
                    {isActive ? (
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                             <item.icon className="h-6 w-6 text-white" />
                        </div>
                    ) : (
                        <item.icon className="h-6 w-6 text-gray-400" />
                    )}
                </div>
                <span className={cn(
                    "text-xs mt-0.5 sr-only",
                    isActive ? "text-primary font-bold" : "text-gray-500"
                )}>
                    {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
