import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
           <Image
            src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759490183/image-2_asr8zs.jpg"
            alt="Aravalli Steel PVC Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Log in or create an account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
