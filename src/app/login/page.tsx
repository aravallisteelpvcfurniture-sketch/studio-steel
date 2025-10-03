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
import { Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth-layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e: React.FormEvent) => {
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

    try {
      initiateEmailSignIn(auth, email, password);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
      });
      setIsLoading(false);
    }
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
      <div className="flex flex-col justify-center h-full w-full max-w-sm mx-auto px-4">
        <div className="text-left mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-primary">
            Login
          </h2>
        </div>
        <form onSubmit={handleLogin} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 text-base rounded-full px-6"
            />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 text-base rounded-full px-6"
            />
             <div className="flex items-center justify-end mt-1">
                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>
          </div>
          <Button className="w-full h-12 text-base rounded-full mt-6" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          New Here?{' '}
          <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
