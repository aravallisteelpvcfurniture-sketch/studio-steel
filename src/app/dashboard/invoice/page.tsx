'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for parties - this would typically come from an API or database
const parties = [
  { id: '1', name: 'Mithun Ray' },
  { id: '2', name: 'Shree Ram Steel' },
  { id: '3', name: 'Krishna Plywood' },
  { id: '4', name: 'Aravalli Home Studio' },
];

export default function InvoicePage() {
  const router = useRouter();

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
            htmlFor="party-select"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Party List
          </label>
          <Select>
            <SelectTrigger id="party-select" className="w-full">
              <SelectValue placeholder="Select a party" />
            </SelectTrigger>
            <SelectContent>
              {parties.map((party) => (
                <SelectItem key={party.id} value={party.name}>
                  {party.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* This is where the rest of the invoice form will go */}
        <div className="flex-grow"></div>

        <div className="mt-auto pt-4">
          <Button className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
            Generate Bill
          </Button>
        </div>
      </main>
    </div>
  );
}
