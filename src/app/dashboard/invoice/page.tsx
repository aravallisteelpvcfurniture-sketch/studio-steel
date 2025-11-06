'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, MessageCircle, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

// Mock data for parties - this would typically come from an API or database
const parties = [
  { id: '1', name: 'Mithun Ray', mobile: '9876543210', email: 'mithun@example.com', address: '123 Tech Park, Bangalore' },
  { id: '2', name: 'Shree Ram Steel', mobile: '8765432109', email: 'shreeram@example.com', address: '456 Steel Market, Delhi' },
  { id: '3', name: 'Krishna Plywood', mobile: '7654321098', email: 'krishna@example.com', address: '789 Wood Lane, Mumbai' },
  { id: '4', name: 'Aravalli Home Studio', mobile: '6543210987', email: 'aravalli@example.com', address: '101 Home Decor, Jaipur' },
  { id: '5', name: 'Jain Timbers', mobile: '5432109876', email: 'jain@example.com', address: '212 Timber Road, Chennai' },
  { id: '6', name: 'Gupta Hardware', mobile: '4321098765', email: 'gupta@example.com', address: '333 Hardware Hub, Kolkata' },
  { id: '7', name: 'Royal Furnitures', mobile: '3210987654', email: 'royal@example.com', address: '444 Furniture Plaza, Hyderabad' },
  { id: '8', name: 'New Party A', mobile: '2109876543', email: 'partya@example.com', address: '555 New Street, Pune' },
  { id: '9', name: 'New Party B', mobile: '1098765432', email: 'partyb@example.com', address: '666 Party Ave, Ahmedabad' },
  { id: '10', name: 'New Party C', mobile: '0987654321', email: 'partyc@example.com', address: '777 Celebration Blvd, Surat' },
  { id: '11', name: 'New Party D', mobile: '9876543211', email: 'partyd@example.com', address: '888 Gala Rd, Lucknow' },
  { id: '12', name: 'New Party E', mobile: '8765432110', email: 'partye@example.com', address: '999 Festival Way, Nagpur' },
];

export default function InvoicePage() {
  const router = useRouter();
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShareBill = (partyName: string) => {
    // Placeholder for bill sharing logic
    alert(`Sharing bill for ${partyName}...`);
  };

  const handleGenerateBill = () => {
    router.push(`/dashboard/invoice/generate`);
  };

  const filteredParties = parties.filter((party) =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      
      <div className="p-4 md:p-6 flex-shrink-0">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>
      </div>
        
      <main className="flex-grow overflow-y-auto px-4 md:px-6 pb-4">
          <div className="space-y-1 border rounded-lg p-2">
          {filteredParties.map((party) => (
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
                          e.stopPropagation();
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
      </main>

      <footer className="p-4 flex-shrink-0 border-t bg-background">
        <Button onClick={handleGenerateBill} className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
          Generate Bill
        </Button>
      </footer>
    </div>
  );
}
