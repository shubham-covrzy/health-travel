
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ClaimsPage from "./pages/ClaimsPage";
import NotFound from "./pages/NotFound";
import PlannedCashlessClaimPage from "./pages/PlannedCashlessClaimPage";
import UserProfile from "./pages/UserProfile";
import NoInsurance from "./pages/NoInsurance";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import EmergencyCashlessClaimPage from "./pages/EmergencyCashlessClaimPage";
import ReimbursementClaimPage from "./pages/ReimbursementClaimPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/no-insurance" element={<NoInsurance />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="claims" element={<ClaimsPage />} />
                <Route path="planned-cashless-claim" element={<PlannedCashlessClaimPage />} />
                <Route path="emergency-cashless-claim" element={<EmergencyCashlessClaimPage />} />
                <Route path="reimbursement-claim" element={<ReimbursementClaimPage />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
