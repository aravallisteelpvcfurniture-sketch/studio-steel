'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, Scan, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/gallery', label: 'Catalogue', icon: Folder },
  { href: '/scan', label: 'Scan', icon: Scan },
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
                    "text-xs mt-0.5",
                    isActive ? "text-primary font-bold" : "text-gray-500"
                )}>
                    {/* {item.label} Commenting out label as per design */}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
