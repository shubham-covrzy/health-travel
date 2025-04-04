
import { Home, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 px-4 z-50">
      <NavLink 
        to="/" 
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
        to="/claims" 
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center py-2 px-3",
          isActive ? "text-covrzy-purple" : "text-gray-500"
        )}
      >
        <FileText className="h-5 w-5" />
        <span className="text-xs mt-1">Claims</span>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center py-2 px-3",
          isActive ? "text-covrzy-purple" : "text-gray-500"
        )}
      >
        <User className="h-5 w-5" />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </div>
  );
};

export default MobileNavigation;
