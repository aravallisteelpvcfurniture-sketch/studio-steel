'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Handshake, Users, ClipboardCheck, Brush, Trophy, BookOpen, User, HardHat } from 'lucide-react';
import Link from 'next/link';

// Custom SVG Icons to match the design
const EstimateIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2Z" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10H15" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 9.5C14.5 8.67157 13.8284 8 13 8C12.1716 8 11.5 8.67157 11.5 9.5V10.5C11.5 11.3284 12.1716 12 13 12C13.8284 12 14.5 11.3284 14.5 10.5V9.5Z" fill="#fde047" stroke="#ca8a04"/>
    <path d="M9.5 13.5C9.5 12.6716 8.82843 12 8 12C7.17157 12 6.5 12.6716 6.5 13.5V14.5C6.5 15.3284 7.17157 16 8 16C8.82843 16 9.5 15.3284 9.5 14.5V13.5Z" fill="#fde047" stroke="#ca8a04"/>
  </svg>
);

const VisitorsIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9992 18.1142 22.7094 17.2583 22.1818 16.5562C21.6542 15.854 20.922 15.3475 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.922 3.34751 17.6542 3.85404 18.1818 4.55616C18.7094 5.25828 18.9992 6.1142 19 7C19 8.24 18.4 9.22 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ConfirmOrderIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15.5L10.5 17L14 13.5" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CarpenterIcon = () => (
    <div className="relative">
      <div className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-md">New</div>
      <HardHat className="h-10 w-10 text-white" />
    </div>
);


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
        <div className="p-4 md:p-6 space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full flex-grow bg-muted/40 pb-20">
        <div className="p-4 md:p-6 space-y-4">
          {/* Carpenter Bonanza Offer Card */}
          <Card className="overflow-hidden bg-white shadow-lg">
             <CardContent className="p-0">
               <Image
                src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173663/carpenter-bonanza_bf1fmg.png"
                alt="Carpenter Bonanza Offer"
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
             </CardContent>
          </Card>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Link href="/estimate" className="col-span-1">
              <Card className="bg-red-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-red-600 transition-colors">
                <EstimateIcon />
                <p className="mt-2 font-semibold text-sm">Estimate</p>
              </Card>
            </Link>
             <Link href="/greetings" className="col-span-1">
               <Card className="bg-blue-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-blue-600 transition-colors">
                 <Handshake className="h-10 w-10" />
                 <p className="mt-2 font-semibold text-sm">Greetings</p>
               </Card>
             </Link>
             <Link href="/#" className="col-span-1">
               <Card className="bg-yellow-400 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-yellow-500 transition-colors">
                 <VisitorsIcon />
                 <p className="mt-2 font-semibold text-sm">Visitors</p>
               </Card>
             </Link>
          </div>

           <div className="grid grid-cols-2 gap-4">
            <Link href="/#" className="col-span-1">
              <Card className="bg-pink-600 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-pink-700 transition-colors relative">
                 <CarpenterIcon />
                <p className="mt-2 font-semibold text-sm">My Carpenter</p>
              </Card>
            </Link>
            <Link href="/#" className="col-span-1">
              <Card className="bg-purple-600 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-purple-700 transition-colors">
                <ConfirmOrderIcon />
                <p className="mt-2 font-semibold text-sm">Confirm Order List</p>
              </Card>
            </Link>
          </div>

          {/* Smaller Cards */}
          <div className="grid grid-cols-3 gap-4">
             <Card className="bg-white text-center flex flex-col items-center justify-center p-4 h-full shadow-md">
                <Brush className="h-8 w-8 text-red-500" />
                <p className="mt-2 font-semibold text-xs text-red-600">Real Editor</p>
              </Card>
              <Card className="bg-white text-center flex flex-col items-center justify-center p-4 h-full shadow-md">
                <Trophy className="h-8 w-8 text-blue-500" />
                <p className="mt-2 font-semibold text-xs text-red-600">Carpenter Bonanza</p>
              </Card>
              <Card className="bg-white text-center flex flex-col items-center justify-center p-4 h-full shadow-md">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <p className="mt-2 font-semibold text-xs text-gray-700">Catalogue</p>
              </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
