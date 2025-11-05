'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/categories', icon: LayoutGrid, label: 'Categories' },
  { href: '/dashboard/profile', icon: User, label: 'Account' },
  { href: '/dashboard/more', icon: MoreHorizontal, label: 'More' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <div
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground w-20 h-full',
                pathname === item.href && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
