// frontend/src/service/mentorService.ts
import { apiRequest } from './api';

// Types
export interface MentorAvailabilitySchedule {
  [day: string]: string[];
}

export interface MentoringService {
  id: number;
  mentor_id: number;
  service_name: string;
  description: string;
  price: string;
  service_type: string;
  max_participants: number | null;
  duration_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface MentorUser {
  id: number;
  full_name: string;
  email: string;
  profile_picture: string | null;
  city: string | null;
  province: string | null;
}

export interface Mentor {
  id: number;
  user_id: number;
  expertise: string;
  bio: string;
  experience: string;
  availability_schedule: MentorAvailabilitySchedule;
  hourly_rate: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string | null;
  user: MentorUser;
  mentoring_services?: MentoringService[];
}

export interface MentorDataResponse {
  status: string;
  message: string;
  data: Mentor;
}

export interface MentorsDataResponse {
  status: string;
  message: string;
  data: {
    profiles: Mentor[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface CreateMentorProfileData {
  user_id: number;
  expertise: string;
  bio: string;
  experience: string;
  availability_schedule: MentorAvailabilitySchedule;
  hourly_rate: number;
}

export interface UpdateMentorProfileData {
  expertise?: string;
  bio?: string;
  experience?: string;
  availability_schedule?: MentorAvailabilitySchedule;
  hourly_rate?: number;
  is_verified?: boolean;
}

export interface CreateMentorUserData {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  city: string;
  province: string;
  role: string;
}

export interface CreateUserResponse {
  status: string;
  message: string;
  data: {
    id: number;
    email: string;
    full_name: string;
    roles: string[];
  };
}

// Main mentor service functions
const mentorService = {
  // Create user with MENTOR role (admin only)
  createMentorUser: async (userData: CreateMentorUserData): Promise<CreateUserResponse> => {
    return apiRequest<CreateUserResponse>({
      method: 'POST',
      url: '/admin/users',
      data: userData
    });
  },

  // Get all mentors with pagination
  getAllMentors: async (page: number = 1, limit: number = 10): Promise<MentorsDataResponse> => {
    return apiRequest<MentorsDataResponse>({
      method: 'GET',
      url: `/mentors?page=${page}&limit=${limit}`
    });
  },

  // Get mentor by ID
  getMentorById: async (mentorId: number): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'GET',
      url: `/mentors/${mentorId}`
    });
  },

  // Get mentor by user ID
  getMentorByUserId: async (userId: number): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'GET',
      url: `/mentors/user/${userId}`
    });
  },

  // Get current mentor profile (authenticated mentor)
  getCurrentMentorProfile: async (): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'GET',
      url: '/mentor-profile'
    });
  },

  // Update current mentor profile (authenticated mentor)
  updateCurrentMentorProfile: async (profileData: UpdateMentorProfileData): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'PUT',
      url: '/mentor-profile',
      data: profileData
    });
  },

  // Create new mentor profile (admin only)
  createMentorProfile: async (profileData: CreateMentorProfileData): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'POST',
      url: '/mentors',
      data: profileData
    });
  },

  // Update mentor profile by ID (admin only)
  updateMentorProfileById: async (mentorId: number, profileData: UpdateMentorProfileData): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'PUT',
      url: `/mentors/${mentorId}`,
      data: profileData
    });
  },

  // Toggle mentor verification status (admin only)
  toggleMentorVerification: async (mentorId: number): Promise<MentorDataResponse> => {
    return apiRequest<MentorDataResponse>({
      method: 'PATCH',
      url: `/mentors/${mentorId}/verify`
    });
  },
  
  // Upload mentor profile picture
  uploadMentorPhoto: async (userId: number, file: File): Promise<unknown> => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    
    return apiRequest<unknown>({
      method: 'POST',
      url: `/users/${userId}/profile-picture`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default mentorService;