import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'chair' | 'table' | 'sofa' | 'bookshelf';
  material: 'Steel' | 'PVC' | 'Hybrid';
  image: ImagePlaceholder;
}

const getImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
      // Fallback for safety, though it shouldn't be hit if JSON is correct
      return { id: 'fallback', description: 'Fallback Image', imageUrl: 'https://picsum.photos/seed/fallback/600/600', imageHint: 'placeholder' };
    }
    return img;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Steel Chair',
    description: 'A sleek and modern chair made from high-grade steel, perfect for any contemporary space. Its minimalist design combines form and function.',
    price: 180,
    type: 'chair',
    material: 'Steel',
    image: getImage('product1'),
  },
  {
    id: '2',
    name: 'Elegant PVC Coffee Table',
    description: 'A durable and stylish coffee table crafted from premium PVC. Its waterproof and scratch-resistant surface makes it ideal for everyday use.',
    price: 250,
    type: 'table',
    material: 'PVC',
    image: getImage('product2'),
  },
  {
    id: '3',
    name: 'Modern Steel Bookshelf',
    description: 'An industrial-style bookshelf that provides ample storage without compromising on aesthetics. Made from powder-coated steel for longevity.',
    price: 450,
    type: 'bookshelf',
    material: 'Steel',
    image: getImage('product3'),
  },
  {
    id: '4',
    name: 'Comfortable PVC Sofa',
    description: 'A plush and inviting sofa with a sturdy PVC frame and high-density foam cushions. Easy to clean and maintain, perfect for families.',
    price: 800,
    type: 'sofa',
    material: 'PVC',
    image: getImage('product4'),
  },
];

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
}
