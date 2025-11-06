'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, MessageCircle } from 'lucide-react';
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
  { id: '8', name: 'New Party A' },
  { id: '9', name: 'New Party B' },
  { id: '10', name: 'New Party C' },
  { id: '11', name: 'New Party D' },
  { id: '12', name: 'New Party E' },
];

export default function InvoicePage() {
  const router = useRouter();
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  const handleShareBill = (partyName: string) => {
    // Placeholder for bill sharing logic
    alert(`Sharing bill for ${partyName}...`);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 flex items-center flex-shrink-0 z-10">
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
      
      <main className="flex-grow p-4 md:p-6 flex flex-col overflow-hidden">
        <div className="mb-4 flex-shrink-0">
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
                <div
                    key={party.id}
                    onClick={() => setSelectedParty(party.id)}
                    className={cn(
                        'w-full flex items-center justify-between p-3 rounded-md transition-colors cursor-pointer',
                        selectedParty === party.id
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted'
                    )}
                >
                    <span>{party.name}</span>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent party selection when clicking the icon
                            handleShareBill(party.name);
                        }}
                        className={cn(
                            'rounded-full h-8 w-8', 
                            selectedParty === party.id 
                                ? 'hover:bg-accent/80' 
                                : 'hover:bg-muted-foreground/20'
                        )}
                    >
                        <MessageCircle className="h-5 w-5 text-green-500" />
                    </Button>
                </div>
            ))}
            </div>
        </div>
      </main>

      <footer className="p-4 flex-shrink-0 border-t bg-background">
        <Button className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
          Generate Bill
        </Button>
      </footer>
    </div>
  );
}
