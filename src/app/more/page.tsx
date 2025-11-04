'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight, HelpCircle, Calculator, User, Palette, ClipboardList, BookOpen, Handshake, GalleryVertical, Video, Settings } from 'lucide-react';
import Link from 'next/link';
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
    {
        href: "/reels",
        icon: Video,
        title: "Video Reels",
        description: "Watch our latest video reels.",
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
        description: "Download posters for festivals.",
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
        href: "/settings",
        icon: Settings,
        title: "My Settings",
        description: "Manage company info for posters.",
    },
    {
        href: "/help-chat",
        icon: HelpCircle,
        title: "Help & Support",
        description: "Get assistance from our support team.",
    },
]

export default function MorePage() {

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
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
