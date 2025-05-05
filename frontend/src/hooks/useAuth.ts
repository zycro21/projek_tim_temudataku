// frontend/src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import authService, { 
  LoginData, 
  RegisterData,
} from '../service/authService';

// Define User interface
interface User {
  id: number;
  email: string;
  full_name: string;
  roles: string[];
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Custom error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const userData = authService.getCurrentUser();
        setUser(userData as User);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      
      if (response.status === 'success' && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      if (response.status !== 'success') {
        setError(response.message || 'Registration failed');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify email function
  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.verifyEmail(token);
      
      if (response.status !== 'success') {
        setError(response.message || 'Email verification failed');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Email verification failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback((): void => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Clear error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    verifyEmail,
    logout,
    clearError
  };
};

export default useAuth;