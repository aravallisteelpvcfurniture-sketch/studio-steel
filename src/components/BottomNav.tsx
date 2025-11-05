'use client';

import Link from 'next/link';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/categories', icon: LayoutGrid, label: 'Categories' },
  { href: '/favorites', icon: Heart, label: 'Favorites' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background border-t shadow-lg md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label} className={cn(
            "flex flex-col items-center justify-center gap-1 text-muted-foreground w-1/4",
            pathname === item.href && "text-primary"
          )}>
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
