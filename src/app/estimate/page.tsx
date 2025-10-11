'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, UserPlus, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { WithId } from '@/firebase';

type Party = {
    partyName: string;
    mobile: string;
    email?: string;
    userId: string;
    createdAt: any;
};

export default function EstimatePage() {
    const [partyName, setPartyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

    const partiesQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'users', user.uid, 'parties'), orderBy('createdAt', 'desc'));
    }, [firestore, user]);

    const { data: parties, isLoading: isLoadingParties } = useCollection<Party>(partiesQuery);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !firestore) {
            toast({ variant: "destructive", title: "Error", description: "You must be logged in to add a party." });
            return;
        }
        setIsLoading(true);

        const newParty = {
            partyName,
            mobile,
            email,
            userId: user.uid,
            createdAt: new Date(),
        };

        try {
            await addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'parties'), newParty);
            toast({
                title: "Party Added",
                description: `${partyName} has been added successfully.`,
            });
            setPartyName('');
            setMobile('');
            setEmail('');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not add the party. Please try again.",
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
                           <UserPlus className="h-6 w-6" />
                           Add New Party
                        </CardTitle>
                        <CardDescription>Enter the details of the new party to create an estimate.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="partyName">Party Name</Label>
                                <Input 
                                    id="partyName" 
                                    placeholder="Enter party's full name" 
                                    value={partyName}
                                    onChange={(e) => setPartyName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input 
                                    id="mobile" 
                                    type="tel" 
                                    placeholder="Enter 10-digit mobile number" 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="Enter email address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Party'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-6 w-6" />
                            Party List
                        </CardTitle>
                        <CardDescription>Here are the parties you have added.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoadingParties ? (
                             <div className="flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : parties && parties.length > 0 ? (
                            <div className="space-y-4">
                                {parties.map((party: WithId<Party>) => (
                                    <div key={party.id} className="p-4 border rounded-lg bg-muted/50 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-foreground">{party.partyName}</p>
                                            <p className="text-sm text-muted-foreground">{party.mobile}</p>
                                            {party.email && <p className="text-sm text-muted-foreground">{party.email}</p>}
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Party
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">No parties added yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
