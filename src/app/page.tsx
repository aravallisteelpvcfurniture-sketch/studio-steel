
'use client';

import { useUser } from '@/firebase';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mailbox, Map, MessageSquare, BarChart, Calendar, BookOpen, Settings, MoreHorizontal, Search } from 'lucide-react';
import NextImage from 'next/image';
import { Input } from '@/components/ui/input';
import { Wave } from '@/components/ui/wave';

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
  const { user } = useUser();

  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    return 'User';
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="relative bg-primary h-56 text-primary-foreground p-6 flex flex-col justify-start pt-12">
        <div className="absolute top-6 right-6">
            <Link href="/profile">
                <Avatar className="h-12 w-12 border-2 border-white/50">
                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
            </Link>
        </div>
        <div className="text-left">
            <h1 className="text-3xl font-bold">Welcome,</h1>
            <p className="text-lg">{getFirstName()}</p>
        </div>
        <Wave className="text-background" />
      </header>
      
      <main className="p-6 space-y-6 -mt-16 z-10 relative">
          <Card className='shadow-lg border-none'>
            <CardContent className='p-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-cyan-800 dark:text-cyan-200'>Until 20 April - 30 May</p>
                    <p className='text-3xl font-bold text-cyan-900 dark:text-cyan-100'>30%</p>
                    <p className='text-lg font-semibold text-cyan-800 dark:text-cyan-200'>Discount</p>
                </div>
                 <div className="w-24 h-24 relative">
                     <NextImage
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
                    <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/50 rounded-2xl flex items-center justify-center">
                         <feature.icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" strokeWidth={1.5} />
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
