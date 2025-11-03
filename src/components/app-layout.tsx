import type { ReactNode } from 'react';
import Header from './header';
import BottomNav from './bottom-nav';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col pt-16 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
