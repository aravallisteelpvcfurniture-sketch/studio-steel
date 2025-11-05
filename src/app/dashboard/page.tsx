'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Search, SlidersHorizontal, Receipt, BookText, Notebook, Users, Smile, PackageCheck } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

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
      <header className="bg-primary text-primary-foreground p-4 h-28">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-primary/80">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-primary/80">
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <div className="bg-background rounded-t-[3rem] p-8 -mt-8 relative text-foreground">
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

        <div className="grid grid-cols-3 gap-4 text-center my-8">
          <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
            <div className="bg-accent/20 p-3 rounded-full">
                <Receipt className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">Invoice Bill</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
            <div className="bg-accent/20 p-3 rounded-full">
                <BookText className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">Roj Mel</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
            <div className="bg-accent/20 p-3 rounded-full">
                <Notebook className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">Order Book</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
            <div className="bg-accent/20 p-3 rounded-full">
                <Users className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">Visitors</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
            <div className="bg-accent/20 p-3 rounded-full">
                <Smile className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">Greetings</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
            <div className="bg-accent/20 p-3 rounded-full">
                <PackageCheck className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">Order Confirm</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
