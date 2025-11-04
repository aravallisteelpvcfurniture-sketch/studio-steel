'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser, setDocument } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth-layout";

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

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
    if (!auth || !firestore) return;
    
    if (!firstName || !lastName || !userName || !password || !dateOfBirth) {
        toast({
            variant: "destructive",
            title: "Signup Failed",
            description: "Please fill out all required fields.",
        });
        return;
    }
    setIsLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`;
      // Note: Using a dummy domain for email because Firebase Auth requires a valid email format.
      // The actual unique identifier for login will be the username via your app logic.
      const userCredential = await createUserWithEmailAndPassword(auth, `${userName}@example.com`, password); 
      const newUser = userCredential.user;
      
      if (newUser) {
        await updateProfile(newUser, { displayName: fullName });
        const userDocRef = doc(firestore, "users", newUser.uid);
        
        const userData = {
          id: newUser.uid,
          email: newUser.email,
          displayName: fullName,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          dateOfBirth: dateOfBirth,
          signUpDate: serverTimestamp(),
        };
        await setDocument(userDocRef, userData, { merge: true });
        toast({
          title: "Signup Successful",
          description: "Welcome! You are now logged in.",
        })
        router.push('/');
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This username is already taken. Please choose another one.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. It should be at least 6 characters long.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
      });
    } finally {
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
        <h2 className="text-3xl font-bold text-center mb-8">Sign up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex gap-4">
                <div className="space-y-2 w-1/2">
                    <Label htmlFor="first-name" className="font-semibold">First Name</Label>
                    <Input 
                      id="first-name" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      required 
                      placeholder="your FirstName"
                      className="bg-secondary rounded-lg h-12"
                    />
                </div>
                 <div className="space-y-2 w-1/2">
                    <Label htmlFor="last-name" className="font-semibold">Last Name</Label>
                    <Input 
                      id="last-name" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      required 
                      placeholder="your lastName"
                      className="bg-secondary rounded-lg h-12"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="username" className="font-semibold">UserName</Label>
                <Input 
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="Enter your Username"
                  className="bg-secondary rounded-lg h-12"
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"  className="font-semibold">Password</Label>
               <Input 
                  id="password" 
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your Password"
                  className="bg-secondary rounded-lg h-12"
                />
            </div>
             <div className="space-y-2">
              <Label htmlFor="dob" className="font-semibold">Date of birth</Label>
              <Input 
                  id="dob" 
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  placeholder="Enter your date"
                  className="bg-secondary rounded-lg h-12"
                />
            </div>
            <Button className="w-full h-12 text-lg rounded-full font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white mt-4" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign up'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Login
            </Link>
          </p>
    </AuthLayout>
  );
}
