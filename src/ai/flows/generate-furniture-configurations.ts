'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating furniture configurations based on a text prompt.
 *
 * It includes:
 * - `generateFurnitureConfigurations`:  A function to generate furniture configurations.
 * - `GenerateFurnitureConfigurationsInput`: The input type for the generateFurnitureConfigurations function.
 * - `GenerateFurnitureConfigurationsOutput`: The output type for the generateFurnitureConfigurations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFurnitureConfigurationsInputSchema = z.object({
  furnitureType: z.string().describe('The type of furniture to configure (e.g., chair, table, sofa).'),
  desiredConfiguration: z
    .string()
    .describe(
      'A description of the desired furniture configuration, including materials, colors, and dimensions.'
    ),
  numberOfConfigurations: z
    .number()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of different furniture configurations to generate.'),
});

export type GenerateFurnitureConfigurationsInput = z.infer<
  typeof GenerateFurnitureConfigurationsInputSchema
>;

const GenerateFurnitureConfigurationsOutputSchema = z.object({
  configurations: z.array(
    z.object({
      description: z.string().describe('A description of the generated furniture configuration.'),
      imageUrl: z.string().describe('A URL of an image representing the generated configuration.'),
    })
  ).describe('An array of generated furniture configurations.'),
});

export type GenerateFurnitureConfigurationsOutput = z.infer<
  typeof GenerateFurnitureConfigurationsOutputSchema
>;

export async function generateFurnitureConfigurations(
  input: GenerateFurnitureConfigurationsInput
): Promise<GenerateFurnitureConfigurationsOutput> {
  return generateFurnitureConfigurationsFlow(input);
}

const generateFurnitureConfigurationsPrompt = ai.definePrompt({
  name: 'generateFurnitureConfigurationsPrompt',
  input: {schema: GenerateFurnitureConfigurationsInputSchema},
  output: {schema: GenerateFurnitureConfigurationsOutputSchema},
  prompt: `You are an AI expert in generating different furniture configurations based on user descriptions.

  The user wants to generate {{numberOfConfigurations}} different configurations for a {{furnitureType}}. Each configuration should be based on the following description: {{desiredConfiguration}}.

  Each configuration should include a detailed description of the materials, colors, and dimensions. Also return an image URL of what this configuration might look like.
  Make sure to generate valid image URLs.
  Ensure that the configurations are significantly different from each other.

  Return the configurations in JSON format.`,
});

const generateFurnitureConfigurationsFlow = ai.defineFlow(
  {
    name: 'generateFurnitureConfigurationsFlow',
    inputSchema: GenerateFurnitureConfigurationsInputSchema,
    outputSchema: GenerateFurnitureConfigurationsOutputSchema,
  },
  async input => {
    const {output} = await generateFurnitureConfigurationsPrompt(input);
    return output!;
  }
);
