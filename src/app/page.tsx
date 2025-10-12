'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { HardHat, ClipboardCheck, Brush, Trophy, BookOpen, Lightbulb, Video, Newspaper, Gift, Lock, Scan, MoreHorizontal, FileText } from 'lucide-react';
import Link from 'next/link';

// Custom SVG Icons to match the design
const EstimateIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
        <path d="M9 7H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 11H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 15H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12.5 17.5L12.5 14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 16L14 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <text x="12" y="10" fill="white" fontSize="4" textAnchor="middle" alignmentBaseline="middle">$</text>
    </svg>
);

const HandshakeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 18L13 16.5L14.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 18L10 16.5L8.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 14L19 12L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 14L4 12L6 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 5V2L8 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5V2L15 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16.5L13 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 22V19.5L16 18L17.5 16.5V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 22V19.5L7 18L5.5 16.5V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CatalogueIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="24" height="28" rx="4" fill="#60A5FA"/>
        <path d="M14 13H26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 19H26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 25H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const VideoReelsIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#EF4444" strokeWidth="2"/>
        <path d="M10 9L14 12L10 15V9Z" fill="#EF4444"/>
    </svg>
);

const OfferIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12V6H4V12" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M4 12H20L18 20H6L4 12Z" fill="#FDE68A"/>
        <path d="M12 6V3" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M10 3H14" stroke="#F59E0B" strokeWidth="2"/>
        <text x="12" y="16" fontSize="8" fill="#D97706" textAnchor="middle">%</text>
    </svg>
);


const DashboardCard = ({ href, className, icon, label, newBadge }: { href: string, className?: string, icon: React.ReactNode, label: string, newBadge?: boolean }) => (
    <Link href={href}>
      <Card className={`text-center flex flex-col items-center justify-center p-3 h-full shadow-md hover:shadow-lg transition-shadow relative ${className}`}>
        {newBadge && <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-md">New</div>}
        {icon}
        <p className="mt-2 font-semibold text-xs text-gray-700">{label}</p>
      </Card>
    </Link>
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
          <div className="grid grid-cols-3 gap-4">
             <Skeleton className="h-20 w-full rounded-lg" />
             <Skeleton className="h-20 w-full rounded-lg" />
             <Skeleton className="h-20 w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full flex-grow bg-muted/20 pb-20">
        <div className="p-4 md:p-6 space-y-4">

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-3 gap-4">
             <Link href="/estimate" className="col-span-1">
              <Card className="bg-red-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-red-600 transition-colors">
                <EstimateIcon />
              </Card>
            </Link>
             <Link href="/greetings" className="col-span-1">
               <Card className="bg-blue-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-blue-600 transition-colors">
                 <HandshakeIcon />
               </Card>
             </Link>
             <Link href="/#" className="col-span-1">
               <Card className="bg-yellow-400 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-yellow-500 transition-colors">
                 <EstimateIcon />
               </Card>
             </Link>
          </div>

           <div className="grid grid-cols-2 gap-4">
            <Link href="/#" className="col-span-1">
              <Card className="bg-pink-600 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-pink-700 transition-colors relative">
                 <div className="absolute top-1 right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-md">New</div>
                 <HardHat className="h-10 w-10 text-white" />
                <p className="mt-2 font-semibold text-sm">My Carpenter</p>
              </Card>
            </Link>
            <Link href="/#" className="col-span-1">
              <Card className="bg-purple-600 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-purple-700 transition-colors">
                <ClipboardCheck className="h-10 w-10" />
                <p className="mt-2 font-semibold text-sm">Confirm Order List</p>
              </Card>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <DashboardCard href="#" icon={<Brush className="h-8 w-8 text-orange-500" />} label="Real Editor" />
            <DashboardCard href="#" icon={<Trophy className="h-8 w-8 text-blue-500" />} label="Carpenter Bonanza" />
            <DashboardCard href="#" icon={<CatalogueIcon />} label="Catalogue" />
            <DashboardCard href="#" icon={<Lightbulb className="h-8 w-8 text-yellow-500" />} label="Furniture Idea" />
            <DashboardCard href="/estimate" icon={<FileText className="h-8 w-8 text-gray-700" />} label="Estimate" />
            <DashboardCard href="#" icon={<VideoReelsIcon />} label="Video/Reels" />
            <DashboardCard href="#" icon={<Newspaper className="h-8 w-8 text-blue-600" />} label="News" />
            <DashboardCard href="#" icon={<OfferIcon />} label="Offer" />
            <DashboardCard href="#" icon={<Gift className="h-8 w-8 text-pink-500" />} label="My Gift" />
            <DashboardCard href="#" icon={<Scan className="h-8 w-8 text-gray-700" />} label="Scan History" />
            <DashboardCard href="#" icon={<MoreHorizontal className="h-8 w-8 text-gray-700" />} label="More" />
            <DashboardCard href="#" icon={<FileText className="h-8 w-8 text-yellow-600" />} label="Order Form" newBadge />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
