import { AppLayout } from '@/components/app-layout';

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AppLayout>
        {children}
      </AppLayout>
  );
}
