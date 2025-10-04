import type { ReactNode } from 'react';
import Header from './header';
import BottomNav from './bottom-nav';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
