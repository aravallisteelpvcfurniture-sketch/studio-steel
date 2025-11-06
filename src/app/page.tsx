'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';

export default function WelcomePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    // If auth state is still loading, do nothing.
    if (isUserLoading) {
      return;
    }

    // If user is already logged in, redirect to dashboard.
    if (user) {
      router.replace('/dashboard');
      return;
    }

    // If user is not logged in and auth is available, initiate Google sign-in.
    if (!user && auth) {
      initiateGoogleSignIn(auth);
    }
  }, [user, isUserLoading, router, auth]);

  // Show a loading indicator while checking auth state or redirecting.
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <p className="text-foreground animate-pulse">Loading...</p>
    </div>
  );
}
