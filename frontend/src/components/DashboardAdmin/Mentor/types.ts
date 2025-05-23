// frontend/src/components/DashboardAdmin/Mentor/types.ts
import { Mentor as ApiMentor, MentorAvailabilitySchedule } from '../../../service/mentorService';

export interface Mentor {
  id: string;
  photo: string;
  photoFile?: File; // untuk upload foto
  fullName: string;
  username: string;
  email: string;
  password?: string; // untuk create mentor user
  phoneNumber?: string; // untuk create mentor user
  city?: string; // untuk create mentor user
  province?: string; // untuk create mentor user
  role: string;
  isActive: boolean;
  expertise?: string;
  bio?: string;
  experience?: string;
  hourlyRate?: string;
  availabilitySchedule?: MentorAvailabilitySchedule;
}

export interface MentorData {
  totalMentors: number;
  activeMentors: number;
  inactiveMentors: number;
  recentlyAdded: string; // Format: "+3 minggu ini"
  mentors: Mentor[];
}

// Helper function to map API Mentor to UI Mentor
export const mapApiMentorToUiMentor = (apiMentor: ApiMentor): Mentor => {
  return {
    id: apiMentor.id.toString(),
    photo: apiMentor.user.profile_picture || '/img/Practice_isi_latihan_section_peserta1.png',
    fullName: apiMentor.user.full_name,
    username: apiMentor.user.email.split('@')[0], // Gunakan bagian pertama dari email sebagai username
    email: apiMentor.user.email,
    role: 'Mentor', // Selalu 'Mentor' karena ini halaman mentor
    isActive: apiMentor.is_verified,
    expertise: apiMentor.expertise || '',
    bio: apiMentor.bio || '',
    experience: apiMentor.experience || '',
    hourlyRate: apiMentor.hourly_rate?.toString() || '0',
    availabilitySchedule: apiMentor.availability_schedule,
    city: apiMentor.user.city || '',
    province: apiMentor.user.province || ''
  };
};

// Helper function to map API Mentors to UI MentorData
export const mapApiMentorsToUiMentorData = (
  apiMentors: ApiMentor[], 
  total: number,
  recentlyAdded: string = ""
): MentorData => {
  const mentors = apiMentors.map(mapApiMentorToUiMentor);
  const activeMentors = apiMentors.filter(mentor => mentor.is_verified).length;
  
  return {
    totalMentors: total,
    activeMentors,
    inactiveMentors: total - activeMentors,
    recentlyAdded,
    mentors
  };
};