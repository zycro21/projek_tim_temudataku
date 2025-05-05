// frontend/src/service/authService.ts
import { apiRequest } from './api';

// Types
interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone_number?: string;
  city?: string;
  province?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  status: string;
  message: string;
  data?: {
    user: {
      id: number;
      email: string;
      full_name: string;
      roles: string[];
    };
    token: string;
  };
}

// Main auth service functions
const authService = {
  // Register a new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/register',
      data: userData
    });
  },

  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data: credentials
    });

    // Store token and user data in localStorage
    if (response.status === 'success' && response.data) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }

    return response;
  },

  // Verify email with token
  verifyEmail: async (token: string): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>({
      method: 'GET',
      url: `/auth/verify-email/${token}`
    });
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('auth_token') !== null;
  },

  // Get current user data
  getCurrentUser: () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  // Get authentication token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
};

export default authService;
export type { RegisterData, LoginData, AuthResponse };