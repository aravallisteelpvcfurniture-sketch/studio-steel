'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';


// Mock data for parties - this would typically come from an API or database
const parties = [
  { id: '1', name: 'Mithun Ray' },
  { id: '2', name: 'Shree Ram Steel' },
  { id: '3', name: 'Krishna Plywood' },
  { id: '4', name: 'Aravalli Home Studio' },
  { id: '5', name: 'Jain Timbers' },
  { id: '6', name: 'Gupta Hardware' },
  { id: '7', name: 'Royal Furnitures' },
];

export default function InvoicePage() {
  const router = useRouter();
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 flex items-center sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mr-2 hover:bg-primary/80"
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-xl font-bold">Invoice Bill</h1>
      </header>
      <main className="flex-grow p-4 md:p-6 flex flex-col">
        <div className="mb-4">
            <label
                htmlFor="party-search"
                className="block text-sm font-medium text-muted-foreground mb-2"
            >
                Party List
            </label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                id="party-search"
                placeholder="Search party..."
                className="pl-10"
                />
            </div>
        </div>
        
        <div className="flex-grow overflow-y-auto mb-4 border rounded-lg">
            <div className="space-y-1 p-2">
            {parties.map((party) => (
                <button
                key={party.id}
                onClick={() => setSelectedParty(party.id)}
                className={cn(
                    'w-full text-left p-3 rounded-md transition-colors',
                    selectedParty === party.id
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                )}
                >
                {party.name}
                </button>
            ))}
            </div>
        </div>

        <div className="pt-4">
          <Button className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
            Generate Bill
          </Button>
        </div>
      </main>
    </div>
  );
}