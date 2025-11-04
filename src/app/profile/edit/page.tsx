
'use client';

import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateProfile } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const profileSchema = z.object({
    displayName: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits').max(15, 'Mobile number is too long').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();

    const userDocRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            displayName: '',
            email: '',
            mobileNumber: '',
        },
    });
    
    useEffect(() => {
        if (user) {
            form.reset({
                displayName: user.displayName || '',
                email: user.email || '',
                mobileNumber: '', // will be populated from firestore
            });
        }
    }, [user, form]);
    
    // Fetch mobileNumber separately from firestore
    useEffect(() => {
        if (firestore && userDocRef) {
            const unsub = onSnapshot(userDocRef, (doc) => {
                const data = doc.data();
                if (data && data.mobileNumber) {
                    form.setValue('mobileNumber', data.mobileNumber);
                }
            });
            return () => unsub();
        }
    }, [firestore, userDocRef, form])


    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        if (!auth?.currentUser || !userDocRef) {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to update your profile.',
            });
            return;
        }

        try {
            // Update Firebase Auth display name
            if(auth.currentUser.displayName !== data.displayName){
                await updateProfile(auth.currentUser, { displayName: data.displayName });
            }

            // Update Firestore document
            const firestoreData: { displayName: string; mobileNumber?: string; username?: string; email: string; } = {
                displayName: data.displayName,
                email: data.email,
                username: data.displayName,
            };
            if(data.mobileNumber){
                firestoreData.mobileNumber = data.mobileNumber;
            }
            
            setDocumentNonBlocking(userDocRef, firestoreData, { merge: true });
            
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            });
            router.push('/profile');

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: error.message || 'An unexpected error occurred.',
            });
        }
    };

    if (isUserLoading) {
        return (
            <AppLayout>
                <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </AppLayout>
        );
    }
    
    return (
        <AppLayout>
             <div className="p-4 md:p-8">
                <div className="mb-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/profile">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Profile
                        </Link>
                    </Button>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly disabled />
                                            </FormControl>
                                             <FormDescription>
                                                You cannot change your email address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mobileNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input type="tel" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <CardFooter className="p-0 pt-4">
                                    <Button type="submit" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
