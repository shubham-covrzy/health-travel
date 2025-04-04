// Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar />}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default Layout;