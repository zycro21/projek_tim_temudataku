// frontend/src/components/DashboardMentee/JadwalDashboard.tsx
import React, { useState } from 'react';
import JadwalCalendar from './CardSchedule/JadwalCalendar';
import ProgramStats from './CardSchedule/ProgramStats';
import TodaySchedule from './CardSchedule/TodaySchedule';

const JadwalDashboard: React.FC = () => {
  const [, setSelectedDate] = useState<number | null>(null);
  
  // Dummy data - would come from API in a real application
  const programStats = {
    registered: 5,
    completed: 3
  };
  
  const todaySchedule = [
    {
      id: '1',
      title: 'Bootcamp',
      date: 'Senin, 9 Mei 2025',
      timeStart: '10.00',
      timeEnd: '13.45',
      type: 'Bootcamp' as const
    },
    {
      id: '2',
      title: 'Short Class',
      date: 'Senin, 9 Mei 2025',
      timeStart: '19.00',
      timeEnd: '19.45',
      type: 'Short Class' as const
    }
  ];
  
  const handleJoin = (id: string) => {
    console.log('Joining session:', id);
    // Implement join logic here
  };
  
  const handleViewDetail = (id: string) => {
    console.log('Viewing details for session:', id);
    // Implement view detail logic here
  };
  
  const handleDateClick = (date: number) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    // Here you could fetch schedule for the selected date
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Jadwal</h2>
      <p className="text-[#737373] mb-6">Halaman ini menampilkan jadwal sesi mentoring, bootcamp, dan shortclass Anda, baik yang akan datang maupun yang telah berlangsung.</p>
      
      {/* Stats Cards */}
      <ProgramStats 
        registered={programStats.registered} 
        completed={programStats.completed} 
      />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar (takes up 2/3 of the space on large screens) */}
        <div className="lg:col-span-2">
          <JadwalCalendar 
            month="Mei"
            year={2024}
            onDateClick={handleDateClick}
          />
        </div>
        
        {/* Today's Schedule (takes up 1/3 of the space on large screens) */}
        <div className="lg:col-span-1">
          <TodaySchedule 
            scheduleItems={todaySchedule}
            onJoin={handleJoin}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default JadwalDashboard;