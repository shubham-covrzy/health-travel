import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define the shape of the user object with role information
interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  role: "user" | "admin";  // Added role field
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;  // Helper method to check if user is admin
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = {
  regular: {
    id: "123",
    name: "Sachin Tendulkar",
    email: "demo@example.com",
    isAuthenticated: true,
    role: "user" as const,
  },
  admin: {
    id: "999",
    name: "Thota Veera Venkata Ratna Kumar",
    email: "admin@example.com",
    isAuthenticated: true,
    role: "admin" as const,
  }
};

// Provider component that wraps your app and makes auth object available to any child component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      // In a real app, you would check localStorage, session, or cookies
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function - in a real app would make an API call
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check for admin login
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify(MOCK_USERS.admin));
        setUser(MOCK_USERS.admin);
        navigate("/admin/");
        return;
      }

      // Check for regular user login
      if (email === "demo@example.com" && password === "password") {
        localStorage.setItem("user", JSON.stringify(MOCK_USERS.regular));
        setUser(MOCK_USERS.regular);
        navigate("/");
        return;
      }

      // If neither matched
      throw new Error("Invalid credentials");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Helper function to check if user is admin
  const isAdmin = (): boolean => {
    return user?.role === "admin";
  };

  // Context value
  const value = {
    user,
    login,
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