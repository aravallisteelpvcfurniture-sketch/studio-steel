'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useFirestore, useCollection, useMemoFirebase, type WithId } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Loader2, Package } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Product = {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
};

export default function ProductsPage() {
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);

  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
            <p className="text-muted-foreground mt-2">Explore our range of quality steel and PVC furniture.</p>
        </div>

        {isLoadingProducts ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: WithId<Product>) => (
                    <Card key={product.id} className="overflow-hidden group flex flex-col">
                        <CardContent className="p-0 aspect-[4/3] relative">
                             <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </CardContent>
                        <div className="p-4 flex flex-col flex-1">
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <h3 className="font-semibold text-lg flex-1">{product.name}</h3>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
                                <Button variant="outline" size="sm">View Details</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        ) : (
            <Card className="text-center py-16">
                <CardHeader>
                    <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                        <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-4">No Products Found</CardTitle>
                    <CardDescription>We are currently updating our catalog. Please check back later.</CardDescription>
                </CardHeader>
            </Card>
        )}
      </div>
    </AppLayout>
  );
}
