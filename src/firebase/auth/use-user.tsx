'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserAuth, type UserAuthServices } from '@/firebase/provider';

// Public pages that do not require authentication
const PUBLIC_PAGES: string[] = ['/login', '/signup'];

// Authentication-related pages
const AUTH_PAGES: string[] = ['/login', '/signup'];

/**
 * Hook `useUser` for managing user authentication state and page access control.
 *
 * This hook provides the user's authentication state and enforces page access
 * rules. It redirects users based on their authentication status and the page
 * they are trying to access.
 *
 * It is intended to be used in top-level components like `AppLayout` or individual
 * pages to ensure consistent authentication checks across the application.
 *
 * @returns {UserAuthServices} An object containing:
 *  - `user`: The authenticated user object, or `null` if not authenticated.
 *  - `isUserLoading`: A boolean indicating if the authentication state is being loaded.
 *  - `userError`: An error object if authentication fails, otherwise `null`.
 */
export function useUser(): UserAuthServices {
  const userAuth = useUserAuth();
  const { user, isUserLoading } = userAuth;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      // Do nothing while loading.
      return;
    }

    const isPublicPage = PUBLIC_PAGES.includes(pathname);
    const isAuthPage = AUTH_PAGES.includes(pathname);

    if (!user && !isPublicPage) {
      // If the user is not authenticated and the page is not public,
      // redirect to the login page.
      router.push('/login');
    } else if (user && isAuthPage) {
      // If the user is authenticated and trying to access an auth page (login/signup),
      // redirect to the home page.
      router.push('/');
    }
  }, [user, isUserLoading, pathname, router]);

  return userAuth;
}
