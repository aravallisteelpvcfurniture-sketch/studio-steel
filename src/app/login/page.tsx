'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth-layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
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
    
    setTimeout(() => {
        if (!auth.currentUser) {
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",
            });
        }
    }, 3000);
  };
  
  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthLayout title="Hello" subtitle="Sign in!">
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary font-semibold">Gmail</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="joydeo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border-0 border-b rounded-none px-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password"  className="text-primary font-semibold">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent border-0 border-b rounded-none px-1 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex items-center justify-end text-sm mt-2">
              <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
                  Forgot password?
              </Link>
          </div>
        </div>
        <Button className="w-full h-12 text-lg rounded-full font-bold bg-gradient-to-r from-red-600 via-red-700 to-purple-800 text-white" type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'SIGN IN'}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have account?{' '}
        <Link href="/signup" className="font-bold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
