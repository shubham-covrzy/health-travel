import { Home, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="w-64 bg-white border-r flex-shrink-0  overflow-y-auto flex flex-col justify-between">
      <nav className="p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) => cn(
            "flex items-center p-3 text-base font-medium rounded-lg",
            isActive
              ? "bg-covrzy-purple text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
          end
        >
          <Home className="h-5 w-5 mr-3" />
          <span>{t('nav.home')}</span>
        </NavLink>

        <NavLink
          to="/claims"
          className={({ isActive }) => cn(
            "flex items-center p-3 text-base font-medium rounded-lg",
            isActive
              ? "bg-covrzy-purple text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <FileText className="h-5 w-5 mr-3" />
          <span>{t('nav.claims')}</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => cn(
            "flex items-center p-3 text-base font-medium rounded-lg",
            isActive
              ? "bg-covrzy-purple text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <User className="h-5 w-5 mr-3" />
          <span>{t('nav.profile')}</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center space-x-2">
          <div className="text-sm">
            <div className="flex items-center">
              <span className="mr-1">We</span>
              <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="ml-1">Covrzy Demo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;