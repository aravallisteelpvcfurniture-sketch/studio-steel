'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { handleSocialSignIn } from '@/firebase/non-blocking-login';
import { Building, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="h-screen w-full bg-primary flex flex-col">
      <header className="flex-shrink-0 h-[35vh] flex flex-col items-center justify-center text-primary-foreground">
        <Building size={64} />
        <h1 className="text-4xl font-bold mt-4">Aravalli Steel</h1>
      </header>
      <main className="flex-1 bg-background rounded-t-[2.5rem] p-8 flex flex-col">
         <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="name" placeholder="Your Name" className="pl-10" required />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground h-12 rounded-full font-bold text-lg">
              Sign Up
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
             <Button
              variant="outline"
              className="w-full h-12 rounded-full"
              onClick={() => handleSocialSignIn('google')}
            >
              <svg
                className="mr-2 h-5 w-5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8S109.8 11.6 244 11.6C303.4 11.6 355.2 33.4 394.8 68.4l-49.4 49.4C319.8 92.6 284.8 77.2 244 77.2c-88.6 0-160.2 71.6-160.2 160.2s71.6 160.2 160.2 160.2c97.4 0 138.9-67.6 143.8-102.3H244v-78.4h239.1c2.3 12.7 3.9 26.1 3.9 40.5z"
                ></path>
              </svg>
              Google
            </Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="font-semibold text-accent">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
