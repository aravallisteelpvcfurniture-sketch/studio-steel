'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { initiateEmailSignIn, initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.94H12V14.49H18.02C17.73 15.99 16.96 17.32 15.82 18.12V20.59H19.5C21.43 18.84 22.56 15.84 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C14.97 23 17.45 22.01 19.5 20.59L15.82 18.12C14.79 18.79 13.48 19.18 12 19.18C9.26 19.18 6.9 17.39 5.96 14.9H2.18V17.38C4.16 21.09 7.79 23 12 23Z" fill="#34A853"/>
        <path d="M5.96 14.9C5.73 14.23 5.6 13.52 5.6 12.75C5.6 11.98 5.73 11.27 5.96 10.6L2.18 8.12C1.44 9.57 1 11.1 1 12.75C1 14.4 1.44 15.93 2.18 17.38L5.96 14.9Z" fill="#FBBC05"/>
        <path d="M12 5.82C13.66 5.82 15.06 6.45 16.2 7.5L19.57 4.23C17.45 2.37 14.97 1.25 12 1.25C7.79 1.25 4.16 3.91 2.18 8.12L5.96 10.6C6.9 8.11 9.26 5.82 12 5.82Z" fill="#EA4335"/>
    </svg>
);


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const firestore = useFirestore();
    const router = useRouter();
    const { user, isLoading } = useUser();
    const { toast } = useToast();

    useEffect(() => {
        if (!isLoading && user) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    const handleEmailSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            initiateEmailSignIn(auth, email, password);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Sign-in Failed',
                description: error.message || 'An unexpected error occurred.',
            });
        }
    };
    
    const handleGoogleSignIn = () => {
        initiateGoogleSignIn(auth, firestore);
    };

    if (isLoading || user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );
    }
    
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Welcome back! Please sign in to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="you@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                             <Label htmlFor="password">Password</Label>
                             <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                     <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white">
                        Sign In
                    </Button>
                </form>

                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" onClick={handleGoogleSignIn}>
                        <GoogleIcon />
                        Google
                    </Button>
                </div>

            </CardContent>
            <CardFooter className="justify-center text-sm">
                <p>Don't have an account? <Link href="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link></p>
            </CardFooter>
        </Card>
    );
}