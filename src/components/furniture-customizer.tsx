'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getFurnitureConfigurations } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import type { GenerateFurnitureConfigurationsOutput } from '@/ai/flows/generate-furniture-configurations';
import Image from 'next/image';

const FormSchema = z.object({
  furnitureType: z.string({ required_error: "Please select a furniture type." }),
  desiredConfiguration: z.string().min(20, { message: "Description must be at least 20 characters." }),
  numberOfConfigurations: z.number().min(1).max(5),
});

type FormData = z.infer<typeof FormSchema>;

export function FurnitureCustomizer() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GenerateFurnitureConfigurationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      furnitureType: initialType,
      desiredConfiguration: '',
      numberOfConfigurations: 3,
    },
  });
  
  const numberOfConfigurations = form.watch('numberOfConfigurations');

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResults(null);
    setError(null);
    
    const response = await getFurnitureConfigurations(data);

    if (response.error) {
      setError(typeof response.error === 'string' ? response.error : 'There was an issue with your submission.');
    } else if (response.data) {
      setResults(response.data);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <Wand2 className="text-accent" /> AI Furniture Customizer
              </CardTitle>
              <CardDescription>
                Describe your dream furniture, and our AI will generate design concepts for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="furnitureType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furniture Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a furniture type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="chair">Chair</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="sofa">Sofa</SelectItem>
                        <SelectItem value="bookshelf">Bookshelf</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredConfiguration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe Your Vision</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A modern steel armchair with a dark gray finish, minimalist design, and orange PVC cushions. Should be comfortable for reading."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfConfigurations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Designs to Generate: {numberOfConfigurations}</FormLabel>
                    <FormControl>
                       <Slider
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={1}
                        max={5}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Designs'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {error && (
        <div className="mt-8 text-center text-destructive-foreground bg-destructive/80 p-4 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {results && (
        <div className="mt-12">
          <h2 className="text-3xl font-headline text-center mb-8">Your Generated Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.configurations.map((config, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <Image src={config.imageUrl} alt={`Generated design ${index + 1}`} fill className="object-cover" data-ai-hint="furniture design"/>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
