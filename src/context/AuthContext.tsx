import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "@/components/ui/use-toast";

// Import the policy interfaces
import { PolicyMembersResponse, User } from "../types/employee";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithOtp: (phone: string, otp: string) => Promise<void>;
  sendOtp: (phone: string) => Promise<{ request_id: string; type: string }>;
  resendOtp: (phone: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth object available to any child component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      const currentUser = authService.getCurrentUser();

      if (currentUser) {
        // Create the base user object
        const userObj: User = {
          userId: currentUser.userId,
          email: currentUser.email,
          phone: currentUser.phone,
          fullName: currentUser.fullName,
          isAuthenticated: true,
          role: currentUser.role
        };

        // If we have policy members stored, add them to the user object
        const policyDetails = localStorage.getItem('policyDetails');
        if (policyDetails) {
          userObj.policyDetails = JSON.parse(policyDetails);
        } else {
          // If policy members aren't in localStorage but we have a user,
          // try to fetch them
          try {
            const members = await authService.fetchPolicyDetails(currentUser.userId);
            userObj.policyDetails = members;
            localStorage.setItem('policyDetails', JSON.stringify(members));
          } catch (error) {
            console.error("Failed to fetch policy members on init:", error);
          }
        }

        setUser(userObj);
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function - uses email/password
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      // Call the login service
      const data = await authService.login(email, password);

      // Initialize user object
      const userObj: User = {
        userId: data.userId,
        email: data.email,
        phone: data.phone,
        fullName: data.fullName,
        isAuthenticated: true,
        role: data.roles[0].toUpperCase()
      };

      // Fetch policy members for the user
      try {
        const policyDetails: PolicyMembersResponse = await authService.fetchPolicyDetails(data.userId);
        userObj.policyDetails = policyDetails;

        // Store policy members in localStorage for future use
        localStorage.setItem('policyDetails', JSON.stringify(policyDetails));
      } catch (error) {
        console.error("Failed to fetch policy members:", error);
        // Continue with login even if policy members fetch fails
      }

      // Set user in state with policy members (if available)
      setUser(userObj);

      // Navigate based on role
      if (data.roles[0].toUpperCase() === 'ADMIN') {
        navigate("/admin/");
      } else {
        navigate("/");
      }

      // Show success toast
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP function
  const sendOtp = async (phone: string): Promise<{ request_id: string; type: string }> => {
    try {
      const response = await authService.sendOtp(phone);
      return response;
    } catch (error) {
      console.error("Send OTP failed:", error);
      throw error;
    }
  };

  // Resend OTP function
  const resendOtp = async (phone: string): Promise<void> => {
    try {
      await authService.resendOtp(phone);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      throw error;
    }
  };

  // Login with OTP function
  // Login with OTP function
  const loginWithOtp = async (phone: string, otp: string): Promise<void> => {
    setIsLoading(true);

    try {
      // Call the OTP login service
      const data = await authService.loginWithOtp(phone, otp);

      // Initialize user object
      const userObj: User = {
        userId: data.userId,
        email: data.email,
        phone: data.phone,
        fullName: data.fullName,
        isAuthenticated: true,
        role: data.roles[0].toUpperCase()
      };

      // Set user in state with policy members (if available)
      setUser(userObj);

      // Fetch policy members for the user
      try {
        const policyDetails: PolicyMembersResponse = await authService.fetchPolicyDetails(data.userId);
        userObj.policyDetails = policyDetails;

        // Store policy members in localStorage for future use
        localStorage.setItem('policyDetails', JSON.stringify(policyDetails));
      } catch (error) {
        console.error("Failed to fetch policy members:", error);
        // Continue with login even if policy members fetch fails
      }

      // Navigate to home since OTP login is only for regular users
      navigate("/");

      // Show success toast
      toast({
        title: "Login successful",
        description: `Welcome${userObj.fullName ? ', ' + userObj.fullName : ''}!`,
      });

    } catch (error) {
      console.error("OTP login failed:", error);
      // Rethrow the error to be handled by the component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    // Also remove policy members when logging out
    localStorage.removeItem('policyDetails');
    setUser(null);
    navigate("/login");
  };

  // Helper function to check if user is admin
  const isAdmin = (): boolean => {
    return authService.isAdmin();
  };

  // Context value
  const value = {
    user,
    login,
    loginWithOtp,
    sendOtp,
    resendOtp,
    logout,
    isLoading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};