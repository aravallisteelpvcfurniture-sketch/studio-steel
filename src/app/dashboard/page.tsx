'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Search, SlidersHorizontal } from 'lucide-react';
import { signOut } from 'firebase/auth';
import BottomNav from '@/components/BottomNav';
import { Input } from '@/components/ui/input';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    if (auth) {
      signOut(auth);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-primary">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 pb-24">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut />
            </Button>
          </div>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 h-12 rounded-xl bg-muted border-muted"
          />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Here's your dashboard content.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
