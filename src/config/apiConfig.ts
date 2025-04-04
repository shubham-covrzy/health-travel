
// API endpoints and configuration
const API_BASE_URL = "https://api.example.com"; // Replace with your actual API base URL

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // User endpoints
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  
  // Insurance endpoints
  INSURANCE_DETAILS: `${API_BASE_URL}/insurance/details`,
  
  // Claims endpoints
  CLAIMS_LIST: `${API_BASE_URL}/claims/list`,
  SUBMIT_CLAIM: `${API_BASE_URL}/claims/submit`,
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// API request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
