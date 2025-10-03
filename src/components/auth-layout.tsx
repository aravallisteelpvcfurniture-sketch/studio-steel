import type { ReactNode } from 'react';
import { Wave } from './ui/wave';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden">
      <Wave className="absolute top-0 left-0 w-full h-auto text-primary" />
      <main className="relative z-10 w-full flex-grow">{children}</main>
      <Wave className="absolute bottom-0 left-0 w-full h-auto text-primary transform rotate-180" />
    </div>
  );
}
