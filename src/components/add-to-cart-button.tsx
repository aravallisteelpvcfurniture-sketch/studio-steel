'use client';

import { useToast } from "@/hooks/use-toast"
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton() {
  const { toast } = useToast();

  return (
    <Button 
      size="lg" 
      className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
      onClick={() => {
        toast({
          title: "Order Placed!",
          description: "Your order has been successfully placed. We will contact you shortly.",
        });
      }}
    >
      <ShoppingCart className="mr-2" />
      Place Order
    </Button>
  );
}
