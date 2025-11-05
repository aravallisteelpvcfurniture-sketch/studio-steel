'use client';

import BottomNav from '@/components/BottomNav';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 pb-24 text-center">
        <h1 className="text-2xl font-bold mt-8">Favorites</h1>
        <p className="text-muted-foreground">Your favorite items</p>
      </div>
      <BottomNav />
    </div>
  );
}
