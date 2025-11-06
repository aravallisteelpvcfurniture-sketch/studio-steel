'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

export default function AddItemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partyName = searchParams.get('name') || 'Customer';

  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: '1', price: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    const quantity = parseInt(currentItem.quantity, 10);
    const price = parseFloat(currentItem.price);

    if (currentItem.name && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0) {
      setItems(prev => [...prev, { name: currentItem.name, quantity, price }]);
      setCurrentItem({ name: '', quantity: '1', price: '' }); // Reset form
    } else {
      // Basic validation feedback
      alert('Please fill all item fields correctly.');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };
  
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }, [items]);

  const handleGenerateFinalBill = () => {
    const partyDetails = {
        id: Date.now().toString(),
        name: searchParams.get('name') || 'N/A',
        mobile: searchParams.get('mobile') || '',
        email: searchParams.get('email') || '',
        address: searchParams.get('address') || '',
    };

    const invoice = {
        ...partyDetails,
        items,
        totalAmount,
        date: new Date().toISOString(),
    };
    
    // Save to localStorage
    const savedParties = JSON.parse(localStorage.getItem('parties') || '[]');
    savedParties.push(invoice);
    localStorage.setItem('parties', JSON.stringify(savedParties));

    alert('Bill generated and saved!');
    router.push('/dashboard/invoice');
  };

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
        <h1 className="text-xl font-bold">Add Items for {partyName}</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              name="name"
              placeholder="Item Name"
              value={currentItem.name}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="quantity"
                type="number"
                placeholder="Qty"
                value={currentItem.quantity}
                onChange={handleInputChange}
              />
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={currentItem.price}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={handleAddItem} className="w-full">Add Item</Button>
          </CardContent>
        </Card>

        {items.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>Item List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {item.quantity} x ₹{item.price.toFixed(2)} = ₹{(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                                <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
      </main>

      <footer className="p-4 flex-shrink-0 border-t bg-background">
        <Button 
            onClick={handleGenerateFinalBill}
            className="w-full h-12 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold"
            disabled={items.length === 0}
        >
          Generate Final Bill
        </Button>
      </footer>
    </div>
  );
}
