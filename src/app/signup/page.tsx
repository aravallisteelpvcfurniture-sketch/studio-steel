'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser, setDocumentNonBlocking } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Loader2, KeyRound } from "lucide-react";
import { Wave } from "@/components/ui/wave";

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
      }
    } catch (error: any) {
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-600">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-600 p-4">
      <Card className="w-full max-w-md overflow-hidden border-0 shadow-2xl">
         <div className="relative bg-primary text-primary-foreground p-8">
            <Wave />
            <div className="relative z-10">
                <p className="text-lg text-primary-foreground/80">Hello,</p>
                <h1 className="text-4xl font-bold">Sign Up!</h1>
            </div>
        </div>
        <form onSubmit={handleSignup}>
          <CardContent className="grid gap-6 p-8">
             <div className="grid gap-2">
                <Label htmlFor="full-name">User Name</Label>
                <Input
                  id="full-name"
                  placeholder="Jacob Josef"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="jacob@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-base pr-10"
              />
               <KeyRound className="absolute right-3 top-[2.4rem] h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-8 pt-0">
            <Button className="w-full h-12 text-base" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
            </Button>
           <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
