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
import { Loader2, PlusCircle, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter } from "@/components/ui/alert-dialog";

type VisitorGreeting = {
    title: string;
    imageUrl: string;
    createdAt: any;
};

export default function PosterAdminPage() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
                description: "Please provide both a title and a background image URL.",
            });
            return;
        }
        
        setIsLoading(true);

        const newGreeting: Omit<VisitorGreeting, 'id' | 'createdAt'> & { createdAt: any } = {
            title,
            imageUrl,
            createdAt: serverTimestamp()
        };

        try {
            await addDocumentNonBlocking(collection(firestore, 'visitor_greetings'), newGreeting);
            toast({
                title: "Poster Added!",
                description: "The new poster has been saved.",
            });
            // Reset fields
            setTitle('');
            setImageUrl('');

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not save the poster. Please try again.",
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
            title: "Poster Deleted",
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
                        <CardDescription>Add a new poster for festivals or announcements.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAddGreeting}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" placeholder="e.g., Happy Diwali" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Background Image URL</Label>
                                <Input id="imageUrl" placeholder="https://example.com/background.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
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
                        <CardDescription>Manage current greeting posters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoadingGreetings ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : greetings && greetings.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {greetings.map((greeting: WithId<VisitorGreeting>) => (
                                    <Card key={greeting.id} className="overflow-hidden group relative">
                                        <div className="aspect-[9/16] relative bg-muted">
                                            <Image
                                                src={greeting.imageUrl}
                                                alt={greeting.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                         <CardFooter className="p-2 bg-background/80 backdrop-blur-sm">
                                            <p className="text-sm font-semibold truncate">{greeting.title}</p>
                                        </CardFooter>
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
