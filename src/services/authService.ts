import axiosInstance from '../api/axiosConfig';
import { PolicyMembersResponse } from '../types/user';
import { AxiosResponse } from 'axios';

interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  roles: string[];
  [key: string]: any; // For any additional fields in the response
}

interface UserData {
  userId: string;
  email: string;
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