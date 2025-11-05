import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';

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
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#849b5c" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#8cad6f" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bungee&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <div className="flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex flex-1 flex-col pt-16 pb-20">{children}</main>
              <BottomNav />
            </div>
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
