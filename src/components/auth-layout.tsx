import type { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-red-900 text-white">
        <div className="flex-shrink-0 px-8 pt-16">
            <h1 className="text-4xl font-bold">{title}</h1>
            <h2 className="text-4xl font-bold">{subtitle}</h2>
        </div>
        <main className="flex-grow flex flex-col justify-end">
            <div className="bg-white text-black rounded-t-3xl p-8 mt-8">
                {children}
            </div>
        </main>
    </div>
  );
}
