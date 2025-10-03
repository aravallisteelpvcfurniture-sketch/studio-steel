"use client";

import * as React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBasket, Wrench, GalleryVertical, User, LogIn, Bell, PanelLeft } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: ShoppingBasket },
  { href: '/customize', label: 'Customize', icon: Wrench },
  { href: '/gallery', label: 'Gallery', icon: GalleryVertical },
];

function MainContent({ children }: { children: React.ReactNode }) {
    const { isMobile } = useSidebar();
    return (
        <SidebarInset>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {isMobile && (
                  <div className="flex items-center gap-2 mb-4">
                     <SidebarTrigger />
                     <h1 className="font-semibold text-lg md:text-2xl">Aravalli Steel</h1>
                  </div>
                )}
                {children}
            </main>
        </SidebarInset>
    )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="relative h-10 w-10 flex-shrink-0">
                <Image src="https://res.cloudinary.com/dsgirle5v/image/upload/v1759490183/image-2_asr8zs.jpg" alt="Aravalli Steel Logo" layout="fill" objectFit="contain" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="font-headline text-lg font-bold tracking-wide">Aravalli Steel</span>
                <span className="text-xs text-muted-foreground">PVC Furniture</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
             {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                    <Link href={link.href} className="w-full">
                        <SidebarMenuButton isActive={pathname === link.href} tooltip={link.label}>
                            <link.icon className="h-5 w-5" />
                            <span>{link.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Notifications">
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/login">
                        <SidebarMenuButton tooltip="Login">
                            <LogIn className="h-5 w-5" />
                            <span>Login</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/signup">
                        <SidebarMenuButton tooltip="Sign Up">
                            <User className="h-5 w-5" />
                            <span>Sign Up</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
            <div className="hidden justify-end p-2 group-data-[collapsible=icon]:flex">
                 <SidebarTrigger />
            </div>
        </SidebarFooter>
      </Sidebar>
      <MainContent>
        {children}
      </MainContent>
    </SidebarProvider>
  );
}
