'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from "@/lib/utils";

// Custom SVG Icons to match the design
const EstimateIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3" width="14" height="18" rx="2" fill="white" fillOpacity="0.1"/>
    <path d="M9 8H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 12H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 16H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 3V21" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
    <circle cx="15.5" cy="16.5" r="1" fill="white"/>
    <path d="M14.5 15.5H16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15.5 14.5V16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HandshakeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M7 12h14l-3 -3m0 6l3 -3" />
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


const DashboardCard = ({ href, className, icon, label, newBadge }: { href: string, className?: string, icon: React.ReactNode, label: string, newBadge?: boolean }) => (
    <Link href={href} className="flex flex-col">
      <Card className={cn("text-center flex flex-col items-center justify-center p-4 h-full shadow-md hover:shadow-lg transition-shadow relative", className)}>
        {newBadge && <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">New</div>}
        <div className="flex-grow flex items-center justify-center">{icon}</div>
      </Card>
      <p className="mt-2 font-semibold text-xs text-center text-gray-700 leading-tight">{label}</p>
    </Link>
);

const BonanzaOfferCard = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#B91C1C] p-3">
            <div className="flex justify-between items-center">
                <h2 className="text-white text-xl font-bold">CARPENTER BONANZA OFFER</h2>
                <Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/realplast-logo_qrngs2.png" alt="Real Plast" width={80} height={25} />
            </div>
        </div>
        <CardContent className="p-0">
            <div className="bg-[#3B82F6] text-white p-4">
                <h3 className="font-bold text-lg mb-1">Only For June 2025</h3>
                <p className="text-xs mb-3">*Term & Condition Apply</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>फर्नीचर की फोटो स्क्रीन शॉर्ट लेके अपलोड ना करे।</li>
                    <li>फोटो मै कोई लोगो होगा तो नहीं चलेगा। फोटो की quality अच्छी होनी चाहिए।</li>
                    <li>इंटरनेट से photos डाउनलोड करके अपलोड़ ना करे।</li>
                    <li>Photo में लेमिनेट मै बनाया हुआ फर्नीचर नहीं चलेगा।</li>
                    <li>फर्नीचर Realplast के मटिरिअल से ही बना हुआ चाहिए।</li>
                </ul>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 items-center">
                <div>
                     <div className="space-y-1 text-sm">
                        <div className="flex items-center"><span className="bg-[#B91C1C] text-white text-xs px-2 py-0.5 rounded-sm mr-2 w-20 text-center">1 Winner</span> <span className="font-semibold">मोबाइल</span></div>
                        <div className="flex items-center"><span className="bg-[#3B82F6] text-white text-xs px-2 py-0.5 rounded-sm mr-2 w-20 text-center">2 Winner</span> <span className="font-semibold">ट्रॉली बेग</span></div>
                        <div className="flex items-center"><span className="bg-[#1D4ED8] text-white text-xs px-2 py-0.5 rounded-sm mr-2 w-20 text-center">3 Winner</span> <span className="font-semibold">मिक्सर मशीन</span></div>
                        <div className="flex items-center"><span className="bg-[#1E3A8A] text-white text-xs px-2 py-0.5 rounded-sm mr-2 w-20 text-center">4 to 10 Winner</span> <span className="font-semibold">ब्लेंडर / सिल्वर कॉइन</span></div>
                     </div>
                </div>
                 <div className="bg-yellow-400 p-3 text-center rounded-md">
                    <p className="font-extrabold text-red-600 text-lg leading-tight">भारत का</p>
                    <p className="font-extrabold text-red-600 text-2xl leading-tight">No.1</p>
                </div>
            </div>
        </CardContent>
    </Card>
)


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
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg aspect-square" />)}
            </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full flex-grow bg-muted/40 pb-20">
        <div className="p-4 md:p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <BonanzaOfferCard />
                 <Card className="hidden md:block relative overflow-hidden">
                    <Image src="https://picsum.photos/seed/kitchen/600/400" alt="Modern Kitchen" layout="fill" objectFit="cover" data-ai-hint="modern kitchen" />
                 </Card>
            </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-3 gap-4">
             <Link href="/estimate" className="col-span-1">
              <Card className="bg-red-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-red-600 transition-colors rounded-xl shadow-lg">
                <EstimateIcon />
                <p className="mt-2 font-bold text-sm">Estimate</p>
              </Card>
            </Link>
             <Link href="/greetings" className="col-span-1">
               <Card className="bg-blue-500 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-blue-600 transition-colors rounded-xl shadow-lg">
                 <HandshakeIcon />
                 <p className="mt-2 font-bold text-sm">Greetings</p>
               </Card>
             </Link>
             <Link href="/#" className="col-span-1">
               <Card className="bg-yellow-400 text-white text-center flex flex-col items-center justify-center p-4 h-full hover:bg-yellow-500 transition-colors rounded-xl shadow-lg">
                 <VisitorsIcon />
                 <p className="mt-2 font-bold text-sm">Visitors</p>
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
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/real-editor_y7w1cr.png" alt="Real Editor" width={48} height={48} />} label="Real Editor" />
            <DashboardCard href="#" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/carpenter-bonanza_d5bfzr.png" alt="Carpenter Bonanza" width={48} height={48} />} label="Carpenter Bonanza" />
            <DashboardCard href="/gallery" icon={<Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1760173678/catalogue_kpfqcu.png" alt="Catalogue" width={48} height={48} />} label="Catalogue" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
