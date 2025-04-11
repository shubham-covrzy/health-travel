import axiosInstance from '../api/axiosConfig';
import { PolicyMembersResponse } from '../types/employee';
import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '../api/apiConfig';

interface LoginResponse {
  token: string;
  userId: string;
  email: string | null;
  phone: string;
  fullName: string | null;
  roles: string[];
  [key: string]: any; // For any additional fields in the response
}

interface OtpSendResponse {
  request_id: string;
  type: string;
}

interface OtpResendResponse {
  message: string;
  type: string;
}

interface UserData {
  userId: string;
  email: string | null;
  phone?: string;
  fullName?: string | null;
  role: string;
  isAuthenticated: boolean;
  [key: string]: any; // For any additional user data fields
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post('/api/auth/login', { email, password });
      if (response.data.token) {
        const { token, roles, ...rest } = response.data;
        const user: UserData = {
          ...rest,
          role: roles[0].toUpperCase(),
          isAuthenticated: true
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendOtp(phone: string): Promise<OtpSendResponse> {
    try {
      const response: AxiosResponse<OtpSendResponse> = await axiosInstance.post(`/api/otp/send?phone=${phone}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(phone: string, retryType: 'text' | 'voice' = 'text'): Promise<OtpResendResponse> {
    try {
      const response: AxiosResponse<OtpResendResponse> = await axiosInstance.post(
        `/api/otp/resend?phone=${phone}&retryType=${retryType}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async loginWithOtp(phone: string, otp: string): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post('/api/otp/login-with-otp', {
        phoneNumber: phone,
        otp
      });

      if (response.data.token) {
        const { token, roles, ...rest } = response.data;
        const user: UserData = {
          ...rest,
          role: roles[0].toUpperCase(),
          isAuthenticated: true
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchPolicyDetails(userId: string): Promise<PolicyMembersResponse> {
    try {
      const response: AxiosResponse<PolicyMembersResponse> = await axiosInstance.get(`/api/users/${userId}/policy-members`);
      return response.data;
    } catch (error) {
      console.error('Error fetching policy members:', error);
      throw error;
    }
  }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('policyDetails');
  }

  getCurrentUser(): UserData | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return Boolean(user && user.role === 'ADMIN');
  }
}

export default new AuthService();