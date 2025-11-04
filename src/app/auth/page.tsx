import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dumbbell, Instagram, Twitter, Facebook } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-red-900 text-white p-4">
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <Dumbbell className="h-16 w-16 mb-4" />
        <h1 className="text-2xl font-bold tracking-wider">FITNESS CLUB</h1>
        <p className="mt-8 text-3xl font-bold">Welcome Back</p>

        <div className="w-full max-w-xs mt-12 space-y-4">
          <Button asChild className="w-full h-12 text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full">
            <Link href="/login">SIGN IN</Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-12 text-lg font-bold bg-white text-black rounded-full border-transparent">
            <Link href="/signup">SIGN UP</Link>
          </Button>
        </div>
      </div>
      <div className="pb-8">
        <p className="text-sm text-gray-400 mb-4">Login with Social Media</p>
        <div className="flex justify-center space-x-6">
          <button className="p-3 bg-white/10 rounded-full"><Instagram className="h-6 w-6" /></button>
          <button className="p-3 bg-white/10 rounded-full"><Twitter className="h-6 w-6" /></button>
          <button className="p-3 bg-white/10 rounded-full"><Facebook className="h-6 w-6" /></button>
        </div>
      </div>
    </div>
  );
}
