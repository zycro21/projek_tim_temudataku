// frontend/src/components/DashboardMentee/types.ts

// Tipe data untuk statistik dasbor
export interface DashboardStats {
    programsTerdaftar: number;
    jumlahMateri: number;
    sertifikat: number;
    tugasSelesai: number;
  }
  
  // Tipe data untuk jadwal
  export interface Schedule {
    id: string;
    title: string;
    date: string;
    time: string;
    isZoomMeeting?: boolean;
  }
  
  // Tipe data untuk aktivitas
  export interface Activity {
    id: string;
    title: string;
    type: 'Pengumpulan' | 'Materi';
    category: string;
  }
  
  // Tipe data untuk grafik waktu lihat
  export interface ViewTimeData {
    month: string;
    value: number;
  }
  
  // Tipe data untuk rekomendasi kursus
  export interface CourseRecommendation {
    id: string;
    title: string;
    type: string;
    level: string;
  }
  
  // Tipe data untuk keseluruhan data dashboard
  export interface DashboardData {
    stats: DashboardStats;
    schedules: Schedule[];
    activities: Activity[];
    viewTimeData: ViewTimeData[];
    recommendations: CourseRecommendation[];
    userName: string;
  }