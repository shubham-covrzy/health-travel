// AdminProfilePage.tsx - Admin profile settings
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Shield, User, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminProfilePage = () => {
    const { user } = useAuth();
    const isMobile = useIsMobile();

    return (
        <div className="space-y-6 pb-16 md:pb-0">
            <h1 className="text-2xl font-bold">Admin Profile</h1>

            {/* Admin Profile Card */}
            <Card className="overflow-hidden">
                <div className="bg-covrzy-purple h-24 md:h-32"></div>
                <div className="relative px-6 pb-6">
                    <Avatar className="h-20 w-20 absolute -top-10 border-4 border-white">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xl">{user?.name.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>

                    <div className="pt-12">
                        <h2 className="text-xl font-bold">{user?.name || 'Admin User'}</h2>
                        <p className="text-gray-500">Administrator</p>
                    </div>
                </div>
            </Card>

            {/* Admin Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Admin Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                defaultValue={user?.name || 'Admin User'}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user?.email || 'admin@example.com'}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">
                                Phone
                            </label>
                            <Input
                                id="phone"
                                defaultValue="+91 98765 43210"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium">
                                Role
                            </label>
                            <Input
                                id="role"
                                defaultValue="Administrator"
                                disabled
                            />
                        </div>
                    </div>

                    <Button className="mt-2 bg-covrzy-purple hover:bg-purple-700">
                        Update Information
                    </Button>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Lock className="h-5 w-5 mr-2" />
                        Security Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">
                            Current Password
                        </label>
                        <Input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">
                            New Password
                        </label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">
                            Confirm New Password
                        </label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button className="mt-2 bg-covrzy-purple hover:bg-purple-700">
                        Change Password
                    </Button>
                </CardContent>
            </Card>

            {/* Admin Permissions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Admin Permissions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-yellow-800">
                        <p className="text-sm">You have full administrator privileges. Please contact the system administrator if you need to modify your permission level.</p>
                    </div>
                </CardContent>
            </Card>

            {isMobile && (
                <div className="h-16"></div> // Space for mobile navigation
            )}
        </div>
    );
};

export default AdminProfilePage;