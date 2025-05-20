// frontend/src/hooks/useMentorAdmin.ts
import { useState, useEffect, useCallback } from 'react';
import mentorService, {
  UpdateMentorProfileData,
  CreateMentorUserData
} from '../service/mentorService';
import { toast } from 'sonner';
import { Mentor, MentorData, mapApiMentorsToUiMentorData } from '../components/DashboardAdmin/Mentor/types';

interface UseMentorAdminReturn {
  // Data states
  mentorData: MentorData | null;
  selectedMentor: Mentor | null;
  // UI states
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  // Actions
  fetchMentorData: (page?: number, limit?: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (limit: number) => void;
  selectMentor: (mentor: Mentor) => void;
  addMentor: (newMentor: Mentor) => Promise<boolean>;
  updateMentor: (updatedMentor: Mentor) => Promise<boolean>;
  deleteMentor: (mentorId: string) => Promise<boolean>;
  toggleMentorStatus: (mentorId: string) => Promise<boolean>;
  // Helper actions
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

export const useMentorAdmin = (): UseMentorAdminReturn => {
  // Data states
  const [mentorData, setMentorData] = useState<MentorData | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  
  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch mentor data
  const fetchMentorData = useCallback(async (page: number = currentPage, limit: number = itemsPerPage): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mentorService.getAllMentors(page, limit);
      
      if (response.status === 'success' && response.data) {
        // Hitung jumlah mentor yang ditambahkan dalam seminggu terakhir
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        const recentlyAdded = response.data.profiles.filter(mentor => {
          const createdAt = new Date(mentor.created_at);
          return createdAt >= lastWeek;
        }).length;
        
        const recentlyAddedText = recentlyAdded > 0 ? `+${recentlyAdded} minggu ini` : '';
        
        // Konversi dari format API ke format UI
        const uiData = mapApiMentorsToUiMentorData(
          response.data.profiles,
          response.data.pagination.total,
          recentlyAddedText
        );
        
        setMentorData(uiData);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || 'Failed to fetch mentors');
        toast.error('Gagal memuat data mentor', {
          description: response.message || 'Failed to fetch mentors'
        });
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to fetch mentors';
      setError(errorMessage);
      toast.error('Gagal memuat data mentor', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  // Initialize data on component mount and when page/limit changes
  useEffect(() => {
    fetchMentorData(currentPage, itemsPerPage);
  }, [fetchMentorData, currentPage, itemsPerPage]);

  // Select a mentor
  const selectMentor = (mentor: Mentor): void => {
    setSelectedMentor(mentor);
  };

  // Add a new mentor
  const addMentor = async (newMentor: Mentor): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Create a user with MENTOR role
      const createUserData: CreateMentorUserData = {
        email: newMentor.email,
        password: newMentor.password || "Mentor123456", // Default password if not provided
        full_name: newMentor.fullName,
        phone_number: newMentor.phoneNumber || "08123456789", // Default if not provided
        city: newMentor.city || "Jakarta", // Default if not provided
        province: newMentor.province || "DKI Jakarta", // Default if not provided
        role: "MENTOR"
      };
      
      const createUserResponse = await mentorService.createMentorUser(createUserData);
      
      if (createUserResponse.status !== 'success') {
        setError(createUserResponse.message || 'Failed to create mentor user');
        toast.error('Gagal membuat user mentor', {
          description: createUserResponse.message || 'Failed to create mentor user'
        });
        return false;
      }
      
      // Step 2: Create a mentor profile for the new user
      const userId = createUserResponse.data.id;
      
      // Prepare mentor data for API
      const mentorProfileData = {
        user_id: userId,
        expertise: newMentor.expertise || '',
        bio: newMentor.bio || '',
        experience: newMentor.experience || '', 
        availability_schedule: {
          monday: ['9:00-17:00'],
          tuesday: ['9:00-17:00'],
          wednesday: ['9:00-17:00'],
          thursday: ['9:00-17:00'],
          friday: ['9:00-17:00']
        },
        hourly_rate: parseInt(newMentor.hourlyRate || '0')
      };
      
      const createProfileResponse = await mentorService.createMentorProfile(mentorProfileData);
      
      if (createProfileResponse.status !== 'success') {
        setError(createProfileResponse.message || 'Failed to create mentor profile');
        toast.error('Gagal membuat profil mentor', {
          description: createProfileResponse.message || 'Failed to create mentor profile'
        });
        return false;
      }
      
      // Step 3: Upload profile picture if provided
      if (newMentor.photoFile) {
        try {
          await mentorService.uploadMentorPhoto(userId, newMentor.photoFile);
        } catch (photoError) {
          console.error('Error uploading photo:', photoError);
          // We continue even if photo upload fails
          toast.warning('Foto profil gagal diunggah, tetapi mentor berhasil dibuat');
        }
      }
      
      // Success
      toast.success('Mentor berhasil ditambahkan', {
        description: 'Data mentor baru telah berhasil ditambahkan'
      });
      
      await fetchMentorData(); // Refresh the data
      return true;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to add mentor';
      setError(errorMessage);
      toast.error('Gagal menambahkan mentor', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a mentor
  const updateMentor = async (updatedMentor: Mentor): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    if (!updatedMentor.id) {
      setError('Mentor ID is required');
      setIsLoading(false);
      return false;
    }
    
    try {
      // Convert from UI model to API model
      const updateData: UpdateMentorProfileData = {
        expertise: updatedMentor.expertise,
        bio: updatedMentor.bio,
        experience: updatedMentor.experience,
        is_verified: updatedMentor.isActive,
        hourly_rate: parseInt(updatedMentor.hourlyRate || '0'),
        availability_schedule: updatedMentor.availabilitySchedule
      };
      
      const mentorId = parseInt(updatedMentor.id);
      const response = await mentorService.updateMentorProfileById(mentorId, updateData);
      
      if (response.status === 'success') {
        // If there's a new photo, upload it
        if (updatedMentor.photoFile) {
          try {
            await mentorService.uploadMentorPhoto(response.data.user_id, updatedMentor.photoFile);
          } catch (photoError) {
            console.error('Error uploading photo:', photoError);
            // We continue even if photo upload fails
            toast.warning('Foto profil gagal diperbarui, tetapi data mentor berhasil diubah');
          }
        }
        
        toast.success('Mentor berhasil diperbarui', {
          description: 'Data mentor telah berhasil diperbarui'
        });
        await fetchMentorData(); // Refresh the data
        return true;
      } else {
        setError(response.message || 'Failed to update mentor');
        toast.error('Gagal memperbarui mentor', {
          description: response.message || 'Failed to update mentor'
        });
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to update mentor';
      setError(errorMessage);
      toast.error('Gagal memperbarui mentor', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a mentor (in real API, you might want to deactivate instead of delete)
  const deleteMentor = async (mentorId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In this implementation, we'll toggle is_verified to false instead of deleting
      // since there might not be a direct delete endpoint
      const id = parseInt(mentorId);
      
      // First check if mentor is already active
      const toggleTo = false; // We want to deactivate
      
      // If needed, you could first fetch the mentor to check current status
      // const mentorResponse = await mentorService.getMentorById(id);
      // toggleTo = !mentorResponse.data.is_verified;
      
      const response = await mentorService.updateMentorProfileById(id, {
        is_verified: toggleTo
      });
      
      if (response.status === 'success') {
        toast.success('Mentor berhasil dinonaktifkan', {
          description: 'Mentor telah berhasil dinonaktifkan'
        });
        await fetchMentorData(); // Refresh the data
        return true;
      } else {
        setError(response.message || 'Failed to deactivate mentor');
        toast.error('Gagal menonaktifkan mentor', {
          description: response.message || 'Failed to deactivate mentor'
        });
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to deactivate mentor';
      setError(errorMessage);
      toast.error('Gagal menonaktifkan mentor', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle mentor's active status
  const toggleMentorStatus = async (mentorId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const id = parseInt(mentorId);
      
      // First, get current mentor status
      const mentorResponse = await mentorService.getMentorById(id);
      if (mentorResponse.status !== 'success') {
        throw new Error('Failed to get mentor details');
      }
      
      // Toggle to opposite of current status
      const currentStatus = mentorResponse.data.is_verified;
      const newStatus = !currentStatus;
      
      // Update with new status
      const response = await mentorService.updateMentorProfileById(id, {
        is_verified: newStatus
      });
      
      if (response.status === 'success') {
        const statusText = newStatus ? 'diaktifkan' : 'dinonaktifkan';
        
        toast.success(`Status mentor berhasil ${statusText}`, {
          description: `Mentor telah berhasil ${statusText}`
        });
        
        await fetchMentorData(); // Refresh the data
        return true;
      } else {
        setError(response.message || 'Failed to toggle mentor status');
        toast.error('Gagal mengubah status mentor', {
          description: response.message || 'Failed to toggle mentor status'
        });
        return false;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const errorMessage = apiError.response?.data?.message || apiError.message || 'Failed to toggle mentor status';
      setError(errorMessage);
      toast.error('Gagal mengubah status mentor', {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error
  const clearError = (): void => {
    setError(null);
  };

  return {
    mentorData,
    selectedMentor,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    totalPages,
    fetchMentorData,
    setCurrentPage,
    setItemsPerPage,
    selectMentor,
    addMentor,
    updateMentor,
    deleteMentor,
    toggleMentorStatus,
    clearError
  };
};

export default useMentorAdmin;