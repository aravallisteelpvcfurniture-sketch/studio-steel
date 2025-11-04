'use client';

import { useState, useEffect } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirestore, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Settings, Building, Phone, Mail, Image as ImageIcon } from 'lucide-react';

type CompanyInfo = {
    companyName?: string;
    logoUrl?: string;
    mobile?: string;
    email?: string;
};

const DUMMY_USER_ID = 'dummy-user';

export default function SettingsPage() {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
        companyName: '',
        logoUrl: '',
        mobile: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore) return null;
        // Using a dummy user ID since auth is removed
        return doc(firestore, 'users', DUMMY_USER_ID);
    }, [firestore]);
    
    const { data: userProfile, isLoading: isLoadingProfile } = useDoc<{companyInfo?: CompanyInfo}>(userProfileRef);

    useEffect(() => {
        if (userProfile?.companyInfo) {
            setCompanyInfo(userProfile.companyInfo);
        }
    }, [userProfile]);

    const handleInputChange = (field: keyof CompanyInfo, value: string) => {
        setCompanyInfo(prev => ({...prev, [field]: value}));
    };

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !userProfileRef) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Firestore not available.",
            });
            return;
        }
        
        setIsLoading(true);

        try {
            await setDocumentNonBlocking(userProfileRef, { companyInfo }, { merge: true });
            toast({
                title: "Settings Saved!",
                description: "Your company information has been updated.",
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
    
    const showLoader = isLoadingProfile;

    return (
        <AppLayout>
            <div className="p-4 md:p-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Settings className="h-6 w-6" />
                           My Settings
                        </CardTitle>
                        <CardDescription>Manage your company information for greeting posters.</CardDescription>
                    </CardHeader>
                    {showLoader ? (
                        <div className="flex justify-center items-center p-10">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <form onSubmit={handleSaveChanges}>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name</Label>
                                        <div className='relative'>
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="companyName" placeholder="Your Company Name" value={companyInfo.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} className="pl-9"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="logoUrl">Logo URL</Label>
                                         <div className='relative'>
                                             <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="logoUrl" placeholder="https://example.com/logo.png" value={companyInfo.logoUrl} onChange={(e) => handleInputChange('logoUrl', e.target.value)} className="pl-9"/>
                                        </div>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number</Label>
                                         <div className='relative'>
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="mobile" placeholder="+91 12345 67890" value={companyInfo.mobile} onChange={(e) => handleInputChange('mobile', e.target.value)} className="pl-9"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                         <div className='relative'>
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="email" type="email" placeholder="contact@example.com" value={companyInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} className="pl-9"/>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </form>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
