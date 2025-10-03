import { FurnitureCustomizer } from "@/components/furniture-customizer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from 'react';

function CustomizerFallback() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-10 w-1/4" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export default function CustomizePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">Design Your Furniture</h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Unleash your creativity. Use our AI tool to generate unique furniture pieces tailored to your exact specifications.
      </p>
      
      <Suspense fallback={<CustomizerFallback />}>
        <FurnitureCustomizer />
      </Suspense>
    </div>
  );
}
