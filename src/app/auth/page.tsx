import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden p-4">
        <div className="absolute inset-0 bg-primary opacity-80"></div>
         <div className="relative z-10 flex flex-col items-center text-center">
            <Image
            src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
            alt="Aravalli Steel PVC"
            width={120}
            height={120}
            className="rounded-full mb-6 border-4 border-white shadow-lg"
            />
            <h1 className="text-4xl font-bold tracking-tighter text-white">Aravalli Home Studio</h1>
            <p className="mt-4 text-lg text-white/90">
            Crafting steel and PVC furniture for modern living.
            </p>
            <div className="mt-12 w-full max-w-xs">
            <Button asChild size="lg" className="w-full bg-white text-primary h-12 text-lg font-bold hover:bg-white/90">
                <Link href="/login">Get Started</Link>
            </Button>
            </div>
        </div>
    </div>
  );
}
