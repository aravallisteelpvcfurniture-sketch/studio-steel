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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-t from-blue-600 to-blue-500 text-white rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        <div className="container flex h-20 max-w-screen-2xl items-center">
          <div className="flex w-full items-center justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center transition-transform duration-300 ease-in-out',
                    isActive ? 'scale-110 -translate-y-2' : 'hover:scale-105'
                  )}
                >
                  <div className={cn(
                      "flex items-center justify-center rounded-full transition-all duration-300 ease-in-out h-14 w-14",
                      isActive ? "bg-white/20 shadow-lg" : ""
                  )}>
                      <item.icon className={cn("h-7 w-7", isActive ? "text-white" : "text-blue-100/80")} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
