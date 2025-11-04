'use client';

import type { ReactNode } from 'react';
import BottomNav from './bottom-nav';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

type AppLayoutProps = {
  children: ReactNode;
};

const AUTH_PATHNAMES = ['/login', '/signup'];

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  // If we are on an auth page, don't render the main layout
  if (AUTH_PATHNAMES.includes(pathname) || pathname.startsWith('/auth')) {
    return <>{children}</>;
  }

  // If the user state is still loading, show a loader
  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // Don't render the main layout on the dashboard page
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
