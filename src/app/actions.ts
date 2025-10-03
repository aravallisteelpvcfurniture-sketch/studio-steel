'use server';

import { generateFurnitureConfigurations, type GenerateFurnitureConfigurationsInput } from '@/ai/flows/generate-furniture-configurations';
import { z } from 'zod';

const InputSchema = z.object({
  furnitureType: z.string().min(1, "Furniture type is required."),
  desiredConfiguration: z.string().min(10, "Please provide a more detailed description."),
  numberOfConfigurations: z.number().min(1).max(5),
});

export async function getFurnitureConfigurations(formData: GenerateFurnitureConfigurationsInput) {
  const validatedData = InputSchema.safeParse(formData);

  if (!validatedData.success) {
    return { error: validatedData.error.format() };
  }

  try {
    const result = await generateFurnitureConfigurations(validatedData.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
