'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mailbox, Map, MessageSquare, BarChart, Calendar, BookOpen, Settings, MoreHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const featureButtons = [
  { href: "#", icon: Mailbox, label: "Inbox" },
  { href: "#", icon: Map, label: "Maps" },
  { href: "/help-chat", icon: MessageSquare, label: "Chats" },
  { href: "#", icon: BarChart, label: "Report" },
  { href: "#", icon: Calendar, label: "Calendar" },
  { href: "/more", icon: BookOpen, label: "Tips" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/more", icon: MoreHorizontal, label: "More" },
];

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
          <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="relative bg-gradient-to-r from-purple-700 to-fuchsia-600 h-40 text-primary-foreground p-6">
        <div className="flex justify-between items-center pt-4">
            <div className='flex flex-col'>
                <h1 className="text-2xl font-bold">Good morning {user.displayName?.split(' ')[0] || 'User'}</h1>
            </div>
            <Link href="/profile">
                <Avatar className="h-12 w-12 border-2 border-white/50">
                    <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt={user.displayName || ''} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
            </Link>
        </div>
      </header>
      
      <main className="p-6 space-y-6">
          <Card className='-mt-20 shadow-lg border-none'>
            <CardContent className='p-4 bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-lg flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-purple-800'>Until 20 April - 30 May</p>
                    <p className='text-3xl font-bold text-purple-900'>30%</p>
                    <p className='text-lg font-semibold text-purple-800'>Discount</p>
                </div>
                 <div className="w-24 h-24 relative">
                    {/* Placeholder for illustration */}
                     <Image
                        src="https://i.ibb.co/RPd7cZ8/undraw-books-re-8ptw-1.png"
                        alt="Discount illustration"
                        width={96}
                        height={96}
                        className="object-contain"
                    />
                 </div>
            </CardContent>
          </Card>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search For..."
                className="w-full rounded-full bg-card pl-10 h-12 shadow-sm border"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">What do you need?</h2>
            <div className="grid grid-cols-4 gap-4">
              {featureButtons.map((feature) => (
                <Link href={feature.href} key={feature.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-16 h-16 bg-fuchsia-100 rounded-2xl flex items-center justify-center">
                         <feature.icon className="h-8 w-8 text-fuchsia-600" strokeWidth={1.5} />
                    </div>
                  <span className="text-sm font-medium text-muted-foreground">{feature.label}</span>
                </Link>
              ))}
            </div>
          </div>
      </main>
    </div>
  );
}
