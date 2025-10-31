'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight, HelpCircle, Calculator, LogOut, User, Palette, ClipboardList, BookOpen, Handshake, GalleryVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Separator } from "@/components/ui/separator";

const toolsItems = [
    {
        href: "/estimate",
        icon: ClipboardList,
        title: "Estimate Calculator",
        description: "Create estimates for PVC wall panels.",
    },
    {
        href: "/stairs-estimate",
        icon: Calculator,
        title: "Stairs Estimate",
        description: "Calculate estimates for staircases.",
    },
];

const contentItems = [
    {
        href: "/gallery",
        icon: GalleryVertical,
        title: "Gallery",
        description: "Browse our latest work and designs.",
    },
    {
        href: "/products",
        icon: BookOpen,
        title: "Product Catalog",
        description: "View our full range of products.",
    },
     {
        href: "/greetings",
        icon: Handshake,
        title: "Visitor Greetings",
        description: "Manage welcome messages for visitors.",
    },
];

const accountItems = [
     {
        href: "/profile",
        icon: User,
        title: "My Profile",
        description: "View and manage your profile details.",
    },
    {
        href: "/help-chat",
        icon: HelpCircle,
        title: "Help & Support",
        description: "Get assistance from our support team.",
    },
]

export default function MorePage() {
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        if (auth) {
            auth.signOut();
            router.push('/auth');
        }
    };

    const renderMenuItem = (item: { href: string, icon: React.ElementType, title: string, description: string }) => (
        <Link href={item.href} key={item.title} className="block">
            <div className="flex items-center p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                <item.icon className="h-6 w-6 mr-4 text-primary" />
                <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
        </Link>
    );

  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tools</CardTitle>
            <CardDescription>Calculators and utilities to help with your projects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            {toolsItems.map(renderMenuItem)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Explore our products, work and other content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            {contentItems.map(renderMenuItem)}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Account &amp; Settings</CardTitle>
                 <CardDescription>Manage your account, profile, and app settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
                 {accountItems.map(renderMenuItem)}
                 <Separator className="my-2"/>
                 <div className="flex items-center p-3 rounded-lg">
                    <Palette className="h-6 w-6 mr-4 text-primary" />
                    <div className="flex-1">
                        <p className="font-semibold">Theme</p>
                        <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
                    </div>
                    <ThemeSwitcher />
                </div>
                <Separator className="my-2"/>
                <div 
                    className="flex items-center p-3 rounded-lg hover:bg-destructive/10 cursor-pointer transition-colors"
                    onClick={handleSignOut}
                    role="button"
                >
                    <LogOut className="h-6 w-6 mr-4 text-destructive" />
                    <div className="flex-1">
                        <p className="font-semibold text-destructive">Log Out</p>
                    </div>
                     <ChevronRight className="h-5 w-5 text-destructive/70" />
                </div>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
