
'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Loader2, Settings, CreditCard, Users, Info, ChevronRight, ArrowLeft } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { useRouter } from 'next/navigation';
import { Wave } from "@/components/ui/wave";
import Link from "next/link";

const menuItems = [
    { icon: Settings, label: "Settings" },
    { icon: CreditCard, label: "Billing Details" },
    { icon: Users, label: "User Management" },
    { icon: Info, label: "Information" },
];

export default function ProfilePage() {
    const { user, isLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        if (auth) {
            auth.signOut();
            router.push('/login');
        }
    };
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const nameParts = name.split(' ');
        if (nameParts.length > 1 && nameParts[1]) {
            return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    }
    
    if (isLoading) {
        return (
             <AppLayout>
                <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </AppLayout>
        );
    }

    if (!user) {
        return (
            <AppLayout>
                <div className="p-4 md:p-8 text-center">
                     <p>You must be logged in to view this page.</p>
                     <Button onClick={() => router.push('/login')} className="mt-4">Go to Login</Button>
                </div>
            </AppLayout>
        )
    }

  return (
    <AppLayout>
      <div className="bg-background min-h-screen">
        <header className="relative bg-primary h-48 text-primary-foreground p-6 flex flex-col justify-start">
            <div className="flex items-center justify-between z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-primary/80">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold text-foreground">Profile</h1>
                <div className="w-9 h-9"></div>
            </div>
            <Wave className="text-background" />
        </header>

        <main className="p-6 space-y-6 -mt-32 z-10 relative">
            <div className="flex flex-col items-center space-y-2">
                 <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || ''} />
                    <AvatarFallback className="text-4xl bg-muted">
                        {getInitials(user.displayName)}
                    </AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{user.displayName || 'User'}</h2>
                    <p className="text-muted-foreground">@{user.email?.split('@')[0] || 'username'}</p>
                </div>
                 <Button asChild className="rounded-full mt-2">
                    <Link href="/profile/edit">Edit Profile</Link>
                </Button>
            </div>
            
            <Card>
              <CardContent className="p-2">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <Link href="#" className="flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                                <item.icon className="h-5 w-5 mr-4 text-primary" />
                                <span className="flex-1 font-medium">{item.label}</span>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </Link>
                        </li>
                    ))}
                     <Separator />
                     <li>
                        <button onClick={handleSignOut} className="w-full flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors text-destructive">
                            <LogOut className="h-5 w-5 mr-4" />
                            <span className="flex-1 font-medium text-left">Log out</span>
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </li>
                </ul>
              </CardContent>
            </Card>
          </main>
      </div>
    </AppLayout>
  );
}
