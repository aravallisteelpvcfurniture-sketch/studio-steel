import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aravalli Home Studio',
  description: 'A modern app for Aravalli Steel PVC',
  manifest: '/manifest.json',
  icons: {
    icon: 'https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png',
    apple: 'https://res.cloudinary.com/dsgirle5v/image/upload/v1759515808/Generated_Image_October_03_2025_-_11_14PM_ybqz1a.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        {/* Light mode primary color: hsl(142 71% 45%) */}
        <meta name="theme-color" content="#27ae60" media="(prefers-color-scheme: light)" />
        {/* Dark mode primary color: hsl(142 71% 50%) */}
        <meta name="theme-color" content="#34c778" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
