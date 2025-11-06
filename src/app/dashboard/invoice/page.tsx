'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, MessageCircle, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Party {
    id: string;
    name: string;
    mobile: string;
    email: string;
    address: string;
    items: Item[];
    totalAmount: number;
    date: string;
}

// Extend the jsPDF type to include the autoTable method from the plugin
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}


export default function InvoicePage() {
  const router = useRouter();
  const [parties, setParties] = useState<Party[]>([]);
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load parties from localStorage on component mount
    const savedParties = JSON.parse(localStorage.getItem('parties') || '[]');
    setParties(savedParties.reverse()); // Show newest first
  }, []);

  const handleShareBill = (party: Party) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;

    // Header
    doc.setFontSize(20);
    doc.text('TAX INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Aravalli Steel PVC Furniture', 14, 35);
    doc.setFontSize(10);
    doc.text('123 Example Street, City, State, PIN', 14, 40);
    doc.text('GSTIN: YOUR_GSTIN', 14, 45);
    doc.text('Email: your.email@example.com', 14, 50);

    // Invoice Details
    doc.setFontSize(10);
    doc.text(`Invoice No: ${party.id.substring(0, 6)}`, 14, 60);
    doc.text(`Date: ${new Date(party.date).toLocaleDateString()}`, 196, 60, { align: 'right' });

    // Bill To
    doc.setFontSize(12);
    doc.text('Bill To:', 14, 70);
    doc.setFontSize(10);
    doc.text(party.name, 14, 75);
    doc.text(party.address, 14, 80);
    if(party.email) doc.text(party.email, 14, 85);
    if(party.mobile) doc.text(party.mobile, 14, 90);

    // Items Table
    const tableColumn = ["#", "Item Name", "Qty", "Rate", "Amount"];
    const tableRows: (string|number)[][] = [];

    party.items.forEach((item, index) => {
      const itemData = [
        index + 1,
        item.name,
        item.quantity,
        `₹${item.price.toFixed(2)}`,
        `₹${(item.quantity * item.price).toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 95,
        theme: 'striped',
        headStyles: { fillColor: [20, 163, 199] }, // Corresponds to primary color
        styles: { halign: 'center' },
        columnStyles: { 
            1: { halign: 'left' },
            3: { halign: 'right' },
            4: { halign: 'right' },
        }
    });

    const finalY = doc.lastAutoTable.finalY || 150;

    // Total
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total:', 150, finalY + 15, { align: 'right' });
    doc.text(`₹${party.totalAmount.toFixed(2)}`, 196, finalY + 15, { align: 'right' });

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('For: Aravalli Steel PVC Furniture', 14, finalY + 30);
    doc.text('Authorised Signatory', 196, finalY + 40, { align: 'right' });


    doc.save(`invoice-${party.id.substring(0,6)}.pdf`);
    alert('PDF downloaded! You can now share it via WhatsApp.');
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
          onClick={() => router.push('/dashboard')}
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
          {filteredParties.length > 0 ? (
            filteredParties.map((party) => (
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
                    <div className="flex flex-col">
                      <span className="font-semibold">{party.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(party.date).toLocaleDateString()} - ₹{party.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShareBill(party);
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
            ))
          ) : (
            <div className="text-center text-muted-foreground p-4">
              No parties found.
            </div>
          )}
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
