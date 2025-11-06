'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, User, Phone, Mail, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GenerateBillPage() {
  const router = useRouter();
  
  const [partyDetails, setPartyDetails] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartyDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };
  
  const detailItems = [
    { name: 'name', icon: User, label: 'Name', value: partyDetails.name },
    { name: 'mobile', icon: Phone, label: 'Mobile', value: partyDetails.mobile },
    { name: 'email', icon: Mail, label: 'Email', value: partyDetails.email },
    { name: 'address', icon: MapPin, label: 'Address', value: partyDetails.address },
  ];

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
        <div className="p-4 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Party Details</CardTitle>
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
      </main>

      <footer className="p-4 flex-shrink-0 border-t bg-background">
        <Button className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
          Proceed to Add Items
        </Button>
      </footer>
    </div>
  );
}
