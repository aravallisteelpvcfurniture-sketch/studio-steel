'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, MessageCircle, ImageIcon, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/help-chat', label: 'Help Chat', icon: MessageCircle },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-slate-800 md:hidden">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex w-full items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center text-sm font-medium transition-colors h-12 w-16 rounded-full',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <div className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300 ease-in-out",
                    isActive ? "bg-primary/20 h-8 w-12" : "h-8 w-8"
                )}>
                    <item.icon className="h-5 w-5" />
                </div>
                <span className="mt-1 text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
