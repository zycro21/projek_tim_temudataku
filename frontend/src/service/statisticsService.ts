// frontend/src/service/statisticsService.ts
import userService from './userService';

// Types
export interface UserStatistics {
  totalUsers: number;
  newUsers: number;
  totalMentors: number;
  totalAdmins: number;
}

// Main statistics service functions
const statisticsService = {
  // Get user statistics by processing data from getAllUsers endpoint
  getUserStatistics: async (period: string = 'week'): Promise<UserStatistics> => {
    try {
      // Dapatkan semua pengguna
      const allUsersResponse = await userService.getAllUsers();
      
      if (allUsersResponse.status !== 'success') {
        throw new Error('Failed to fetch users');
      }
      
      const allUsers = allUsersResponse.data;
      
      // Buat objek Date untuk filter berdasarkan periode
      const now = new Date();
      const dateThreshold = new Date();
      
      if (period === 'week') {
        dateThreshold.setDate(now.getDate() - 7); // 1 minggu
      } else if (period === 'month') {
        dateThreshold.setMonth(now.getMonth() - 1); // 1 bulan
      } else if (period === 'year') {
        dateThreshold.setFullYear(now.getFullYear() - 1); // 1 tahun
      }
      
      // Filter pengguna berdasarkan peran
      const mentors = allUsers.filter(user => user.roles.includes('MENTOR'));
      const admins = allUsers.filter(user => user.roles.includes('ADMIN'));
      
      // Hitung pengguna baru dalam periode waktu yang ditentukan
      const newUsers = allUsers.filter(user => {
        const registrationDate = new Date(user.registration_date);
        return registrationDate >= dateThreshold;
      });
      
      return {
        totalUsers: allUsers.length,
        newUsers: newUsers.length,
        totalMentors: mentors.length,
        totalAdmins: admins.length
      };
    } catch (error) {
      console.error("Error getting user statistics:", error);
      // Fallback ke data default jika terjadi error
      return {
        totalUsers: 0,
        newUsers: 0,
        totalMentors: 0,
        totalAdmins: 0
      };
    }
  }
};

export default statisticsService;