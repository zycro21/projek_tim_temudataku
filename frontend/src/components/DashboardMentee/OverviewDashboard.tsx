// frontend/src/components/DashboardMentee/OverviewDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatisticCard from './CardOverview/StatisticCard';
import ScheduleCard from './CardOverview/ScheduleCard';
import ActivityCard from './CardOverview/ActivityCard';
import BarChart from './CardOverview/BarChart';
import RecommendationCard from './CardOverview/RecommendationCard';
import { ProgramIcon, MaterialIcon, CertificateIcon, TaskIcon } from './CardOverview/Icons';
import { DashboardData } from './CardOverview/types';
import { mockDashboardData } from './CardOverview/mockData';

const OverviewDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Untuk pengembangan, gunakan mock data
        // Pada implementasi sesungguhnya, ganti dengan API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        
        // Simulasi network delay
        setTimeout(() => {
          setDashboardData(mockDashboardData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!dashboardData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Gagal memuat data dashboard.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-gray-50 p-6">
      {/* Header */}
      <div className="text-2xl font-semibold mb-6">Halo, {dashboardData.userName}</div>
      
      {/* Row 1: Statistics and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Statistics */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-6">
            <StatisticCard
              icon={<ProgramIcon />}
              title="Program Terdaftar"
              value={dashboardData.stats.programsTerdaftar}
              onClick={() => handleNavigate("/dashboard/program")}
            />
            <StatisticCard
              icon={<MaterialIcon />}
              title="Jumlah Materi"
              value={dashboardData.stats.jumlahMateri}
              onClick={() => handleNavigate("/dashboard/materi")}
            />
            <StatisticCard
              icon={<CertificateIcon />}
              title="Sertifikat"
              value={dashboardData.stats.sertifikat}
              onClick={() => handleNavigate("/dashboard/sertifikat")}
            />
            <StatisticCard
              icon={<TaskIcon />}
              title="Tugas Selesai"
              value={dashboardData.stats.tugasSelesai}
              onClick={() => handleNavigate("/dashboard/pengumpulan")}
            />
          </div>
        </div>
        
        {/* Schedule */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <ScheduleCard schedules={dashboardData.schedules} />
          </div>
        </div>
      </div>
      
      {/* Row 2: Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <BarChart data={dashboardData.viewTimeData} title="Waktu Lihat" />
        </div>
              
        {/* Activities */}
        <div className="bg-white rounded-lg shadow p-4">
          <ActivityCard activities={dashboardData.activities} />
        </div>
      </div>
      
      {/* Row 3: Recommendations - Menggunakan komponen terpisah */}
      <RecommendationCard recommendations={dashboardData.recommendations} />
    </div>
  );
};

export default OverviewDashboard;