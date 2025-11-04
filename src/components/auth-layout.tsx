import type { ReactNode } from 'react';
import { Wave } from './ui/wave';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
        <header className="relative h-56 bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white flex flex-col items-center justify-center text-center p-4">
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
            </div>
            <h1 className="text-xl font-bold">UiLover</h1>
            <Wave className="text-background" />
        </header>
        <main className="flex-grow px-6 pb-8">
            {children}
        </main>
    </div>
  );
}
