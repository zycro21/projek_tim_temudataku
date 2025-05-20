// frontend/src/service/userService.ts
import { apiRequest } from './api';

// Types
export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string | null;
  city: string | null;
  province: string | null;
  is_active: boolean;
  is_email_verified: boolean;
  registration_date: string;
  last_login: string | null;
  roles: string[];
  created_at: string;
  updated_at: string | null;
}

export interface UsersResponse {
  status: string;
  message: string;
  data: User[];
}

// Main user service functions
const userService = {
  // Get all users
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
  }
};

export default userService;