'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, type WithId } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { Label } from '@/components/ui/label';

type VisitorGreeting = {
    title: string;
    imageUrl: string;
    createdAt: any;
};

export default function GreetingsPage() {
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
        if (!title.trim() || !imageUrl.trim() || !firestore) return;
        
        setIsLoading(true);

        const newGreeting = {
            title,
            imageUrl,
            displayFrom: new Date(),
            displayUntil: new Date(new Date().setDate(new Date().getDate() + 7)), // Display for 7 days
            createdAt: serverTimestamp()
        };

        try {
            await addDocumentNonBlocking(collection(firestore, 'visitor_greetings'), newGreeting);
            toast({
                title: "Greeting Poster Added!",
                description: "The new festival poster has been saved.",
            });
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
                            Add Festival Poster
                        </CardTitle>
                        <CardDescription>Create a new greeting poster for your visitors.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAddGreeting}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Happy Diwali"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    placeholder="https://example.com/poster.jpg"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Poster
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Existing Festival Posters</CardTitle>
                        <CardDescription>Here are the current greeting posters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoadingGreetings ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : greetings && greetings.length > 0 ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {greetings.map((greeting: WithId<VisitorGreeting>) => (
                                    <Card key={greeting.id} className="group relative">
                                        <CardContent className="p-0 aspect-video">
                                            <Image 
                                                src={greeting.imageUrl} 
                                                alt={greeting.title} 
                                                fill
                                                className="object-cover rounded-t-lg"
                                            />
                                        </CardContent>
                                        <CardFooter className="p-3 flex justify-between items-center">
                                            <p className="font-semibold truncate">{greeting.title}</p>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 opacity-80 group-hover:opacity-100">
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the poster.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteGreeting(greeting.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </CardFooter>
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
