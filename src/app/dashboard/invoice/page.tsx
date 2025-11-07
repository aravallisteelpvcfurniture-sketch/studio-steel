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

  const handleShareBill = async (party: Party) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    const invoiceId = party.id.substring(0, 6);
    const fileName = `invoice-${invoiceId}.pdf`;
  
    // --- PDF Styling based on the image ---
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
  
    // Header
    doc.text('BILL / CASH MEMO', 105, 15, { align: 'center' });
  
    // Company Details
    doc.setFontSize(12);
    doc.text('ARAVALLI STEEL & PVC FURNITURE', 20, 25);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Shop No. 1, Opp. Old Octroi Post, Near Essar Petrol Pump,', 20, 31);
    doc.text('G.I.D.C. Gate, V.U. Nagar, Anand - 388121', 20, 36);
    doc.text(`Rayyan R. Vhora: 9979332583, Mithun R. Vhora: 9033346830`, 20, 41)
  
    // Bill Details
    doc.text(`Bill No: ${invoiceId}`, 150, 25);
    doc.text(`Date: ${new Date(party.date).toLocaleDateString()}`, 150, 31);
  
    // "To" section
    doc.line(14, 45, 196, 45); // Line below header
    doc.setFont('helvetica', 'bold');
    doc.text('To:', 15, 52);
    doc.setFont('helvetica', 'normal');
    doc.text(party.name, 25, 52);
    if(party.address) doc.text(party.address, 15, 58);
    doc.line(14, 65, 196, 65); // Line below "To" section
  
    // Items Table
    const tableColumn = ["SL.No", "PARTICULARS", "QTY", "RATE", "AMOUNT"];
    const tableRows: (string|number)[][] = [];
  
    party.items.forEach((item, index) => {
      const itemData = [
        index + 1,
        item.name,
        item.quantity,
        item.price.toFixed(2),
        (item.quantity * item.price).toFixed(2)
      ];
      tableRows.push(itemData);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 68,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: [0,0,0], fontStyle: 'bold' },
      styles: { lineColor: [100, 100, 100], lineWidth: 0.1 },
      columnStyles: { 
        0: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'right' },
        4: { halign: 'right' },
      }
    });
  
    const finalY = (doc as any).lastAutoTable.finalY || 150;
  
    // Total Amount
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL AMOUNT:', 15, finalY + 15);
    doc.text(`${party.totalAmount.toFixed(2)}`, 196, finalY + 15, { align: 'right' });
  
    // Footer
    doc.line(14, finalY + 20, 196, finalY + 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Terms and Conditions', 15, finalY + 25);
    // Add specific terms here if needed
  
    doc.setFont('helvetica', 'bold');
    doc.text('For: Aravalli Steel & PVC Furniture', 150, finalY + 35, { align: 'center'});
    doc.text('Authorized Signatory', 150, finalY + 50, { align: 'center'});
  
    // --- End PDF Styling ---
  
    doc.save(fileName); // Always save the PDF for manual attachment

    if (party.mobile) {
      const message = `Dear ${party.name},\n\nPlease find your invoice attached.\n\nTotal Amount: ${party.totalAmount.toFixed(2)}\n\nThank you for your business!\nAravalli Steel & PVC Furniture`;
      const whatsappUrl = `https://wa.me/91${party.mobile}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert("No mobile number available for this party.");
    }
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
