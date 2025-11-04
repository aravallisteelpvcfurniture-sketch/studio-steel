'use client';

import { useRef } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, Download } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { toPng } from 'html-to-image';

type UserProfile = {
    companyInfo?: {
        logoUrl?: string;
        companyName?: string;
        mobile?: string;
        email?: string;
    }
}

type Greeting = {
    title: string;
    imageUrl: string;
};

export default function GreetingsPage() {
    const firestore = useFirestore();
    const posterRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { user, isLoading: isUserLoading } = useUser();

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isLoadingProfile } = useDoc<UserProfile>(userProfileRef);

    const companyInfo = userProfile?.companyInfo;
    const allPosters = placeholderImages.festivalPosters;

    const handleDownload = async (greeting: Greeting, index: number) => {
        const posterElement = posterRefs.current[index];
        if (posterElement) {
            try {
                const dataUrl = await toPng(posterElement, { cacheBust: true });
                const link = document.createElement('a');
                link.download = `${greeting.title.replace(/\s+/g, '-')}-aravalli.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('oops, something went wrong!', err);
            }
        }
    };
    
    if (isUserLoading || isLoadingProfile) {
        return (
            <AppLayout>
                <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Festival Greetings</h1>
                    <p className="text-muted-foreground mt-2">Download and share greetings for every occasion.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allPosters.map((greeting, index) => (
                        <div key={index}>
                            <Card 
                                className="overflow-hidden group"
                            >
                                <div ref={el => posterRefs.current[index] = el}>
                                <CardContent className="p-0 aspect-square relative">
                                    <Image
                                        src={greeting.imageUrl}
                                        alt={greeting.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute top-4 left-4">
                                        {companyInfo?.logoUrl && (
                                            <div className="bg-white/80 p-2 rounded-lg backdrop-blur-sm">
                                                <Image src={companyInfo.logoUrl} alt="Company Logo" width={80} height={30} className="object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                         <h2 className="text-3xl font-bold text-shadow-lg">{greeting.title}</h2>
                                         {companyInfo?.companyName && <p className="font-semibold text-lg">{companyInfo.companyName}</p>}
                                         <div className="mt-2 text-sm">
                                             {companyInfo?.mobile && <p>{companyInfo.mobile}</p>}
                                             {companyInfo?.email && <p>{companyInfo.email}</p>}
                                         </div>
                                    </div>
                                </CardContent>
                                </div>
                            </Card>
                            <Button className="w-full mt-4" onClick={() => handleDownload(greeting, index)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Poster
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
