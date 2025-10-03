import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth-layout';

export default function AuthPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center text-center h-full pt-16">
        <Image
          src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png"
          alt="Aravalli Steel PVC"
          width={80}
          height={80}
          className="rounded-full mb-6"
        />
        <h1 className="text-4xl font-bold tracking-tighter text-foreground">Aravalli Home Studio</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Crafting steel and PVC furniture for modern living.
        </p>
        <div className="mt-12 w-full max-w-xs">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
