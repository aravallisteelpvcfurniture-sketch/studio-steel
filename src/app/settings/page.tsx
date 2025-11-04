
'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Bell, Palette } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <AppLayout>
            <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><User /> Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Link href="/profile/edit" className="flex items-center justify-between p-4 -mx-4 -my-2 rounded-lg hover:bg-muted">
                            <div>
                                <h3 className="font-semibold">Edit Profile</h3>
                                <p className="text-sm text-muted-foreground">Update your name, mobile, etc.</p>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Palette /> Display</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Theme</h3>
                                <p className="text-sm text-muted-foreground">Choose between light, dark, or system theme.</p>
                            </div>
                            <ThemeSwitcher />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Bell /> Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Push Notifications</h3>
                                <p className="text-sm text-muted-foreground">Receive alerts for new messages and orders.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
