'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';

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
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="flex justify-between items-center p-4 text-white">
        <h1 className="text-xl font-bold">Welcome, {user.displayName || user.email}</h1>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut />
        </Button>
      </div>
      <div className="bg-background rounded-t-[3rem] p-8 pt-12 mt-4 min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Here's your dashboard content.</p>
        </div>
        {/* You can add more dashboard components and content here */}
      </div>
    </div>
  );
}
