// frontend/src/components/DashboardMentee/CardOverview/mockData.ts
import { DashboardData } from './types';

// Mock data untuk pengembangan - disesuaikan dengan tampilan Figma
export const mockDashboardData: DashboardData = {
  userName: 'Lana D',
  stats: {
    programsTerdaftar: 5,
    jumlahMateri: 15,
    sertifikat: 2,
    tugasSelesai: 2
  },
  schedules: [
    {
      id: '1',
      title: 'Data Science Class',
      date: 'Hari ini',
      time: '10:00 - 12:00',
      isZoomMeeting: true
    },
    {
      id: '2',
      title: 'Mentoring 1 on 1',
      date: 'Hari ini',
      time: '15:00 - 16:00',
      isZoomMeeting: true
    }
  ],
  activities: [
    {
      id: '1',
      title: 'Data Science Activity',
      type: 'Pengumpulan',
      category: 'Data Science Class'
    },
    {
      id: '2',
      title: 'Data Science Module',
      type: 'Materi',
      category: 'Data Science Class'
    },
    {
      id: '3',
      title: 'Python Basics',
      type: 'Materi',
      category: 'Python Short Class'
    }
  ],
// Contoh data untuk BarChart dalam mockDashboardData
viewTimeData: [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 28 },
    { month: 'Mar', value: 15 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 38 },
    { month: 'Jun', value: 18 },
    { month: 'Jul', value: 12 },
    { month: 'Aug', value: 50 }, // Nilai tertinggi, akan di-highlight
    { month: 'Sep', value: 25 },
    { month: 'Oct', value: 30 },
    { month: 'Nov', value: 18 },
    { month: 'Dec', value: 22 },
  ],
  recommendations: [
    {
      id: '1',
      title: 'Forecasting Harga Saham',
      type: 'Practice',
      level: 'Expert'
    },
    {
      id: '2',
      title: 'Forecasting Harga Saham',
      type: 'Live Class',
      level: 'Beginner'
    },
    {
      id: '3',
      title: 'Forecasting Harga Saham',
      type: 'Live Class',
      level: 'Beginner'
    }
  ]
};