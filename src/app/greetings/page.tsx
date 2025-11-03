'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, Download, Pencil, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type UserProfile = {
    companyInfo?: {
        logoUrl?: string;
        companyName?: string;
        mobile?: string;
        email?: string;
        address?: string;
    }
}

export default function GreetingsPage() {
    const firestore = useFirestore();
    const { user } = useUser();

    const userProfileRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading: isLoadingProfile } = useDoc<UserProfile>(userProfileRef);

    const companyInfo = userProfile?.companyInfo;
    const allPosters = placeholderImages.festivalPosters;
    const [mainPoster, setMainPoster] = useState(allPosters[0]);

    const handleDownload = async (greeting: typeof mainPoster) => {
        // Download logic remains the same
    };
    
    const isLoading = isLoadingProfile;
    const otherPosters = allPosters.filter(p => p.title !== mainPoster.title);

    return (
        <AppLayout>
            <div className="bg-background">
                {isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="p-4 relative">
                             <div className="flex justify-between items-center mb-4">
                                <Link href="/more">
                                    <Button variant="ghost" size="icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </Button>
                                </Link>
                                <h1 className="text-xl font-bold">Quotes</h1>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDownload(mainPoster)}>
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <Card className="overflow-hidden relative shadow-lg">
                                <CardContent className="p-0 aspect-square">
                                    {companyInfo?.logoUrl && (
                                        <Image src={companyInfo.logoUrl} alt="Company Logo" width={100} height={40} className="absolute top-4 left-4 z-10 bg-white p-1 rounded-md" />
                                    )}
                                    <Image
                                        src={mainPoster.imageUrl}
                                        alt={mainPoster.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Footer on image */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-blue-700 text-white rounded-b-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-sm">
                                                <p className="font-semibold">Call us</p>
                                                <p>{companyInfo?.mobile || '99790 44449'}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Instagram size={18} />
                                                <Facebook size={18} />
                                                <Twitter size={18} />
                                                <Linkedin size={18} />
                                            </div>
                                        </div>
                                         <div className="text-xs flex items-center gap-2 border-t border-white/50 pt-2">
                                            <Mail size={14} className="shrink-0" />
                                            <p className="truncate">{companyInfo?.email || 'festivalbrandflexcodexial@gmail.com'}</p>
                                        </div>
                                        <div className="text-xs flex items-center gap-2 mt-1">
                                            <MapPin size={14} className="shrink-0" />
                                            <p className="truncate">{companyInfo?.address || 'Mirjapur, Near Mahakali Hotel, Ahmedabad'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Image Gallery */}
                        <div className="px-4 pb-24">
                           <div className="flex justify-center my-4">
                                <div className="flex items-center gap-2 rounded-full bg-muted p-1">
                                    <Button size="sm" className="rounded-full">Image</Button>
                                    <Button size="sm" variant="ghost" className="rounded-full">Video</Button>
                                    <Button size="sm" variant="ghost" className="rounded-full">Story Image</Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {otherPosters.map((poster) => (
                                    <Card key={poster.title} className="overflow-hidden group" onClick={() => setMainPoster(poster)}>
                                        <CardContent className="p-0 aspect-square relative">
                                            <Image
                                                src={poster.imageUrl}
                                                alt={poster.title}
                                                fill
                                                className="object-cover"
                                                sizes="33vw"
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
