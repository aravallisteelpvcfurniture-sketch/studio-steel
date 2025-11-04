'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { initiateEmailSignIn, initiateGoogleSignIn, initiateTwitterSignIn, initiateFacebookSignIn } from '@/firebase/non-blocking-login';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Facebook, Twitter } from 'lucide-react';
import AuthLayout from '@/components/auth-layout';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.23,44,30.025,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Please enter both email and password.",
        });
        return;
    }
    setIsLoading(true);

    initiateEmailSignIn(auth, email, password);
    
    // This is a fallback for displaying an error if Firebase takes too long or fails silently
    setTimeout(() => {
        if (!auth?.currentUser) {
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",
            });
        }
    }, 3000);
  };

  const handleGoogleLogin = () => {
    if (auth && firestore) initiateGoogleSignIn(auth, firestore);
  };
  const handleTwitterLogin = () => {
    if (auth && firestore) initiateTwitterSignIn(auth, firestore);
  };
  const handleFacebookLogin = () => {
    if (auth && firestore) initiateFacebookSignIn(auth, firestore);
  };
  
  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthLayout>
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">UserName</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-secondary rounded-lg h-12"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password"  className="font-semibold">Password</Label>
                <Input 
                    id="password" 
                    type='password'
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary rounded-lg h-12"
                />
            </div>
            <Button className="w-full h-12 text-lg rounded-full font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
            </Button>
        </form>

        <div className="text-center my-6">
            <p className="text-muted-foreground text-sm">OR</p>
        </div>

        <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2" onClick={handleGoogleLogin}><GoogleIcon /></Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2" onClick={handleTwitterLogin}><Twitter className="text-sky-500" /></Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2" onClick={handleFacebookLogin}><Facebook className="text-blue-600" /></Button>
        </div>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold text-primary hover:underline">
            signup
            </Link>
        </p>
    </AuthLayout>
  );
}
