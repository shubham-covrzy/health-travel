// Updated AdminLayout.tsx with support dialog
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
    Home,
    Users,
    FileText,
    User,
    HelpCircle,
    LogOut,
    Settings
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminSupportDialog from "./AdminSupportDialog";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const isMobile = useIsMobile();
    const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
            {/* Admin Navbar - similar to main app but with admin indicator */}
            <nav className="border-b bg-white py-3 px-4 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <NavLink to="/admin" className="flex items-center">
                        <div className="relative flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-[#7E3AF2] bg-opacity-10">
                            <div className="absolute inset-0 m-1 rounded-full bg-[#7E3AF2]"></div>
                            <div className="absolute inset-0 m-3 rounded-full bg-white"></div>
                        </div>
                        <span className="font-semibold text-xl tracking-tight text-[#1A1F2C]">Covrzy <span className="text-covrzy-purple">Admin</span></span>
                    </NavLink>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        className="hidden md:flex items-center gap-1"
                        onClick={() => setIsSupportDialogOpen(true)}
                    >
                        <HelpCircle className="h-5 w-5" />
                        <span>Support</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" />
                                    <AvatarFallback>{user?.name.charAt(0) || 'A'}</AvatarFallback>
                                </Avatar>
                                <span className="hidden md:inline-block">{user?.name.split(' ')[0] || 'Admin'}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <NavLink to="/admin/profile">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </NavLink>
                            <NavLink to="/admin/settings">
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </NavLink>
                            <DropdownMenuItem onClick={() => setIsSupportDialogOpen(true)}>
                                <HelpCircle className="mr-2 h-4 w-4" />
                                <span>Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - similar to main app but with admin options */}
                {!isMobile && (
                    <div className="w-64 bg-white border-r flex-shrink-0 overflow-y-auto flex flex-col justify-between">
                        <nav className="p-4 space-y-2">
                            <NavLink
                                to="/admin"
                                className={({ isActive }) => cn(
                                    "flex items-center p-3 text-base font-medium rounded-lg",
                                    isActive
                                        ? "bg-covrzy-purple text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                                end
                            >
                                <Home className="h-5 w-5 mr-3" />
                                <span>Dashboard</span>
                            </NavLink>

                            <NavLink
                                to="/admin/members"
                                className={({ isActive }) => cn(
                                    "flex items-center p-3 text-base font-medium rounded-lg",
                                    isActive
                                        ? "bg-covrzy-purple text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <Users className="h-5 w-5 mr-3" />
                                <span>Members</span>
                            </NavLink>

                            <NavLink
                                to="/admin/claims"
                                className={({ isActive }) => cn(
                                    "flex items-center p-3 text-base font-medium rounded-lg",
                                    isActive
                                        ? "bg-covrzy-purple text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <FileText className="h-5 w-5 mr-3" />
                                <span>Claims</span>
                            </NavLink>

                            <NavLink
                                to="/admin/profile"
                                className={({ isActive }) => cn(
                                    "flex items-center p-3 text-base font-medium rounded-lg",
                                    isActive
                                        ? "bg-covrzy-purple text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <User className="h-5 w-5 mr-3" />
                                <span>Profile</span>
                            </NavLink>

                            <NavLink
                                to="/admin/settings"
                                className={({ isActive }) => cn(
                                    "flex items-center p-3 text-base font-medium rounded-lg",
                                    isActive
                                        ? "bg-covrzy-purple text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <Settings className="h-5 w-5 mr-3" />
                                <span>Settings</span>
                            </NavLink>
                        </nav>

                        <div className="p-4 border-t mt-auto">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm">
                                    <div className="flex items-center">
                                        <span className="mr-1">Admin</span>
                                        <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span className="ml-1">Covrzy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Navigation - if needed */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 px-4 z-50">
                    <NavLink
                        to="/admin"
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center py-2 px-3",
                            isActive ? "text-covrzy-purple" : "text-gray-500"
                        )}
                        end
                    >
                        <Home className="h-5 w-5" />
                        <span className="text-xs mt-1">Home</span>
                    </NavLink>

                    <NavLink
                        to="/admin/members"
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center py-2 px-3",
                            isActive ? "text-covrzy-purple" : "text-gray-500"
                        )}
                    >
                        <Users className="h-5 w-5" />
                        <span className="text-xs mt-1">Members</span>
                    </NavLink>

                    <NavLink
                        to="/admin/claims"
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center py-2 px-3",
                            isActive ? "text-covrzy-purple" : "text-gray-500"
                        )}
                    >
                        <FileText className="h-5 w-5" />
                        <span className="text-xs mt-1">Claims</span>
                    </NavLink>

                    <NavLink
                        to="/admin/profile"
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center py-2 px-3",
                            isActive ? "text-covrzy-purple" : "text-gray-500"
                        )}
                    >
                        <User className="h-5 w-5" />
                        <span className="text-xs mt-1">Profile</span>
                    </NavLink>
                </div>
            )}

            {/* Support Dialog */}
            <AdminSupportDialog
                open={isSupportDialogOpen}
                onOpenChange={setIsSupportDialogOpen}
            />
        </div>
    );
};

export default AdminLayout;