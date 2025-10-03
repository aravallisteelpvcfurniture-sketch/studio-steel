'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending similar furniture pieces.
 *
 * The flow takes a user ID as input and returns a list of recommended furniture items.
 * It uses the user's browsing history and order history to generate the recommendations.
 *
 * @exported recommendSimilarFurniture - The main function to trigger the recommendation flow.
 * @exported RecommendSimilarFurnitureInput - The input type for the recommendSimilarFurniture function.
 * @exported RecommendSimilarFurnitureOutput - The output type for the recommendSimilarFurniture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSimilarFurnitureInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate recommendations for.'),
});
export type RecommendSimilarFurnitureInput = z.infer<typeof RecommendSimilarFurnitureInputSchema>;

const RecommendedFurnitureItemSchema = z.object({
  itemId: z.string().describe('The ID of the recommended furniture item.'),
  name: z.string().describe('The name of the recommended furniture item.'),
  description: z.string().describe('A short description of the item.'),
  imageUrl: z.string().describe('URL of the item image.'),
  price: z.number().describe('Price of the item.'),
});

const RecommendSimilarFurnitureOutputSchema = z.array(RecommendedFurnitureItemSchema);
export type RecommendSimilarFurnitureOutput = z.infer<typeof RecommendSimilarFurnitureOutputSchema>;

export async function recommendSimilarFurniture(input: RecommendSimilarFurnitureInput): Promise<RecommendSimilarFurnitureOutput> {
  return recommendSimilarFurnitureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSimilarFurniturePrompt',
  input: {schema: RecommendSimilarFurnitureInputSchema},
  output: {schema: RecommendSimilarFurnitureOutputSchema},
  prompt: `You are an AI assistant specializing in furniture recommendations.
Based on the user's past browsing history and order history, recommend similar furniture items that they might be interested in.

User ID: {{{userId}}}

Respond with a JSON array of furniture items. Each item should include itemId, name, description, imageUrl, and price.
Provide at least 3 recommendations.

Consider the user's taste and preferences based on their past activity.
Do not include items that the user has already purchased or viewed recently.
`,
});

const recommendSimilarFurnitureFlow = ai.defineFlow(
  {
    name: 'recommendSimilarFurnitureFlow',
    inputSchema: RecommendSimilarFurnitureInputSchema,
    outputSchema: RecommendSimilarFurnitureOutputSchema,
  },
  async input => {
    // Ideally, here we would call services to retrieve browsing history and order history.
    // For now, we'll just pass the userId to the prompt.
    const {output} = await prompt(input);
    return output!;
  }
);
