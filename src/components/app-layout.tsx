'use client';

import type { ReactNode } from 'react';
import BottomNav from './bottom-nav';
import { usePathname } from 'next/navigation';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

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
