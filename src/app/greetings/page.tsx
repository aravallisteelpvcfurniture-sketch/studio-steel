'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';

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
        return collection(firestore, 'visitor_greetings');
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
                description: "The new greeting message has been saved.",
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

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="h-6 w-6" />
                            Add New Greeting
                        </CardTitle>
                        <CardDescription>Create a new greeting message for your visitors.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAddGreeting}>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Type your greeting message here..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
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
                        <CardDescription>Here are the current greeting messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoadingGreetings ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : greetings && greetings.length > 0 ? (
                            greetings.map((greeting) => (
                                <div key={greeting.id} className="p-4 border rounded-lg bg-muted/50">
                                    <p className="text-sm text-foreground">{greeting.message}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Added on: {greeting.createdAt?.toDate()?.toLocaleDateString() || '...'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No greetings found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
