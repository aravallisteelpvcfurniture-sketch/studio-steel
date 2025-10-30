'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser, useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        auth.signOut();
        router.push('/auth');
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    }
    
    if (isUserLoading) {
        return (
             <AppLayout>
                <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </AppLayout>
        )
    }

    if (!user) {
        // This case should ideally not be hit if AppLayout handles redirection
        return (
            <AppLayout>
                <div className="p-4 md:p-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>You are not logged in. Please log in to view your profile.</p>
                            <Button onClick={() => router.push('/login')} className="mt-4">Login</Button>
                        </CardContent>
                    </Card>
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
                {/* Add more profile details here in the future */}
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
          <CardFooter className="border-t pt-6">
             <Button variant="destructive" onClick={handleSignOut} className="w-full sm:w-auto ml-auto">
                <LogOut className="mr-2 h-4 w-4"/>
                Log Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
