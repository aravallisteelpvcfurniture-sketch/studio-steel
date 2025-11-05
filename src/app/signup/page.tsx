'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { initiateEmailSignUp, initiateGoogleSignIn, initiateFacebookSignIn } from '@/firebase/non-blocking-login';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Mail, User, Lock, Facebook, Twitter } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.317-11.275-7.746l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.57,34,48,28.686,48,24C48,22.659,47.862,21.35,47.611,20.083z"
    />
  </svg>
);

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignUp(auth, email, password);
    router.push('/login');
  };

  const handleGoogleSignIn = () => {
    initiateGoogleSignIn(auth);
  };
  
  const handleFacebookSignIn = () => {
    initiateFacebookSignIn(auth);
  };

  return (
    <div className="min-h-screen bg-primary">
       <div className="flex justify-between items-center p-4 text-white">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
        <Link href="#" className="text-sm font-medium">
          Need some help?
        </Link>
      </div>
      <div className="bg-background rounded-t-[3rem] p-8 pt-12 mt-4 min-h-[calc(100vh-80px)]">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold">Getting started</h1>
          <p className="text-muted-foreground">Create account to continue!</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={handleGoogleSignIn}><GoogleIcon /></Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-[#3b5998] text-white" onClick={handleFacebookSignIn}><Facebook /></Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-[#1DA1F2] text-white"><Twitter /></Button>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="relative">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="mithunrayy@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 rounded-xl h-12 bg-muted border-muted"
            />
          </div>
          <div className="relative">
             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="username"
              placeholder="I'm_mithun"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            SIGN UP
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
