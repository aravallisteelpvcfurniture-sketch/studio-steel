import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wave } from '@/components/ui/wave';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-600 p-4">
      <Card className="w-full max-w-md overflow-hidden border-0 shadow-2xl">
        <div className="relative bg-primary text-primary-foreground p-8">
            <Wave />
            <div className='relative z-10'>
                <h1 className="text-3xl font-bold">Aravalli Steel</h1>
                <p className="text-primary-foreground/80">Your Modern Furniture Solution</p>
            </div>
        </div>
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl">Get Started</CardTitle>
          <CardDescription>
            Choose your path to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-8 pt-0">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="w-full">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
