'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, type WithId } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

type VisitorGreeting = {
    message: string;
    createdAt: any;
};

export default function GreetingsPage() {
    const [message, setMessage] = useState('');
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
        if (!message.trim() || !firestore) return;
        
        setIsLoading(true);

        const newGreeting = {
            message,
            displayFrom: new Date(),
            displayUntil: new Date(new Date().setDate(new Date().getDate() + 7)), // Display for 7 days
            createdAt: serverTimestamp()
        };

        try {
            await addDocumentNonBlocking(collection(firestore, 'visitor_greetings'), newGreeting);
            toast({
                title: "Greeting Added!",
                description: "The new welcome message has been saved.",
            });
            setMessage('');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not save the greeting. Please try again.",
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
            description: "The welcome message has been removed.",
        });
    }

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="h-6 w-6" />
                            Add Visitor Greeting
                        </CardTitle>
                        <CardDescription>Create a new welcome message for your visitors.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAddGreeting}>
                        <CardContent>
                            <Textarea
                                placeholder="Enter your welcome message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Greeting
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Existing Greetings</CardTitle>
                        <CardDescription>Here are the current welcome messages.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoadingGreetings ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : greetings && greetings.length > 0 ? (
                            <div className="space-y-4">
                                {greetings.map((greeting: WithId<VisitorGreeting>) => (
                                    <div key={greeting.id} className="p-4 border rounded-lg bg-muted/50 flex justify-between items-center">
                                        <p className="text-foreground">{greeting.message}</p>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => handleDeleteGreeting(greeting.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-8">No greetings found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
    