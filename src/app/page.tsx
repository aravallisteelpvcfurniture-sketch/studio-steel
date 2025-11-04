'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, User, Briefcase, Calculator, HelpCircle, GalleryHorizontal, MoreHorizontal } from 'lucide-react';

const featureButtons = [
  { href: "/profile", icon: User, label: "My Account" },
  { href: "/products", icon: Briefcase, label: "Products" },
  { href: "/estimate", icon: Calculator, label: "Estimate" },
  { href: "/help-chat", icon: HelpCircle, label: "Help/Support" },
  { href: "/gallery", icon: GalleryHorizontal, label: "Gallery" },
  { href: "/more", icon: MoreHorizontal, label: "More" },
];

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
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
          <Skeleton className="h-full w-full" />
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-background min-h-screen">
      <header className="relative bg-primary h-56 text-primary-foreground p-6 rounded-b-[3rem] shadow-lg">
        <div className="flex justify-between items-center pt-4">
            <button className="text-primary-foreground">
                <Menu size={28} />
            </button>
            <Link href="/profile">
                <Avatar className="h-10 w-10 border-2 border-white/50">
                    <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt={user.displayName || ''} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
            </Link>
        </div>
        <div className="mt-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm text-primary-foreground/80">Last Update {currentDate}</p>
        </div>
      </header>
      
      <main className="-mt-10 p-6 pb-24 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {featureButtons.map((feature) => (
              <Link href={feature.href} key={feature.label}>
                <Card className="p-4 flex flex-col items-start justify-between aspect-square rounded-2xl shadow-md transition-transform hover:scale-105 hover:shadow-lg">
                    <feature.icon className="h-8 w-8 text-primary mb-4" strokeWidth={1.5} />
                    <span className="text-base font-semibold text-foreground">{feature.label}</span>
                </Card>
              </Link>
            ))}
          </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-20">
        <AppLayout><></></AppLayout>
      </div>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex flex-1 flex-col pb-20">{children}</main>
        </div>
    );
}
