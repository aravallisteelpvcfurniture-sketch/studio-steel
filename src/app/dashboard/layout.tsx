import BottomNav from '@/components/BottomNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
