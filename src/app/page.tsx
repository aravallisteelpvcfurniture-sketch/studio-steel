'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the signup page immediately
    router.replace('/signup');
  }, [router]);

  // This component will not render anything visible as it redirects instantly.
  return null;
}
