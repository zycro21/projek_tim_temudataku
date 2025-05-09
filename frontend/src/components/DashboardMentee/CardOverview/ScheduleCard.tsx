// frontend/src/components/DashboardMentee/CardOverview/ScheduleCard.tsx
import React, { useState } from 'react';

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  isZoomMeeting?: boolean;
}

interface ScheduleCardProps {
  schedules: ScheduleItem[];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedules }) => {
  const [currentMonth] = useState<string>('Mei');
  const [selectedDay, setSelectedDay] = useState<number>(6);
  
  // Data untuk calendar mini
  const days = [
    { day: 'Sen', num: 5 },
    { day: 'Sel', num: 6 },
    { day: 'Rab', num: 7 },
    { day: 'Kam', num: 8 },
    { day: 'Jum', num: 9 },
    { day: 'Sab', num: 10 },
    { day: 'Min', num: 11 },
  ];
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-xl">Jadwal</div>
        <div className="flex items-center">
          <span className="mr-2">{currentMonth}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Calendar navigation */}
      <div className="flex justify-between mb-4">
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Date picker - persis seperti di Figma */}
        <div className="flex space-x-2">
          {days.map((item) => (
            <div 
              key={item.num} 
              className={`flex flex-col items-center p-2 rounded-md cursor-pointer ${selectedDay === item.num ? 'bg-[#0CAF6F] text-white' : ''}`}
              onClick={() => setSelectedDay(item.num)}
            >
              <span className="text-xs">{item.day}</span>
              <span className="text-sm font-medium">{item.num}</span>
            </div>
          ))}
        </div>
        
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Schedule list */}
      <div className="space-y-2">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-gray-50 rounded-md p-3">
            <div className="font-medium">{schedule.title}</div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">{schedule.date}, {schedule.time}</div>
              {schedule.isZoomMeeting && (
                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  </svg>
                  Zoom Meeting
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScheduleCard;