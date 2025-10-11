'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EstimatePage() {
    const [partyName, setPartyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: Save party details to Firestore

        setTimeout(() => {
            toast({
                title: "Party Added",
                description: `${partyName} has been added successfully.`,
            });
            setPartyName('');
            setMobile('');
            setEmail('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <AppLayout>
            <div className="p-4 md:p-8">
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
            </div>
        </AppLayout>
    );
}
