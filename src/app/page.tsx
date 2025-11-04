
'use client';

import { useUser } from '@/firebase';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Mailbox, Map, MessageSquare, BarChart, Calendar, BookOpen, Settings, MoreHorizontal, Search } from 'lucide-react';
import NextImage from 'next/image';
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
  const { user } = useUser();

  return (
    <div className="bg-muted/40 min-h-full">
      <main className="p-6 space-y-6 z-10 relative">
          <Card className='shadow-lg border-none overflow-hidden'>
            <CardContent className='p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-purple-800 dark:text-purple-200'>Until 20 April - 30 May</p>
                    <p className='text-3xl font-bold text-purple-900 dark:text-purple-100'>30%</p>
                    <p className='text-lg font-semibold text-purple-800 dark:text-purple-200'>Discount</p>
                </div>
                 <div className="w-24 h-24 relative -mr-4 -mb-4">
                     <NextImage
                        src="https://i.ibb.co/RPd7cZ8/undraw-books-re-8ptw-1.png"
                        alt="Discount illustration"
                        width={120}
                        height={120}
                        className="object-contain"
                    />
                 </div>
            </CardContent>
          </Card>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search For..."
                className="w-full rounded-full bg-card pl-12 h-14 shadow-sm border-none"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">What do you need?</h2>
            <div className="grid grid-cols-4 gap-4">
              {featureButtons.map((feature) => (
                <Link href={feature.href} key={feature.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center">
                         <feature.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />
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
