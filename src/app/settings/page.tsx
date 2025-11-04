
'use client';

import { useState, useEffect } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirestore, useUser, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Settings, Building, Phone, Mail, Image as ImageIcon, Palette, Bell, User, ChevronRight, ArrowLeft, Banknote, Landmark, QrCode, Hash, UserSquare, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CompanyInfo = {
    companyName?: string;
    logoUrl?: string;
    mobile?: string;
    email?: string;
    address?: string;
};

type BankDetails = {
    accountNumber?: string;
    holderName?: string;
    ifscCode?: string;
};

type UpiDetails = {
    upiId?: string;
    qrCodeUrl?: string;
};

type UserProfileData = {
    companyInfo?: CompanyInfo;
    bankDetails?: BankDetails;
    upiDetails?: UpiDetails;
}

export default function SettingsPage() {
    const { user, isLoading: isUserLoading } = useUser();
    const router = useRouter();
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({});
    const [bankDetails, setBankDetails] = useState<BankDetails>({});
    const [upiDetails, setUpiDetails] = useState<UpiDetails>({});
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);
    
    const { data: userProfile, isLoading: isLoadingProfile } = useDoc<UserProfileData>(userProfileRef);

    useEffect(() => {
        if (userProfile) {
            setCompanyInfo(userProfile.companyInfo || {});
            setBankDetails(userProfile.bankDetails || {});
            setUpiDetails(userProfile.upiDetails || {});
        }
    }, [userProfile]);

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !userProfileRef) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Firestore not available or user not logged in.",
            });
            return;
        }
        
        setIsLoading(true);

        try {
            await setDocumentNonBlocking(userProfileRef, { companyInfo, bankDetails, upiDetails }, { merge: true });
            toast({
                title: "Settings Saved!",
                description: "Your information has been updated.",
            });
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Could not save settings. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const showLoader = isUserLoading || isLoadingProfile;

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center gap-4">
                     <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>
                
                <form onSubmit={handleSaveChanges} className="space-y-6">
                    {/* Company Info Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                               <Building className="h-6 w-6" />
                               Company Info
                            </CardTitle>
                            <CardDescription>Manage your company information for billing and posters.</CardDescription>
                        </CardHeader>
                        {showLoader ? (
                            <div className="flex justify-center items-center p-10">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name</Label>
                                        <div className='relative'>
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="companyName" placeholder="Your Company Name" value={companyInfo.companyName || ''} onChange={(e) => setCompanyInfo(p => ({...p, companyName: e.target.value}))} className="pl-9"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="logoUrl">Logo URL</Label>
                                         <div className='relative'>
                                             <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="logoUrl" placeholder="https://example.com/logo.png" value={companyInfo.logoUrl || ''} onChange={(e) => setCompanyInfo(p => ({...p, logoUrl: e.target.value}))} className="pl-9"/>
                                        </div>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number</Label>
                                         <div className='relative'>
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="mobile" placeholder="+91 12345 67890" value={companyInfo.mobile || ''} onChange={(e) => setCompanyInfo(p => ({...p, mobile: e.target.value}))} className="pl-9"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                         <div className='relative'>
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="email" type="email" placeholder="contact@example.com" value={companyInfo.email || ''} onChange={(e) => setCompanyInfo(p => ({...p, email: e.target.value}))} className="pl-9"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Company Address</Label>
                                        <div className='relative'>
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input id="address" placeholder="123 Business St, City, Country" value={companyInfo.address || ''} onChange={(e) => setCompanyInfo(p => ({...p, address: e.target.value}))} className="pl-9"/>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>

                    {/* Bank Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Landmark /> Bank Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="holderName">Account Holder Name</Label>
                                <div className='relative'>
                                    <UserSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="holderName" placeholder="e.g., John Doe" value={bankDetails.holderName || ''} onChange={(e) => setBankDetails(p => ({...p, holderName: e.target.value}))} className="pl-9"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <div className='relative'>
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="accountNumber" placeholder="Enter account number" value={bankDetails.accountNumber || ''} onChange={(e) => setBankDetails(p => ({...p, accountNumber: e.target.value}))} className="pl-9"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ifscCode">IFSC Code</Label>
                                <div className='relative'>
                                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="ifscCode" placeholder="Enter IFSC code" value={bankDetails.ifscCode || ''} onChange={(e) => setBankDetails(p => ({...p, ifscCode: e.target.value}))} className="pl-9"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* UPI Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><QrCode /> UPI Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="upiId">UPI ID</Label>
                                <div className='relative'>
                                    <UserSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="upiId" placeholder="your-upi@oksbi" value={upiDetails.upiId || ''} onChange={(e) => setUpiDetails(p => ({...p, upiId: e.target.value}))} className="pl-9"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="qrCodeUrl">QR Code Image URL</Label>
                                <div className='relative'>
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="qrCodeUrl" placeholder="https://example.com/qr.png" value={upiDetails.qrCodeUrl || ''} onChange={(e) => setUpiDetails(p => ({...p, qrCodeUrl: e.target.value}))} className="pl-9"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <CardFooter>
                        <Button type="submit" disabled={isLoading || showLoader} size="lg">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save All Changes
                        </Button>
                    </CardFooter>
                </form>

                {/* Other Settings */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Settings /> General Settings</CardTitle>
                        <CardDescription>Manage your personal and app preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="divide-y">
                         <Link href="/profile/edit" className="block">
                            <div className="flex items-center p-3 -mx-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                                <User className="h-5 w-5 mr-4 text-primary" />
                                <div className="flex-1">
                                    <p className="font-semibold">Edit Profile</p>
                                    <p className="text-sm text-muted-foreground">Update your name, and mobile number.</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Link>
                         <div className="flex items-center justify-between p-3 -mx-3">
                            <div>
                                <p className="font-semibold flex items-center gap-3"><Palette /> Theme</p>
                                <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
                            </div>
                            <ThemeSwitcher />
                        </div>
                        <div className="flex items-center justify-between p-3 -mx-3">
                            <div>
                                <p className="font-semibold flex items-center gap-3"><Bell/> Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive updates and alerts from the app.</p>
                            </div>
                            <Switch id="notifications-switch" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
