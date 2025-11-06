'use client';

import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, User, Phone, Mail, MapPin } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for parties - This should be consistent with the data on the previous page
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

function GenerateBillContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partyId = searchParams.get('partyId');
  
  const party = parties.find(p => p.id === partyId);

  const [partyDetails, setPartyDetails] = useState(party);

  useEffect(() => {
    if (party) {
      setPartyDetails(party);
    }
  }, [party]);

  if (!partyDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <h2 className="text-xl font-semibold text-destructive">Party not found!</h2>
        <p className="text-muted-foreground mt-2">Please go back and select a valid party.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartyDetails(prevDetails => prevDetails ? { ...prevDetails, [name]: value } : null);
  };
  
  const detailItems = [
    { name: 'name', icon: User, label: 'Name', value: partyDetails.name },
    { name: 'mobile', icon: Phone, label: 'Mobile', value: partyDetails.mobile },
    { name: 'email', icon: Mail, label: 'Email', value: partyDetails.email },
    { name: 'address', icon: MapPin, label: 'Address', value: partyDetails.address },
  ];

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Party Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {detailItems.map(item => (
              <div key={item.name} className="relative">
                <item.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id={item.name}
                  name={item.name}
                  placeholder={item.label}
                  value={item.value}
                  onChange={handleInputChange}
                  className="pl-10 rounded-xl h-12 bg-muted border-muted"
                />
              </div>
            ))}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GenerateBillPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 flex items-center flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mr-2 hover:bg-primary/80"
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-xl font-bold">Generate Bill</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto">
        <Suspense fallback={<div className="p-6">Loading party details...</div>}>
          <GenerateBillContent />
        </Suspense>
      </main>

      <footer className="p-4 flex-shrink-0 border-t bg-background">
        <Button className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
          Proceed to Add Items
        </Button>
      </footer>
    </div>
  );
}
