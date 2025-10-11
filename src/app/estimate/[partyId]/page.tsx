'use client';

import { useState, useEffect } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Trash2, Plus, MessageSquare } from "lucide-react";
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from '@/components/ui/separator';

type Party = {
    partyName: string;
    mobile: string;
    email?: string;
};

type EstimateItem = {
    id: number;
    title: string;
    height: number | string;
    width: number | string;
    sqft: number;
    price: number | string;
    total: number;
};

export default function CreateEstimatePage() {
    const [items, setItems] = useState<EstimateItem[]>([]);
    const [nextId, setNextId] = useState(1);
    
    const firestore = useFirestore();
    const { user } = useUser();
    const params = useParams();
    const partyId = params.partyId as string;

    const partyDocRef = useMemoFirebase(() => {
        if (!firestore || !user || !partyId) return null;
        return doc(firestore, 'users', user.uid, 'parties', partyId);
    }, [firestore, user, partyId]);

    const { data: party, isLoading: isLoadingParty } = useDoc<Party>(partyDocRef);

    const addNewItem = () => {
        setItems([...items, { id: nextId, title: '', height: '', width: '', sqft: 0, price: '', total: 0 }]);
        setNextId(nextId + 1);
    };

    const handleItemChange = (id: number, field: keyof EstimateItem, value: string) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newItem = { ...item, [field]: value };

                const height = parseFloat(String(newItem.height));
                const width = parseFloat(String(newItem.width));
                
                if (!isNaN(height) && !isNaN(width) && height > 0 && width > 0) {
                    newItem.sqft = parseFloat((height * width).toFixed(2));
                } else {
                    newItem.sqft = 0;
                }
                
                const price = parseFloat(String(newItem.price));

                if (!isNaN(newItem.sqft) && !isNaN(price) && newItem.sqft > 0 && price > 0) {
                    newItem.total = parseFloat((newItem.sqft * price).toFixed(2));
                } else {
                    newItem.total = 0;
                }
                
                return newItem;
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const overallTotal = items.reduce((sum, item) => sum + item.total, 0);
    const overallSqFt = items.reduce((sum, item) => sum + item.sqft, 0);

    const shareOnWhatsApp = () => {
        if (!party) return;

        let message = `*Estimate for: ${party.partyName}*\n`;
        message += `Mobile: ${party.mobile}\n\n`;
        message += '*--- Items ---*\n';

        items.forEach((item, index) => {
            if (item.title) {
                message += `*${index + 1}. ${item.title}*\n`;
                message += `   - Size: ${item.height} x ${item.width}\n`;
                message += `   - SqFt: ${item.sqft}\n`;
                message += `   - Rate: ₹${item.price}/sqft\n`;
                message += `   - Amount: *₹${item.total.toFixed(2)}*\n\n`;
            }
        });

        message += `*--- Total ---*\n`;
        message += `Total SqFt: *${overallSqFt.toFixed(2)}*\n`;
        message += `*Grand Total: ₹${overallTotal.toFixed(2)}*\n\n`;
        message += `From:\n*Aravalli Steel PVC Furniture*`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/estimate">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Party List
                        </Link>
                    </Button>
                </div>
                
                {isLoadingParty ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
                ) : party ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Estimate</CardTitle>
                            <CardDescription>
                                For: <span className="font-semibold text-foreground">{party.partyName}</span> ({party.mobile})
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {items.map((item, index) => (
                                <div key={item.id} className="p-4 border rounded-lg space-y-4 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeItem(item.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`title-${item.id}`}>Product Title</Label>
                                            <Input id={`title-${item.id}`} placeholder="e.g., PVC Wall Panel" value={item.title} onChange={e => handleItemChange(item.id, 'title', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                                        <div className="space-y-2">
                                            <Label htmlFor={`height-${item.id}`}>Height</Label>
                                            <Input id={`height-${item.id}`} type="number" placeholder="e.g., 10" value={item.height} onChange={e => handleItemChange(item.id, 'height', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`width-${item.id}`}>Width</Label>
                                            <Input id={`width-${item.id}`} type="number" placeholder="e.g., 4.5" value={item.width} onChange={e => handleItemChange(item.id, 'width', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>SqFt</Label>
                                            <Input value={item.sqft} disabled className="font-semibold" />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor={`price-${item.id}`}>Price (₹/sqft)</Label>
                                            <Input id={`price-${item.id}`} type="number" placeholder="e.g., 150" value={item.price} onChange={e => handleItemChange(item.id, 'price', e.target.value)} />
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-end items-center gap-4">
                                        <span className="font-semibold">Item Total:</span>
                                        <span className="text-lg font-bold text-foreground">₹{item.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}

                            <Button variant="outline" onClick={addNewItem}>
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Button>

                        </CardContent>
                         {items.length > 0 && (
                            <CardFooter className="flex-col items-stretch gap-4">
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <div className="text-sm text-muted-foreground">Total SqFt: <span className="font-bold text-foreground">{overallSqFt.toFixed(2)}</span></div>
                                        <div className="text-xl font-bold">Grand Total</div>
                                    </div>
                                    <div className="text-2xl font-bold text-primary">₹{overallTotal.toFixed(2)}</div>
                                </div>
                                <Button onClick={shareOnWhatsApp} size="lg">
                                    <MessageSquare className="mr-2 h-5 w-5" /> Share on WhatsApp
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ) : (
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-destructive">Party Not Found</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>The requested party could not be found. It may have been deleted.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
