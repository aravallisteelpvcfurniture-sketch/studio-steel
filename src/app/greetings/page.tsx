'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, Handshake, Download } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';

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
    const [isDownloading, setIsDownloading] = useState<string | null>(null);

    const userProfileRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading: isLoadingProfile } = useDoc<UserProfile>(userProfileRef);

    const companyInfo = userProfile?.companyInfo;

    const greetings = placeholderImages.festivalPosters;

    const handleDownload = async (greeting: typeof greetings[0]) => {
        setIsDownloading(greeting.title);
        try {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context');

            // Load background image
            const bgImage = new window.Image();
            bgImage.crossOrigin = 'anonymous'; // Important for cross-origin images
            bgImage.src = greeting.imageUrl;

            await new Promise((resolve, reject) => {
                bgImage.onload = resolve;
                bgImage.onerror = reject;
            });

            // Set canvas dimensions
            canvas.width = bgImage.width;
            canvas.height = bgImage.height;

            // Draw background
            ctx.drawImage(bgImage, 0, 0);

            // --- Draw Company Info ---
            if (companyInfo) {
                // semi-transparent footer
                ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

                let logoLoaded = false;
                if (companyInfo.logoUrl) {
                    const logoImage = new window.Image();
                    logoImage.crossOrigin = 'anonymous';
                    logoImage.src = companyInfo.logoUrl;
                    try {
                        await new Promise((resolve, reject) => {
                            logoImage.onload = resolve;
                            logoImage.onerror = (e) => {
                                console.warn("Could not load logo, continuing without it.", e);
                                resolve(null); 
                            };
                        });
                        // Draw logo in a white container
                        const logoX = 40;
                        const logoY = canvas.height - 125;
                        const logoSize = 100;
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(logoX-5, logoY-5, logoSize+10, logoSize+10);
                        ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
                        logoLoaded = true;
                    } catch {
                         // ignore logo loading error
                    }
                }

                // Text properties
                ctx.fillStyle = '#FFFFFF';
                const textStartX = logoLoaded ? 160 : 40;

                if (companyInfo.companyName) {
                    ctx.font = 'bold 36px sans-serif';
                    ctx.fillText(companyInfo.companyName, textStartX, canvas.height - 95);
                }
                if (companyInfo.mobile) {
                    ctx.font = '28px sans-serif';
                    ctx.fillText(companyInfo.mobile, textStartX, canvas.height - 55);
                }
                 if (companyInfo.email) {
                    ctx.font = '28px sans-serif';
                    ctx.fillText(companyInfo.email, textStartX, canvas.height - 20);
                }
            }


            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.download = `${greeting.title.replace(/ /g, '_')}_aravalli.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error("Error creating image for download:", error);
        } finally {
            setIsDownloading(null);
        }
    };
    
    const isLoading = isLoadingProfile;

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Handshake className="h-6 w-6" />
                           Festival Greetings
                        </CardTitle>
                        <CardDescription>A gallery of festive posters for your visitors. Download and share!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : greetings && greetings.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {greetings.map((greeting) => (
                                    <Card key={greeting.title} className="overflow-hidden group relative flex flex-col">
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
                                         <CardFooter className="p-4 bg-background border-t">
                                            <Button 
                                                onClick={() => handleDownload(greeting)} 
                                                className="w-full"
                                                disabled={isDownloading !== null}
                                            >
                                                {isDownloading === greeting.title ? (
                                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Download className="mr-2 h-4 w-4" />
                                                )}
                                                {isDownloading === greeting.title ? 'Downloading...' : 'Download Poster'}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-16">
                                <p>No greeting posters are available right now.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
