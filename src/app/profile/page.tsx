'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon, LogOut, Loader2 } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { useRouter } from 'next/navigation';

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
        // This should be handled by the useUser hook redirecting, but as a fallback
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
      <div className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-6 w-6" />
                My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || ''} />
                    <AvatarFallback className="text-3xl bg-muted">
                        {getInitials(user.displayName) || getInitials(user.email)}
                    </AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{user.displayName || 'User'}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>
            <Separator />
            <div className="grid gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{user.uid}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Account Created</span>
                    <span className="font-medium">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
                </div>
            </div>
          </CardContent>
           <CardFooter>
                <Button variant="destructive" onClick={handleSignOut} className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
