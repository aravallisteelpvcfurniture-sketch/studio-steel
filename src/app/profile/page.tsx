
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth, useUser, setDocumentNonBlocking, useMemoFirebase, useFirestore, useStorage } from "@/firebase";
import { uploadFile } from '@/firebase/storage';
import { useRouter } from 'next/navigation';
import { Loader2, Building, Upload, QrCode, Landmark } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

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
    displayName?: string;
    companyInfo?: CompanyInfo;
    bankDetails?: BankDetails;
    upiDetails?: UpiDetails;
}

export default function ProfilePage() {
    const { user, isLoading: isUserLoading } = useUser();
    const auth = useAuth();
    const firestore = useFirestore();
    const storage = useStorage();
    const router = useRouter();
    const { toast } = useToast();

    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({});
    const [bankDetails, setBankDetails] = useState<BankDetails>({});
    const [upiDetails, setUpiDetails] = useState<UpiDetails>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const logoInputRef = useRef<HTMLInputElement>(null);
    const qrInputRef = useRef<HTMLInputElement>(null);

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);
    

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'qrCodeUrl') => {
        if (!storage || !user) return;
        const file = event.target.files?.[0];
        if (file) {
            setIsSaving(true);
            try {
                const filePath = `user_uploads/${user.uid}/${field === 'logoUrl' ? 'logo' : 'qr'}/${Date.now()}_${file.name}`;
                const downloadURL = await uploadFile(storage, file, filePath);
                if (field === 'logoUrl') {
                    setCompanyInfo(p => ({...p, logoUrl: downloadURL}));
                } else {
                    setUpiDetails(p => ({...p, qrCodeUrl: downloadURL}));
                }
                toast({ title: "Image Uploaded", description: "Image has been uploaded successfully." });
            } catch (error) {
                toast({ variant: 'destructive', title: "Upload Failed", description: "Could not upload the image." });
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userProfileRef) return;
        setIsSaving(true);
        try {
            const dataToSave: Partial<UserProfileData> = {
                companyInfo,
                bankDetails,
                upiDetails,
                displayName: user?.displayName || '',
            };
            setDocumentNonBlocking(userProfileRef, dataToSave, { merge: true });
            toast({ title: "Profile Saved", description: "Your details have been updated." });
        } catch (error) {
            toast({ variant: 'destructive', title: "Save Failed", description: "Could not save your details." });
        } finally {
            setIsSaving(false);
        }
    }
    
    if (isUserLoading) {
        return (
            <div className="flex h-full items-center justify-center pt-24">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-4 md:p-8 text-center pt-24">
                 <p>You must be logged in to view this page.</p>
                 <Button onClick={() => router.push('/login')} className="mt-4">Go to Login</Button>
            </div>
        )
    }

  return (
    <div className="bg-background min-h-full">
        <form onSubmit={handleSaveChanges}>
            <main className="p-6 space-y-6 z-10 relative">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Building className="h-6 w-6" />
                           Company Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" value={companyInfo.companyName || ''} onChange={(e) => setCompanyInfo(p => ({...p, companyName: e.target.value}))} />
                            </div>
                             <div className="space-y-2">
                                <Label>Company Logo</Label>
                                <div className="flex items-center gap-4">
                                     {companyInfo.logoUrl && <Avatar><AvatarImage src={companyInfo.logoUrl} /></Avatar>}
                                     <Button type="button" variant="outline" onClick={() => logoInputRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" /> Upload
                                    </Button>
                                    <Input type="file" ref={logoInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'logoUrl')} accept="image/*" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input id="mobile" value={companyInfo.mobile || ''} onChange={(e) => setCompanyInfo(p => ({...p, mobile: e.target.value}))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" value={companyInfo.email || ''} onChange={(e) => setCompanyInfo(p => ({...p, email: e.target.value}))} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">Company Address</Label>
                                <Input id="address" value={companyInfo.address || ''} onChange={(e) => setCompanyInfo(p => ({...p, address: e.target.value}))} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Landmark /> Bank Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="holderName">Account Holder Name</Label>
                            <Input id="holderName" value={bankDetails.holderName || ''} onChange={(e) => setBankDetails(p => ({...p, holderName: e.target.value}))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Account Number</Label>
                             <Input id="accountNumber" value={bankDetails.accountNumber || ''} onChange={(e) => setBankDetails(p => ({...p, accountNumber: e.target.value}))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ifscCode">IFSC Code</Label>
                            <Input id="ifscCode" value={bankDetails.ifscCode || ''} onChange={(e) => setBankDetails(p => ({...p, ifscCode: e.target.value}))} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><QrCode /> UPI Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input id="upiId" value={upiDetails.upiId || ''} onChange={(e) => setUpiDetails(p => ({...p, upiId: e.target.value}))} />
                        </div>
                        <div className="space-y-2">
                            <Label>QR Code Image</Label>
                            <div className="flex items-center gap-4">
                                {upiDetails.qrCodeUrl && <Image src={upiDetails.qrCodeUrl} alt="UPI QR Code" width={64} height={64} className="rounded-md border p-1"/>}
                                <Button type="button" variant="outline" onClick={() => qrInputRef.current?.click()}>
                                    <Upload className="mr-2 h-4 w-4" /> Upload
                                </Button>

                                <Input type="file" ref={qrInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'qrCodeUrl')} accept="image/*" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                 <div className="py-4">
                    <Button type="submit" disabled={isSaving} size="lg" className="w-full">
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save All Changes'}
                    </Button>
                </div>

            </main>
        </form>
    </div>
  );
}
