'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirestore, useCollection, useMemoFirebase, useUser, useDoc, type WithId } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Loader2, Handshake } from 'lucide-react';
import Image from 'next/image';

type VisitorGreeting = {
    title: string;
    imageUrl: string;
    createdAt: any;
};

type UserProfile = {
    companyInfo?: {
        logoUrl?: string;
        companyName?: string;
        mobile?: string;
        email?: string;
    }
}

export default function GreetingsPage() {
    const firestore = useFirestore();
    const { user } = useUser();

    const greetingsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'visitor_greetings'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const userProfileRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: greetings, isLoading: isLoadingGreetings } = useCollection<VisitorGreeting>(greetingsQuery);
    const { data: userProfile, isLoading: isLoadingProfile } = useDoc<UserProfile>(userProfileRef);

    const companyInfo = userProfile?.companyInfo;

    const isLoading = isLoadingGreetings || isLoadingProfile;

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Handshake className="h-6 w-6" />
                           Festival Greetings
                        </CardTitle>
                        <CardDescription>A gallery of festive posters for your visitors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : greetings && greetings.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {greetings.map((greeting: WithId<VisitorGreeting>) => (
                                    <Card key={greeting.id} className="overflow-hidden group relative">
                                        <div className="aspect-[9/16] relative">
                                            <Image
                                                src={greeting.imageUrl}
                                                alt={greeting.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
                                               
                                                <h3 className="text-4xl font-bold text-white shadow-lg leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>{greeting.title}</h3>
                                               
                                                {companyInfo && (
                                                    <div className="mt-4 border-t border-white/30 pt-4">
                                                        <div className='flex items-center gap-4'>
                                                            {companyInfo.logoUrl && (
                                                                <div className='relative w-16 h-16 bg-white/90 p-1 rounded-md shadow-lg'>
                                                                    <Image
                                                                        src={companyInfo.logoUrl}
                                                                        alt={companyInfo.companyName || "Company Logo"}
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="text-white text-shadow-sm">
                                                                {companyInfo.companyName && <p className="font-bold text-lg">{companyInfo.companyName}</p>}
                                                                {companyInfo.mobile && <p className="text-sm">{companyInfo.mobile}</p>}
                                                                {companyInfo.email && <p className="text-sm">{companyInfo.email}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-16">
                                <p>No greeting posters are live right now.</p>
                                <p className="text-sm">Posters can be managed from the 'More' tab.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
