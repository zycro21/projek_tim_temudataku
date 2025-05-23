// frontend/src/hooks/useMentor.ts
import { useState, useCallback } from 'react';
import mentorService, {
  Mentor,
  CreateMentorProfileData,
  UpdateMentorProfileData
} from '../service/mentorService';

// Custom error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

interface UseMentorReturn {
  // Data states
  mentors: Mentor[];
  currentMentor: Mentor | null;
  selectedMentor: Mentor | null;
  // State indicators
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  // Actions
  getAllMentors: (page?: number, limit?: number) => Promise<void>;
  getMentorById: (mentorId: number) => Promise<void>;
  getMentorByUserId: (userId: number) => Promise<void>;
  getCurrentMentorProfile: () => Promise<void>;
  updateCurrentMentorProfile: (profileData: UpdateMentorProfileData) => Promise<boolean>;
  createMentorProfile: (profileData: CreateMentorProfileData) => Promise<boolean>;
  updateMentorProfileById: (mentorId: number, profileData: UpdateMentorProfileData) => Promise<boolean>;
  toggleMentorVerification: (mentorId: number) => Promise<boolean>;
  clearError: () => void;
}

export const useMentor = (): UseMentorReturn => {
  // Data states
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [currentMentor, setCurrentMentor] = useState<Mentor | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  // State indicators
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  // Get all mentors with pagination
  const getAllMentors = useCallback(async (page: number = 1, limit: number = 10): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.getAllMentors(page, limit);
      
      if (response.status === 'success' && response.data) {
        setMentors(response.data.profiles);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Failed to fetch mentors');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to fetch mentors. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get mentor by ID
  const getMentorById = useCallback(async (mentorId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.getMentorById(mentorId);
      
      if (response.status === 'success' && response.data) {
        setSelectedMentor(response.data);
      } else {
        setError(response.message || 'Failed to fetch mentor');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to fetch mentor. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get mentor by user ID
  const getMentorByUserId = useCallback(async (userId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.getMentorByUserId(userId);
      
      if (response.status === 'success' && response.data) {
        setSelectedMentor(response.data);
      } else {
        setError(response.message || 'Failed to fetch mentor');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to fetch mentor. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get current mentor profile (authenticated mentor)
  const getCurrentMentorProfile = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.getCurrentMentorProfile();
      
      if (response.status === 'success' && response.data) {
        setCurrentMentor(response.data);
      } else {
        setError(response.message || 'Failed to fetch mentor profile');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to fetch mentor profile. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update current mentor profile (authenticated mentor)
  const updateCurrentMentorProfile = useCallback(async (profileData: UpdateMentorProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.updateCurrentMentorProfile(profileData);
      
      if (response.status === 'success' && response.data) {
        setCurrentMentor(response.data);
        return true;
      } else {
        setError(response.message || 'Failed to update mentor profile');
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to update mentor profile. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new mentor profile (admin only)
  const createMentorProfile = useCallback(async (profileData: CreateMentorProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.createMentorProfile(profileData);
      
      if (response.status === 'success' && response.data) {
        // After creating a new mentor, refresh the list
        await getAllMentors(pagination.page, pagination.limit);
        return true;
      } else {
        setError(response.message || 'Failed to create mentor profile');
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to create mentor profile. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getAllMentors, pagination.page, pagination.limit]);

  // Update mentor profile by ID (admin only)
  const updateMentorProfileById = useCallback(async (mentorId: number, profileData: UpdateMentorProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.updateMentorProfileById(mentorId, profileData);
      
      if (response.status === 'success' && response.data) {
        // If this is the currently selected mentor, update it
        if (selectedMentor && selectedMentor.id === mentorId) {
          setSelectedMentor(response.data);
        }
        
        // If this is the current mentor, update it
        if (currentMentor && currentMentor.id === mentorId) {
          setCurrentMentor(response.data);
        }
        
        // Update the mentor in the mentors array
        setMentors(prevMentors => 
          prevMentors.map(mentor => 
            mentor.id === mentorId ? response.data : mentor
          )
        );
        
        return true;
      } else {
        setError(response.message || 'Failed to update mentor profile');
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to update mentor profile. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentMentor, selectedMentor]);

  // Toggle mentor verification status (admin only)
  const toggleMentorVerification = useCallback(async (mentorId: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.toggleMentorVerification(mentorId);
      
      if (response.status === 'success' && response.data) {
        // If this is the currently selected mentor, update it
        if (selectedMentor && selectedMentor.id === mentorId) {
          setSelectedMentor(response.data);
        }
        
        // Update the mentor in the mentors array
        setMentors(prevMentors => 
          prevMentors.map(mentor => 
            mentor.id === mentorId ? response.data : mentor
          )
        );
        
        return true;
      } else {
        setError(response.message || 'Failed to toggle mentor verification');
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to toggle mentor verification. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedMentor]);

  // Clear error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    mentors,
    currentMentor,
    selectedMentor,
    isLoading,
    error,
    pagination,
    getAllMentors,
    getMentorById,
    getMentorByUserId,
    getCurrentMentorProfile,
    updateCurrentMentorProfile,
    createMentorProfile,
    updateMentorProfileById,
    toggleMentorVerification,
    clearError
  };
};

export default useMentor;