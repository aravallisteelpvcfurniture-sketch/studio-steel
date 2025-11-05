'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Receipt, BookText, Notebook, Users, Smile, PackageCheck, Camera, BookOpen, Lightbulb, GalleryVertical, Clapperboard, Calculator } from 'lucide-react';
import { signOut } from 'firebase/auth';
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
    <div className="h-screen flex flex-col bg-primary">
      <header className="bg-primary text-primary-foreground p-4 h-28 sticky top-0 z-10">
        <div className="flex justify-between items-center pt-4">
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
      <main className="flex-grow overflow-y-auto">
        <div className="bg-background rounded-t-[4rem] p-8 -mt-8 relative text-foreground min-h-full">
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
            <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
              <div className="bg-accent/20 p-3 rounded-full">
                  <Camera className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium">Railing Photo</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
              <div className="bg-accent/20 p-3 rounded-full">
                  <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium">Furniture Catalog</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
              <div className="bg-accent/20 p-3 rounded-full">
                  <Lightbulb className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium">Furniture ideas</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
              <div className="bg-accent/20 p-3 rounded-full">
                  <GalleryVertical className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium">Railing Catalog</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
              <div className="bg-accent/20 p-3 rounded-full">
                  <Clapperboard className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium">Reels video</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
              <div className="bg-accent/20 p-3 rounded-full">
                  <Calculator className="h-8 w-8 text-accent" />
              </div>
              <span className="text-sm font-medium">Railing Estimate</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
