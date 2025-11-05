'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { initiateEmailSignIn, initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Loader2, User, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
                title: 'Login Failed',
                description: error.message || 'An unexpected error occurred.',
            });
        }
    };
    
    const handleGoogleSignIn = () => {
        initiateGoogleSignIn(auth, firestore);
    };

    if (isLoading || user) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-full">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Let's get something</h2>
                <p className="text-muted-foreground">Good to see you back.</p>
            </div>
            
            <div className="flex items-center justify-center gap-4 my-6">
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={handleGoogleSignIn}>
                    <GoogleIcon />
                </Button>
                {/* Placeholder for other social logins */}
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12" disabled>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v7.9c4.56-.93 8-4.96 8-9.9z"/></svg>
                </Button>
                 <Button variant="outline" size="icon" className="rounded-full h-12 w-12" disabled>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.36-.21-1.94-.53v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.94 4.03 2.97-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.9 1.22 4.16 1.92 6.56 1.92 7.88 0 12.2-6.54 12.2-12.2 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.22z"/></svg>
                </Button>
            </div>
            
            <form onSubmit={handleEmailSignIn} className="space-y-4 flex-grow flex flex-col justify-center">
                <div>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="pl-12 h-14"
                        />
                    </div>
                    <div className="relative mt-4">
                         <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="pl-12 h-14"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="remember-me" />
                            <Label htmlFor="remember-me" className="text-muted-foreground">Remember me</Label>
                        </div>
                         <Link href="#" className="text-sm text-accent-foreground/80 hover:underline">Forgot password?</Link>
                    </div>
                </div>
                
                <div className="pt-2">
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base h-14 mt-6">
                        LOGIN
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-4">Don't have an account? <Link href="/signup" className="font-semibold text-foreground hover:underline">Sign Up</Link></p>
                </div>
            </form>
        </div>
    );
}
