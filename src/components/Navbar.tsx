import { ChevronDown, HelpCircle, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import SupportDialog from "./SupportDialog";
import { useAuth } from "@/context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="border-b bg-white py-3 px-4 flex items-center justify-between h-16">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="relative flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-[#7E3AF2] bg-opacity-10">
            <div className="absolute inset-0 m-1 rounded-full bg-[#7E3AF2]"></div>
            <div className="absolute inset-0 m-3 rounded-full bg-white"></div>
          </div>
          <span className="font-semibold text-xl tracking-tight text-[#1A1F2C]">{t('common.appName')}</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <LanguageSwitcher />

        <Button
          variant="ghost"
          className="hidden md:flex items-center gap-1"
          onClick={() => setIsSupportDialogOpen(true)}
        >
          <HelpCircle className="h-5 w-5" />
          <span>{t('common.support')}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>{user?.name.charAt(0) || 'S'}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">{user?.name.split(' ')[0] || 'Sachin'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Link to="/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t('common.profile')}</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setIsSupportDialogOpen(true)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>{t('common.support')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('common.logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SupportDialog
        open={isSupportDialogOpen}
        onOpenChange={setIsSupportDialogOpen}
      />
    </nav>
  );
};

export default Navbar;