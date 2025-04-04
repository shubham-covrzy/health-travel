import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminProtectedRoute = () => {
  const { user, isLoading, isAdmin } = useAuth();

  // Show loading indicator while checking authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-covrzy-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If not authenticated or not an admin, redirect to login
  if (!user || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated as admin, render the child routes
  return <Outlet />;
};

export default AdminProtectedRoute;