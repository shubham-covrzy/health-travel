// src/api/apiConfig.ts
// API endpoints configuration

// Base URL - should be loaded from environment variable in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)

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

  // Admin endpoints
  ADMIN_MEMBERS: `${API_BASE_URL}/admin/members`,
  ADMIN_MEMBERS_UPLOAD: `${API_BASE_URL}/admin/members/upload`,
  ADMIN_CLAIMS: `${API_BASE_URL}/admin/claims`,
};

// Export request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;