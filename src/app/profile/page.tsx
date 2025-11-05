'use client';

import BottomNav from '@/components/BottomNav';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 pb-24 text-center">
        <h1 className="text-2xl font-bold mt-8">Profile</h1>
        <p className="text-muted-foreground">Your user profile</p>
      </div>
      <BottomNav />
    </div>
  );
}
