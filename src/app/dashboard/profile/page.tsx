'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { ChevronRight, User as UserIcon, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    if (auth) {
      signOut(auth).then(() => {
        router.push('/login');
      });
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  const profileOptions = [
    { icon: UserIcon, label: 'Edit Profile', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: HelpCircle, label: 'Help & Support', href: '#' },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 h-28 text-center rounded-b-[2rem] flex items-center justify-center">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>
      
      <main className="flex-grow">
        <div className="bg-background rounded-t-[2rem] p-6 h-full">
          <div className="flex flex-col items-center -mt-12">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile picture"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold text-foreground mt-2">{user.displayName || 'User'}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="space-y-2 mt-8">
            {profileOptions.map((option) => (
              <Link href={option.href} key={option.label}>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-4">
                    <option.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{option.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-4" />
              <span className="font-medium">Log Out</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
