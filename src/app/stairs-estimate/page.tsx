'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, MessageSquare, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function StairsEstimatePage() {
    const [marche, setMarche] = useState<number | string>('');
    const [ratePerMarche, setRatePerMarche] = useState<number | string>('');
    const [railingRate, setRailingRate] = useState<number | string>(0);
    const [otherCharges, setOtherCharges] = useState<number | string>(0);

    const marcheValue = Number(marche) || 0;
    const ratePerMarcheValue = Number(ratePerMarche) || 0;
    const railingRateValue = Number(railingRate) || 0;
    const otherChargesValue = Number(otherCharges) || 0;
    
    const marcheTotal = marcheValue * ratePerMarcheValue;
    const grandTotal = marcheTotal + railingRateValue + otherChargesValue;

    const shareOnWhatsApp = () => {
        let message = `*Stairs Estimate*\n\n`;
        message += `*--- Details ---*\n`;
        message += `Marche (Steps): *${marcheValue}*\n`;
        message += `Rate per Marche: *₹${ratePerMarcheValue.toFixed(2)}*\n`;
        message += `Marche Total: *₹${marcheTotal.toFixed(2)}*\n\n`;
        message += `Railing Charges: *₹${railingRateValue.toFixed(2)}*\n`;
        message += `Other Charges: *₹${otherChargesValue.toFixed(2)}*\n\n`;
        message += `*--- Total ---*\n`;
        message += `*Grand Total: ₹${grandTotal.toFixed(2)}*\n\n`;
        message += `From:\n*Aravalli Steel PVC Furniture*`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">Stairs Estimate</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Calculator className="h-6 w-6" />
                           Stairs Calculator
                        </CardTitle>
                        <CardDescription>Calculate the estimate for building stairs.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="marche">Marche (Number of Steps)</Label>
                                <Input 
                                    id="marche" 
                                    type="number" 
                                    placeholder="e.g., 18" 
                                    value={marche} 
                                    onChange={(e) => setMarche(e.target.value)} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ratePerMarche">Rate per Marche (₹)</Label>
                                <Input 
                                    id="ratePerMarche" 
                                    type="number" 
                                    placeholder="e.g., 1200" 
                                    value={ratePerMarche} 
                                    onChange={(e) => setRatePerMarche(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
                            <h3 className="font-semibold text-lg">Additional Charges</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="railingRate">Railing Charges (₹)</Label>
                                    <Input 
                                        id="railingRate" 
                                        type="number" 
                                        placeholder="Enter total railing cost" 
                                        value={railingRate} 
                                        onChange={(e) => setRailingRate(e.target.value)} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="otherCharges">Other Charges (₹)</Label>
                                    <Input 
                                        id="otherCharges" 
                                        type="number" 
                                        placeholder="e.g., transport, fitting" 
                                        value={otherCharges} 
                                        onChange={(e) => setOtherCharges(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                    </CardContent>
                    
                    {marcheValue > 0 && ratePerMarcheValue > 0 && (
                        <CardFooter className="flex-col items-stretch gap-4">
                            <Separator />
                             <div className="flex justify-between items-center py-4">
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Marche Total: <span className="font-semibold text-foreground">₹{marcheTotal.toFixed(2)}</span></p>
                                    <div className="text-xl font-bold">Grand Total</div>
                                </div>
                                <div className="text-2xl font-bold text-primary">₹{grandTotal.toFixed(2)}</div>
                            </div>
                            <Button onClick={shareOnWhatsApp} size="lg">
                                <MessageSquare className="mr-2 h-5 w-5" /> Share on WhatsApp
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
