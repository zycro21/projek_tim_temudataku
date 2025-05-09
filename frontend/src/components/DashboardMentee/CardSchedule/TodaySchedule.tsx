// frontend/src/components/DashboardMentee/CardSchedule/TodaySchedule.tsx
import React from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  type: 'Bootcamp' | 'Short Class' | 'Mentoring' | 'Live Class';
}

interface TodayScheduleProps {
  scheduleItems: ScheduleItem[];
  onJoin?: (id: string) => void;
  onViewDetail?: (id: string) => void;
}

const TodaySchedule: React.FC<TodayScheduleProps> = ({
  scheduleItems,
  onJoin,
  onViewDetail
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Hari Ini</h2>
      
      <div className="space-y-4">
        {scheduleItems.length === 0 ? (
          <div className="text-center py-8 text-[#737373]">
            Tidak ada jadwal untuk hari ini
          </div>
        ) : (
          scheduleItems.map((item) => (
            <div key={item.id} className="border border-[#E0E0E0] rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'Bootcamp' ? 'bg-[#0CAF6F]' : 
                    item.type === 'Short Class' ? 'bg-[#EF4444]' : 
                    item.type === 'Mentoring' ? 'bg-[#3B82F6]' : 'bg-[#F59E0B]'
                  }`}></div>
                  <h3 className="font-medium text-[#0E1115]">{item.title}</h3>
                </div>
                <div className="bg-[#E6F7F1] text-[#0CAF6F] text-xs px-2 py-1 rounded">
                  Hari ini
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#737373] text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#737373] text-sm">
                  <ClockIcon className="w-4 h-4" />
                  <span>{item.timeStart} - {item.timeEnd} WIB</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button 
                  className="border border-[#0CAF6F] text-[#0CAF6F] px-4 py-1.5 rounded-md text-sm hover:bg-[#F0FFF8]"
                  onClick={() => onViewDetail && onViewDetail(item.id)}
                >
                  Lihat Detail
                </button>
                <button 
                  className="bg-[#0CAF6F] text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#0A9A60]"
                  onClick={() => onJoin && onJoin(item.id)}
                >
                  Join
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;