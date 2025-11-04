'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, Users } from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { WithId } from '@/firebase';
import Link from "next/link";
import { useRouter } from "next/navigation";

type Party = {
    partyName: string;
    mobile: string;
    email?: string;
    userId: string;
    createdAt: any;
};

export default function EstimatePage() {
    const firestore = useFirestore();
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUser();

    const partiesQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'users', user.uid, 'parties'), orderBy('createdAt', 'desc'));
    }, [firestore, user]);

    const { data: parties, isLoading: isLoadingParties } = useCollection<Party>(partiesQuery);

    const handlePartyClick = (partyId: string) => {
        router.push(`/estimate/${partyId}`);
    };

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-6 w-6" />
                                Party List
                            </CardTitle>
                            <CardDescription>Select a party to create or view an estimate.</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/estimate/add">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add New Party
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isUserLoading || isLoadingParties ? (
                             <div className="flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : parties && parties.length > 0 ? (
                            <div className="space-y-4">
                                {parties.map((party: WithId<Party>) => (
                                    <div 
                                        key={party.id} 
                                        className="p-4 border rounded-lg bg-muted/50 flex justify-between items-center cursor-pointer hover:bg-muted"
                                        onClick={() => handlePartyClick(party.id)}
                                    >
                                        <div>
                                            <p className="font-semibold text-foreground">{party.partyName}</p>
                                            <p className="text-sm text-muted-foreground">{party.mobile}</p>
                                            {party.email && <p className="text-sm text-muted-foreground">{party.email}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="text-center py-8">
                                <p className="text-muted-foreground mb-4">No parties added yet.</p>
                                <Button asChild>
                                     <Link href="/estimate/add">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add your first party
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
