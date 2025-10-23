'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <AppLayout>
        <div className="flex-1 p-4 md:p-6">
          <Skeleton className="h-full w-full" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 p-4 md:p-6">
        {/* Dashboard content has been removed as requested. */}
      </div>
    </AppLayout>
  );
}
