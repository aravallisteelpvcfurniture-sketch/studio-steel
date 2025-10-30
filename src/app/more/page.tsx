'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, HelpCircle, Calculator, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';

const menuItems = [
    {
        href: "/help-chat",
        icon: HelpCircle,
        title: "Help & Support",
        description: "Get assistance from our support team.",
    },
    {
        href: "/stairs-estimate",
        icon: Calculator,
        title: "Stairs Estimate",
        description: "Calculate estimates for staircases.",
    },
];

const settingsItems = [
     {
        href: "#",
        icon: Settings,
        title: "App Settings",
        description: "Manage your application settings.",
    },
]

export default function MorePage() {
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        auth.signOut();
        router.push('/auth');
    };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>More Options</CardTitle>
            <CardDescription>Explore additional features and settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                {menuItems.map((item) => (
                    <Link href={item.href} key={item.title}>
                        <div className="flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                            <item.icon className="h-6 w-6 mr-4 text-primary" />
                            <div className="flex-1">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </Link>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                 {settingsItems.map((item) => (
                    <Link href={item.href} key={item.title}>
                        <div className="flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                            <item.icon className="h-6 w-6 mr-4" />
                            <div className="flex-1">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </Link>
                ))}
                <div 
                    className="flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={handleSignOut}
                    role="button"
                >
                    <LogOut className="h-6 w-6 mr-4 text-destructive" />
                    <div className="flex-1">
                        <p className="font-semibold text-destructive">Log Out</p>
                        <p className="text-sm text-muted-foreground">Sign out of your account.</p>
                    </div>
                </div>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
