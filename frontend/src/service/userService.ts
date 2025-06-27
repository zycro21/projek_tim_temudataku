// frontend/src/service/userService.ts
import { apiRequest } from './api';

// Types for user profile
export interface UserRole {
  name: string;
  description: string | null;
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  phone_number: string | null;
  profile_picture: string | null; // Full URL from backend
  profile_picture_filename?: string | null; // Original filename
  city: string | null;
  province: string | null;
  is_email_verified: boolean;
  registration_date: string;
  last_login: string | null;
  is_active: boolean;
  roles: UserRole[];
}

// Types for admin user management
export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string | null;
  profile_picture: string | null; // Updated to include full URL
  profile_picture_filename?: string | null; // Original filename
  city: string | null;
  province: string | null;
  is_active: boolean;
  is_email_verified: boolean;
  registration_date: string;
  last_login: string | null;
  roles: string[]; // Array of role names
  created_at: string;
  updated_at: string | null;
}

export interface UsersResponse {
  status: string;
  message: string;
  data: User[];
}

export interface UpdateProfileData {
  full_name: string;
  phone_number?: string;
  city?: string;
  province?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UserProfileResponse {
  status: string;
  message: string;
  data: UserProfile;
}

export interface ProfilePictureUploadResponse {
  status: string;
  message: string;
  data: {
    id: number;
    email: string;
    full_name: string;
    profile_picture: string; // Full URL to access the image
    profile_picture_filename: string; // Original filename
  };
}

export interface PasswordChangeResponse {
  status: string;
  message: string;
}

// User service functions
const userService = {
  // ===== USER PROFILE MANAGEMENT =====
  
  // Get current user profile
  getCurrentProfile: async (): Promise<UserProfileResponse> => {
    return apiRequest<UserProfileResponse>({
      method: 'GET',
      url: '/user/profile'
    });
  },

  // Update current user profile
  updateProfile: async (profileData: UpdateProfileData): Promise<UserProfileResponse> => {
    return apiRequest<UserProfileResponse>({
      method: 'PUT',
      url: '/user/profile',
      data: profileData
    });
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<ProfilePictureUploadResponse> => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    
    return apiRequest<ProfilePictureUploadResponse>({
      method: 'PATCH',
      url: '/user/profile/picture',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Change password
  changePassword: async (passwordData: ChangePasswordData): Promise<PasswordChangeResponse> => {
    return apiRequest<PasswordChangeResponse>({
      method: 'PUT',
      url: '/user/change-password',
      data: passwordData
    });
  },

  // ===== ADMIN USER MANAGEMENT =====
  
  // Get all users (admin only)
  getAllUsers: async (): Promise<UsersResponse> => {
    try {
      return await apiRequest<UsersResponse>({
        method: 'GET',
        url: '/admin/users'
      });
    } catch (error) {
      console.error("Error fetching all users:", error);
      // Return minimal valid response in case of error
      return {
        status: 'error',
        message: 'Failed to fetch users',
        data: []
      };
    }
  },

  // Filter users by role (this is done locally)
  getUsersByRole: async (role: string): Promise<User[]> => {
    try {
      const response = await userService.getAllUsers();
      if (response.status === 'success') {
        return response.data.filter(user => 
          user.roles.includes(role)
        );
      }
      return [];
    } catch (error) {
      console.error(`Error filtering users by role ${role}:`, error);
      return [];
    }
  },

  // Get admin users
  getAdmins: async (): Promise<User[]> => {
    return userService.getUsersByRole('ADMIN');
  },

  // Get mentor users
  getMentors: async (): Promise<User[]> => {
    return userService.getUsersByRole('MENTOR');
  },

  // Get mentee users
  getMentees: async (): Promise<User[]> => {
    return userService.getUsersByRole('MENTEE');
  },

  // Get admin count
  getAdminCount: async (): Promise<number> => {
    try {
      const admins = await userService.getAdmins();
      return admins.length;
    } catch (error) {
      console.error("Error counting admins:", error);
      return 0;
    }
  },

  // Get mentor count
  getMentorCount: async (): Promise<number> => {
    try {
      const mentors = await userService.getMentors();
      return mentors.length;
    } catch (error) {
      console.error("Error counting mentors:", error);
      return 0;
    }
  },

  // Get new users in a given period
  getNewUsersSince: async (date: Date): Promise<User[]> => {
    try {
      const response = await userService.getAllUsers();
      if (response.status === 'success') {
        return response.data.filter(user => {
          const registrationDate = new Date(user.registration_date);
          return registrationDate >= date;
        });
      }
      return [];
    } catch (error) {
      console.error("Error filtering new users:", error);
      return [];
    }
  },

  // ===== PROFILE PICTURE UTILITIES =====

  // Helper function to get profile picture URL
  getProfilePictureUrl: (profilePicture: string | null): string | null => {
    if (!profilePicture) return null;
    
    // If profile_picture already contains full URL (from new backend response), return as is
    if (profilePicture.startsWith('http')) {
      return profilePicture;
    }
    
    // For backward compatibility, construct URL if it's just filename
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}/api/static/profile/${profilePicture}`;
  },

  // Fetch profile picture directly (useful for caching or validation)
  fetchProfilePicture: async (filename: string): Promise<Blob> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/static/profile/${filename}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch profile picture: ${response.statusText}`);
    }
    
    return response.blob();
  },

  // Get profile picture info without downloading
  getProfilePictureInfo: async (filename: string) => {
    return apiRequest({
      method: 'GET',
      url: `/static/profile/${filename}/info`
    });
  },

  // Validate profile picture file before upload
  validateProfilePicture: (file: File): { isValid: boolean; error?: string } => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed'
      };
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 5MB'
      };
    }

    return { isValid: true };
  }
};

export default userService;