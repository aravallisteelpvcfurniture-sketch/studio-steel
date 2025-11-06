'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ChevronLeft, User, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignIn(auth, email, password);
  };
  

  return (
    <div className="min-h-screen bg-primary flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 text-white flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
        <Link href="#" className="text-sm font-medium">
          Forgot your password?
        </Link>
      </div>
      <div className="bg-background rounded-t-[3rem] p-8 pt-12 mt-4 flex-grow">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold">Let's get something</h1>
          <p className="text-muted-foreground">Good to see you back.</p>
        </div>
        
        <p className="text-center text-sm text-muted-foreground my-4">or use your email account</p>
        
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 rounded-xl h-12 bg-muted border-muted"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 rounded-xl h-12 bg-muted border-muted"
            />
          </div>
          <Button type="submit" className="w-full h-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
            SIGN IN
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

    