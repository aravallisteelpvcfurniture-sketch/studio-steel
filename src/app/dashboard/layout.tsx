'use client';

import BottomNav from '@/components/BottomNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const showBottomNav = pathname !== '/dashboard/invoice';

  return (
    <div className="relative min-h-screen">
      <main className={showBottomNav ? "pb-20 md:pb-0" : ""}>{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
