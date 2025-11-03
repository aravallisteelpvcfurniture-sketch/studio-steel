'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, type WithId } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, Image as ImageIcon, Building, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter } from "@/components/ui/alert-dialog";

type VisitorGreeting = {
    title: string;
    imageUrl: string;
    logoUrl?: string;
    companyName?: string;
    mobile?: string;
    email?: string;
    createdAt: any;
};

export default function GreetingsPage() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [companyName, setCompanyName] = useState('Aravalli Home Studio');
    const [mobile, setMobile] = useState('+91 1234567890');
    const [email, setEmail] = useState('contact@aravalli.com');

    const [isLoading, setIsLoading] = useState(false);
    const firestore = useFirestore();
    const { toast } = useToast();

    const greetingsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'visitor_greetings'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: greetings, isLoading: isLoadingGreetings } = useCollection<VisitorGreeting>(greetingsQuery);

    const handleAddGreeting = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !imageUrl.trim() || !firestore) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Please provide at least a title and an image URL.",
            });
            return;
        }
        
        setIsLoading(true);

        const newGreeting = {
            title,
            imageUrl,
            logoUrl,
            companyName,
            mobile,
            email,
            createdAt: serverTimestamp()
        };

        try {
            await addDocumentNonBlocking(collection(firestore, 'visitor_greetings'), newGreeting);
            toast({
                title: "Greeting Added!",
                description: "The new poster has been saved.",
            });
            // Reset fields
            setTitle('');
            setImageUrl('');
            setLogoUrl('');

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not save the greeting poster. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDeleteGreeting = (greetingId: string) => {
        if (!firestore) return;
        const greetingDocRef = doc(firestore, 'visitor_greetings', greetingId);
        deleteDocumentNonBlocking(greetingDocRef);
        toast({
            title: "Greeting Deleted",
            description: "The greeting poster has been removed.",
        });
    }

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="h-6 w-6" />
                            Create Greeting Poster
                        </CardTitle>
                        <CardDescription>Design a new poster for festivals or announcements.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAddGreeting}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" placeholder="e.g., Happy Diwali" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl">Background Image URL</Label>
                                    <Input id="imageUrl" placeholder="https://example.com/background.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
                                    <Input id="logoUrl" placeholder="https://example.com/logo.png" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile</Label>
                                    <Input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Poster
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Existing Posters</CardTitle>
                        <CardDescription>Here are the current greeting posters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoadingGreetings ? (
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
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
                                               
                                                <h3 className="text-3xl font-bold text-white shadow-lg leading-tight">{greeting.title}</h3>
                                               
                                                <div className="mt-4 border-t border-white/30 pt-4">
                                                    <div className='flex items-center gap-4'>
                                                        {greeting.logoUrl && (
                                                            <div className='relative w-16 h-16 bg-white/90 p-1 rounded-md'>
                                                                <Image
                                                                    src={greeting.logoUrl}
                                                                    alt="Company Logo"
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="text-white">
                                                            {greeting.companyName && <p className="font-bold text-lg">{greeting.companyName}</p>}
                                                            {greeting.mobile && <p className="text-sm">{greeting.mobile}</p>}
                                                            {greeting.email && <p className="text-sm">{greeting.email}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="icon" className="h-8 w-8">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>This will permanently delete the greeting poster. This action cannot be undone.</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteGreeting(greeting.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-8">No greeting posters found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
