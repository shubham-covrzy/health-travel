// src/api/axiosConfig.js
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with an error status code
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear localStorage and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
          
        case 403:
          // Forbidden
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this resource",
            variant: "destructive",
          });
          break;
          
        case 500:
          // Server error
          toast({
            title: "Server Error",
            description: "Something went wrong on our end. Please try again later.",
            variant: "destructive",
          });
          break;
          
        default:
          // Other errors
          toast({
            title: "Error",
            description: error.response.data.message || "An error occurred",
            variant: "destructive",
          });
      }
    } else if (error.request) {
      // Request was made but no response received (network error)
      toast({
        title: "Network Error",
        description: "Unable to connect to the server. Please check your internet connection.",
        variant: "destructive",
      });
    } else {
      // Something happened in setting up the request
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;