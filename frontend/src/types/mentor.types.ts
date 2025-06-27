export interface MentorAvailabilitySchedule {
  [key: string]: string[];
}

export interface MentorUser {
  id: number;
  full_name: string;
  email: string;
  profile_picture: string | null;
  profile_picture_filename?: string | null;
  city: string | null;
  province: string | null;
}

export interface ApiMentor {
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
}

export interface UiMentor {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  photo: string;
  city?: string;
  province?: string;
  expertise?: string;
  bio?: string;
  experience?: string;
  hourlyRate?: string;
  role: string;
  isActive: boolean;
  availabilitySchedule?: MentorAvailabilitySchedule;
  photoFile?: File;
  password?: string;
}

export interface MentorFormData {
  step: number;
  data: Partial<UiMentor>;
}

export interface MentorStatistics {
  totalMentors: number;
  activeMentors: number;
  inactiveMentors: number;
  recentlyAdded: string;
}

export interface MentorTableProps {
  mentors: UiMentor[];
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onViewMentorDetails: (mentor: UiMentor) => void;
  onToggleStatus?: (mentorId: string) => Promise<boolean>;
  isLoading?: boolean;
}

export interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddMentorModalProps extends MentorModalProps {
  onSave: (mentorData: UiMentor) => void;
}

export interface EditMentorModalProps extends MentorModalProps {
  mentor: UiMentor | null;
  onSave: (mentorData: UiMentor) => void;
}

export interface MentorDetailModalProps extends MentorModalProps {
  mentor: UiMentor | null;
  onEdit: () => void;
  onDelete: () => void;
}