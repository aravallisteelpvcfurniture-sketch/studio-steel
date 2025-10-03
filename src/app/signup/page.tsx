'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useAuth, useUser, setDocumentNonBlocking } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
        toast({
            variant: "destructive",
            title: "Signup Failed",
            description: "Please fill out all required fields.",
        });
        return;
    }
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      if (newUser) {
        const userDocRef = doc(firestore, "users", newUser.uid);
        const [firstName, ...lastName] = fullName.split(' ');
        const userData = {
          id: newUser.uid,
          email: newUser.email,
          firstName: firstName || '',
          lastName: lastName.join(' ') || '',
          signUpDate: serverTimestamp(),
        };
        setDocumentNonBlocking(userDocRef, userData, { merge: true });
        // The useEffect will handle the redirect on user state change
      }
    } catch (error: any) => {
      toast({
        variant: "destructive",
        title: "Signup Failed",
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
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
       <div className="relative hidden flex-col items-center justify-center bg-gray-900 p-8 text-white md:flex">
        <Image
          src="https://picsum.photos/seed/signup/1200/800"
          alt="Stylish modern chair"
          fill
          className="absolute inset-0 object-cover opacity-30"
          data-ai-hint="stylish chair"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-tighter">Aravalli Home Studio</h1>
          <p className="mt-4 text-lg text-gray-300">
            Join us and discover furniture that defines your space.
          </p>
        </div>
      </div>
       <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm">
           <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Create an Account
            </h2>
            <p className="mt-2 text-muted-foreground">
              Enter your details below to get started.
            </p>
          </div>
          <form onSubmit={handleSignup} className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="h-12 text-base"/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            <Button className="w-full h-12 text-base" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
