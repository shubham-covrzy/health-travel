// Updated App.tsx with AdminSettings
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ClaimsPage from "./pages/ClaimsPage";
import NotFound from "./pages/NotFound";
import PlannedCashlessClaimPage from "./pages/PlannedCashlessClaimPage";
import UserProfile from "./pages/UserProfile";
import NoInsurance from "./pages/NoInsurance";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import EmergencyCashlessClaimPage from "./pages/EmergencyCashlessClaimPage";
import ReimbursementClaimPage from "./pages/ReimbursementClaimPage";
import AdminLayout from "./components/AdminLayout";
import MembersPage from "./pages/admin/MembersPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClaimsPage from "./pages/admin/AdminClaimsPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminSettings from "./pages/admin/AdminSettings";
import UploadMembersPage from "./pages/admin/UploadMembersPage";
import ReviewMembersDataPage from "./pages/admin/ReviewMembersDataPage";
import AddIndividualMemberPage from "./pages/admin/AddIndividualMemberPage"; // You'd need to create this
import InviteMembersPage from "./pages/admin/InviteMembersPage"; // You'd need to create this

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

            {/* Protected routes for regular users */}
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

            {/* Protected routes for admin users */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="members">
                  <Route index element={<MembersPage />} />
                  <Route path="add-individual" element={<AddIndividualMemberPage />} />
                  <Route path="upload" element={<UploadMembersPage />} />
                  <Route path="review" element={<ReviewMembersDataPage />} />
                  <Route path="invite" element={<InviteMembersPage />} />
                </Route>
                <Route path="claims" element={<AdminClaimsPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>


            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;