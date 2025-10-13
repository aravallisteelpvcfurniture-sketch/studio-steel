
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from "@/lib/utils";

// Custom SVG Icons to match the design
const EstimateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2H17C18.1046 2 19 2.89543 19 4V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 6H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 10H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 14H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 18C15.1046 18 16 17.1046 16 16C16 14.8954 15.1046 14 14 14C12.8954 14 12 14.8954 12 16C12 17.1046 12.8954 18 14 18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 17.5L11 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HandshakeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 16.5l-3 -3l-3 3" />
      <path d="M14 13.5l3 3l3 -3" />
      <path d="M12 15l-2 -2" />
      <path d="M12 12l2 2" />
      <path d="M10 12h.01" />
      <path d="M14 15h.01" />
      <path d="M4.5 12.5l3 -3" />
      <path d="M19.5 12.5l-3 -3" />
      <path d="M7.5 15.5l-1 -1" />
      <path d="M16.5 15.5l1 -1" />
    </svg>
);

const VisitorsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M16 22h6m-3 -3v6" />
        <path d="M3 19h6" />
        <path d="M6 16v6" />
    </svg>
);

const CarpenterIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FFF" />
        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" fill="#FDBA74"/>
        <path d="M17 6C17 7.10457 16.1046 8 15 8C13.8954 8 13 7.10457 13 6C13 4.89543 13.8954 4 15 4C16.1046 4 17 4.89543 17 6Z" fill="#F97316"/>
        <path d="M12 14C9.79086 14 8 15.7909 8 18H16C16 15.7909 14.2091 14 12 14Z" fill="#FDBA74"/>
    </svg>
);

const ConfirmOrderIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FFF" />
        <path d="M9 12L11 14L15 10" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8H8V16H16V8Z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const DashboardCard = ({ href, className, icon, label, newBadge, labelClassName }: { href: string, className?: string, icon: React.ReactNode, label: string, newBadge?: boolean, labelClassName?: string }) => (
    <Link href={href} className="flex flex-col items-center">
      <Card className={cn("text-center flex flex-col items-center justify-center p-4 h-24 w-24 shadow-md hover:shadow-lg transition-shadow relative bg-white rounded-xl", className)}>
        {newBadge && <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">New</div>}
        <div className="flex-grow flex items-center justify-center">{icon}</div>
      </Card>
      <p className={cn("mt-2 font-semibold text-xs text-center text-gray-700 leading-tight", labelClassName)}>{label}</p>
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
            <div className="grid grid-cols-3 gap-4 h-14">
                <Skeleton className="h-full w-full rounded-lg" />
                <Skeleton className="h-full w-full rounded-lg" />
                <Skeleton className="h-full w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-3">
                {[...Array(12)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg aspect-square" />)}
            </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full flex-grow bg-muted/40 pb-20">
        <div className="p-4 md:p-6 space-y-6">

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-3 gap-4">
             <Link href="/estimate" className="col-span-1">
              <Card className="bg-red-500 text-white text-center flex flex-col items-center justify-center p-2 h-14 hover:bg-red-600 transition-colors rounded-xl shadow-lg">
                <EstimateIcon />
              </Card>
            </Link>
             <Link href="/greetings" className="col-span-1">
               <Card className="bg-blue-500 text-white text-center flex flex-col items-center justify-center p-2 h-14 hover:bg-blue-600 transition-colors rounded-xl shadow-lg">
                 <HandshakeIcon />
               </Card>
             </Link>
             <Link href="/#" className="col-span-1">
               <Card className="bg-yellow-400 text-white text-center flex flex-col items-center justify-center p-2 h-14 hover:bg-yellow-500 transition-colors rounded-xl shadow-lg">
                 <VisitorsIcon />
               </Card>
             </Link>
          </div>

           <div className="grid grid-cols-2 gap-4">
            <Link href="/#" className="col-span-1">
              <Card className="bg-pink-600 text-white text-center flex flex-col items-center justify-center p-6 h-full hover:bg-pink-700 transition-colors relative rounded-xl shadow-lg">
                 <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-md transform -rotate-15">New</div>
                 <CarpenterIcon />
                <p className="mt-3 font-semibold text-base">My Carpenter</p>
              </Card>
            </Link>
            <Link href="/#" className="col-span-1">
              <Card className="bg-purple-600 text-white text-center flex flex-col items-center justify-center p-6 h-full hover:bg-purple-700 transition-colors rounded-xl shadow-lg">
                <ConfirmOrderIcon />
                <p className="mt-3 font-semibold text-base">Confirm Order List</p>
              </Card>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/real-editor_y7w1cr.png" alt="Real Editor" width={48} height={48} />} label="Real Editor" labelClassName="text-red-500" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/carpenter-bonanza_d5bfzr.png" alt="Carpenter Bonanza" width={48} height={48} />} label="Carpenter Bonanza" labelClassName="text-red-500"/>
            <DashboardCard href="/gallery" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/catalogue_kpfqcu.png" alt="Catalogue" width={48} height={48} />} label="Catalogue" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/furniture_idea_qotui2.png" alt="Furniture Idea" width={48} height={48} />} label="Furniture Idea" />
            <DashboardCard href="/estimate" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/estimate_o1qj2t.png" alt="Estimate" width={48} height={48} />} label="Estimate" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/video_reels_j3v3p2.png" alt="Video/Reels" width={48} height={48} />} label="Video/Reels" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/news_nsl5v2.png" alt="News" width={48} height={48} />} label="News" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/offer_b1r5i2.png" alt="Offer" width={48} height={48} />} label="Offer" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/my_gift_yqj5qf.png" alt="My Gift" width={48} height={48} />} label="My Gift" />
            <DashboardCard href="/scan" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/scan_history_z83fss.png" alt="Scan History" width={48} height={48} />} label="Scan History" />
            <DashboardCard href="/more" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/more_n4hs5b.png" alt="More" width={48} height={48} />} label="More" />
            <DashboardCard href="/order-form" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760252119/order_form_yweqvq.png" alt="Order Form" width={48} height={48} />} label="Order Form" newBadge />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
