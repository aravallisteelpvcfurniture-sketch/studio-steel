'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Mailbox, Map, MessageSquare, BarChart2, Calendar, Book, Settings, Grid } from 'lucide-react';
import { Wave } from '@/components/ui/wave';
import { Input } from '@/components/ui/input';

const featureButtons = [
  { href: "/estimate", icon: Mailbox, label: "Inbox", color: "bg-pink-100 dark:bg-pink-900/50", textColor: "text-pink-600 dark:text-pink-300" },
  { href: "/gallery", icon: Map, label: "Maps", color: "bg-blue-100 dark:bg-blue-900/50", textColor: "text-blue-600 dark:text-blue-300" },
  { href: "/help-chat", icon: MessageSquare, label: "Chats", color: "bg-green-100 dark:bg-green-900/50", textColor: "text-green-600 dark:text-green-300" },
  { href: "#", icon: BarChart2, label: "Report", color: "bg-yellow-100 dark:bg-yellow-900/50", textColor: "text-yellow-600 dark:text-yellow-300" },
  { href: "#", icon: Calendar, label: "Calendar", color: "bg-purple-100 dark:bg-purple-900/50", textColor: "text-purple-600 dark:text-purple-300" },
  { href: "#", icon: Book, label: "Tips", color: "bg-indigo-100 dark:bg-indigo-900/50", textColor: "text-indigo-600 dark:text-indigo-300" },
  { href: "/settings", icon: Settings, label: "Settings", color: "bg-red-100 dark:bg-red-900/50", textColor: "text-red-600 dark:text-red-300" },
  { href: "/more", icon: Grid, label: "More", color: "bg-teal-100 dark:bg-teal-900/50", textColor: "text-teal-600 dark:text-teal-300" },
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

  return (
    <div className="bg-muted min-h-screen">
      <header className="relative bg-primary h-48 text-primary-foreground p-6">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Good morning {user.displayName?.split(' ')[0] || 'Alex'}</h1>
            </div>
            <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt={user.displayName || ''} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-auto text-muted" />
      </header>
      
      <main className="-mt-12 p-4 pb-24 space-y-6">
        <Card className="rounded-2xl shadow-lg border-none overflow-hidden">
          <CardContent className="p-0 flex items-center bg-purple-500 text-white">
            <div className="p-6 space-y-2 flex-1">
              <p className="text-sm font-light">Until 20 April - 30 May</p>
              <p className="text-4xl font-bold">30%</p>
              <p className="font-semibold">Discount</p>
            </div>
            <div className="relative w-32 h-32 mr-4">
              <Image 
                src="https://res.cloudinary.com/dsgirle5v/image/upload/v1761066914/reading-book_1_kmb3cr.png" 
                alt="Discount illustration" 
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search For..." 
            className="w-full h-14 rounded-full pl-12 pr-4 text-base bg-background shadow-sm"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">What do you need?</h2>
          <div className="grid grid-cols-4 gap-4">
            {featureButtons.map((feature) => (
              <Link href={feature.href} key={feature.label} className="flex flex-col items-center space-y-2 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color}`}>
                      <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{feature.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 h-20">
        <AppLayout><></></AppLayout>
      </div>
    </div>
  );
}
