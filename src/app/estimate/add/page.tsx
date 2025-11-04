'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, UserPlus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, addDocumentNonBlocking, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddPartyPage() {
    const { user, isLoading: isUserLoading } = useUser();
    const [partyName, setPartyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) {
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
            router.push('/estimate');
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
            <div className="p-4 md:p-8">
                 <div className="mb-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/estimate">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Party List
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <UserPlus className="h-6 w-6" />
                           Add New Party
                        </CardTitle>
                        <CardDescription>Enter the details of the new party to create an estimate.</CardDescription>
                    </CardHeader>
                     {isUserLoading ? (
                        <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin" /></div>
                    ) : (
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
                                <Label htmlFor="email">Email Address (Optional)</Label>
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
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
