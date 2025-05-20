// frontend/src/hooks/useStatistics.ts
import { useState } from 'react';
import statisticsService from '../service/statisticsService';

interface UseStatisticsReturn {
  statistics: {
    jumlahPengguna: number;
    penggunaIncrement: number;
    jumlahMentor: number;
    jumlahAdmin: number;
  };
  isLoading: boolean;
  error: string | null;
  loadStatistics: (timeFilter: string) => Promise<void>;
}

export const useStatistics = (): UseStatisticsReturn => {
  const [statistics, setStatistics] = useState<{
    jumlahPengguna: number;
    penggunaIncrement: number;
    jumlahMentor: number;
    jumlahAdmin: number;
  }>({
    jumlahPengguna: 0,
    penggunaIncrement: 0,
    jumlahMentor: 0,
    jumlahAdmin: 0
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to convert UI time filter to API parameter
  const mapTimeFilterToApiParam = (timeFilter: string): string => {
    switch (timeFilter) {
      case 'Minggu Ini':
        return 'week';
      case 'Bulan Ini':
        return 'month';
      case 'Tahun Ini':
        return 'year';
      default:
        return 'week';
    }
  };

  // Load statistics
  const loadStatistics = async (timeFilter: string = 'Minggu Ini'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert UI filter to API parameter
      const period = mapTimeFilterToApiParam(timeFilter);
      
      // Get statistics data
      const statsData = await statisticsService.getUserStatistics(period);
      
      setStatistics({
        jumlahPengguna: statsData.totalUsers,
        penggunaIncrement: statsData.newUsers,
        jumlahMentor: statsData.totalMentors,
        jumlahAdmin: statsData.totalAdmins
      });
    } catch (err: unknown) {
      console.error("Error in useStatistics:", err);
      const apiError = err as { message: string };
      setError(apiError.message || 'An error occurred while loading statistics');
      
      // Fallback ke data default untuk UI
      setStatistics({
        jumlahPengguna: 0,
        penggunaIncrement: 0,
        jumlahMentor: 0,
        jumlahAdmin: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    statistics,
    isLoading,
    error,
    loadStatistics
  };
};

export default useStatistics;