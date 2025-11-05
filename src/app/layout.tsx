import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aravalli Steel",
  description: "App for Aravalli Steel",
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
  themeColor: "#849b5c"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary`}>{children}</body>
    </html>
  );
}
