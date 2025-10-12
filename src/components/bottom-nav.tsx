'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const ScanIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 3H19C20.1046 3 21 3.89543 21 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21H5C3.89543 21 3 20.1046 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 21H19C20.1046 21 21 20.1046 21 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/files', label: 'Files', icon: Folder },
  { href: '/scan', label: 'Scan', icon: ScanIcon },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/more', label: 'More', icon: MoreHorizontal },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex w-full items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              >
                <div className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300",
                    isActive ? "bg-green-500 h-10 w-10" : "h-8 w-8"
                )}>
                    <item.icon className={cn("h-6 w-6", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
