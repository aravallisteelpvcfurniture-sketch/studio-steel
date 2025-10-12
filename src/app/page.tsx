'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { HardHat, ClipboardCheck, Brush, Trophy, Lightbulb, Newspaper, Gift, Scan, MoreHorizontal, FileText } from 'lucide-react';
import Link from 'next/link';

// Custom SVG Icons to match the design
const EstimateIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2Z" fill="currentColor" stroke="white" strokeWidth="1"/>
        <path d="M9 7H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 11H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 15H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);


const HandshakeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.52 14.282c.275.275.275.72 0 .995l-1.485 1.485c-.275.275-.72.275-.995 0l-1.415-1.414a.704.704 0 0 0-.995 0l-1.414 1.414c-.275.275-.72.275-.995 0L6.73 15.277a.704.704 0 0 1 0-.995l1.485-1.485c.275-.275.72-.275.995 0l1.414 1.414c.275.275.72.275.995 0l1.414-1.414c.275-.275.72-.275.995 0l1.485 1.485zM9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V5H9a1 1 0 0 1-1-1zm11 8c0 2.226-1.21 4.195-3 5.196V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1.804c-1.79-1-3-2.97-3-5.196 0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6zM7 12c0 1.93-1.12 3.63-2.75 4.5C4.08 15.63 4 14.83 4 14a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4c0 .83-.08 1.63-.25 2.5C16.12 15.63 15 13.93 15 12c0-1.657-1.343-3-3-3s-3 1.343-3 3z" fill="currentColor"/>
    </svg>
);

const VisitorsIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 18.5C20 16.567 16.4183 15 12 15C7.58172 15 4 16.567 4 18.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor"/>
    </svg>
);


const CatalogueIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14.66V19.5C20 20.3284 19.3284 21 18.5 21H6.5C5.67157 21 5 20.3284 5 19.5V14.66C5 14.0407 5.27581 13.4682 5.74415 13.09C6.2125 12.7118 6.82283 12.5 7.45 12.5H17.55C18.1772 12.5 18.7875 12.7118 19.2558 13.09C19.7242 13.4682 20 14.0407 20 14.66Z" fill="#60A5FA" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 14.5L5.05359 5.05359C5.08819 4.28821 5.61524 3.61524 6.38062 3.58064L18.6194 3.0194C19.3848 2.9848 20.0152 3.51524 19.9806 4.28062L19.5 14.5" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const VideoReelsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10L19 7L22 9" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="5" width="14" height="14" rx="2" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 10.5L8 8.5L12 12.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const OfferIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.41416 3.41416L12 6L14.5858 3.41416C15.3668 2.63311 16.6331 2.63311 17.4142 3.41416C18.1952 4.19521 18.1952 5.46154 17.4142 6.24259L12.0001 11.6568L6.58586 6.24259C5.80481 5.46154 5.80481 4.19521 6.58586 3.41416C7.36691 2.63311 8.63324 2.63311 9.41416 3.41416Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21V11" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const DashboardCard = ({ href, className, icon, label, newBadge }: { href: string, className?: string, icon: React.ReactNode, label: string, newBadge?: boolean }) => (
    <Link href={href}>
      <Card className={cn("text-center flex flex-col items-center justify-center p-2.5 h-full shadow-md hover:shadow-lg transition-shadow relative aspect-square", className)}>
        {newBadge && <div className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">New</div>}
        <div className="flex-grow flex items-center justify-center">{icon}</div>
        <p className="mt-1 font-semibold text-[11px] text-gray-700 leading-tight">{label}</p>
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
             <Skeleton className="h-24 w-full rounded-lg" />
             <Skeleton className="h-24 w-full rounded-lg" />
             <Skeleton className="h-24 w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[...Array(12)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg aspect-square" />)}
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
                <p className="mt-2 font-bold text-sm">Estimate</p>
              </Card>
            </Link>
             <Link href="/greetings" className="col-span-1">
               <Card className="bg-blue-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-blue-600 transition-colors">
                 <HandshakeIcon />
                 <p className="mt-2 font-bold text-sm">Greetings</p>
               </Card>
             </Link>
             <Link href="/#" className="col-span-1">
               <Card className="bg-yellow-400 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-yellow-500 transition-colors">
                 <VisitorsIcon />
                 <p className="mt-2 font-bold text-sm">Visitors</p>
               </Card>
             </Link>
          </div>

           <div className="grid grid-cols-2 gap-4">
            <Link href="/#" className="col-span-1">
              <Card className="bg-pink-600 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-pink-700 transition-colors relative">
                 <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-md">New</div>
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
          
          <div className="grid grid-cols-4 gap-3">
            <DashboardCard href="#" icon={<Brush className="h-7 w-7 text-orange-500" />} label="Real Editor" />
            <DashboardCard href="#" icon={<Trophy className="h-7 w-7 text-blue-500" />} label="Carpenter Bonanza" />
            <DashboardCard href="/gallery" icon={<CatalogueIcon />} label="Catalogue" />
            <DashboardCard href="#" icon={<Lightbulb className="h-7 w-7 text-yellow-500" />} label="Furniture Idea" />
            <DashboardCard href="/estimate" icon={<FileText className="h-7 w-7 text-gray-700" />} label="Estimate" />
            <DashboardCard href="#" icon={<VideoReelsIcon />} label="Video/Reels" />
            <DashboardCard href="#" icon={<Newspaper className="h-7 w-7 text-blue-600" />} label="News" />
            <DashboardCard href="#" icon={<OfferIcon />} label="Offer" />
            <DashboardCard href="#" icon={<Gift className="h-7 w-7 text-pink-500" />} label="My Gift" />
            <DashboardCard href="#" icon={<Scan className="h-7 w-7 text-gray-700" />} label="Scan History" />
            <DashboardCard href="#" icon={<MoreHorizontal className="h-7 w-7 text-gray-700" />} label="More" />
            <DashboardCard href="#" icon={<FileText className="h-7 w-7 text-yellow-600" />} label="Order Form" newBadge />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
