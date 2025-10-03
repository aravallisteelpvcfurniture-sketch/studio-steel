import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="relative flex flex-col items-center justify-center bg-gray-900 p-8 text-white">
        <Image
          src="https://picsum.photos/seed/4/1200/800"
          alt="Modern furniture"
          fill
          className="absolute inset-0 object-cover opacity-30"
          data-ai-hint="modern furniture"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-tighter">Aravalli Home Studio</h1>
          <p className="mt-4 text-lg text-gray-300">
            Crafting steel and PVC furniture for modern living.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Get Started
          </h2>
          <p className="mt-2 text-muted-foreground">
            Choose your path to continue to your account.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <Button asChild size="lg">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
