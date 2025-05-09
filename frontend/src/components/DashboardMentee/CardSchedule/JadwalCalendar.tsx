// frontend/src/components/DashboardMentee/CardSchedule/JadwalCalendar.tsx
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface CalendarDay {
  day: number;
  isPreviousMonth?: boolean;
  isNextMonth?: boolean;
  events?: string[];
}

interface JadwalCalendarProps {
  month?: string;
  year?: number;
  onDateClick?: (date: number) => void;
}

const JadwalCalendar: React.FC<JadwalCalendarProps> = ({
  month = 'Mei',
  year = 2024,
  onDateClick
}) => {
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  
  // Dummy calendar data for example
  const daysOfWeek = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
  
  // Sample calendar data (would be generated dynamically in a real app)
  const calendarDays: CalendarDay[][] = [
    [{ day: 29, isPreviousMonth: true }, { day: 30, isPreviousMonth: true }, { day: 31, isPreviousMonth: true }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }],
    [{ day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9, events: ['Bootcamp', 'Short Class'] }, { day: 10 }, { day: 11 }],
    [{ day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }],
    [{ day: 19 }, { day: 20, events: ['Mentoring'] }, { day: 21 }, { day: 22 }, { day: 23, events: ['Bootcamp'] }, { day: 24, events: ['Short Class'] }, { day: 25 }],
    [{ day: 26, events: ['Live Class'] }, { day: 27 }, { day: 28, events: ['Live Class'] }, { day: 29 }, { day: 30, events: ['Bootcamp'] }, { day: 31 }, { day: 1, isNextMonth: true }],
    [{ day: 2, isNextMonth: true, events: ['Short Class'] }, { day: 3, isNextMonth: true }, { day: 4, isNextMonth: true }, { day: 5, isNextMonth: true }, { day: 6, isNextMonth: true }, { day: 7, isNextMonth: true }, { day: 8, isNextMonth: true }],
  ];
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const handlePreviousMonth = () => {
    const currentMonthIndex = months.indexOf(selectedMonth);
    if (currentMonthIndex > 0) {
      setSelectedMonth(months[currentMonthIndex - 1]);
    } else {
      setSelectedMonth(months[11]);
      setSelectedYear(selectedYear - 1);
    }
  };
  
  const handleNextMonth = () => {
    const currentMonthIndex = months.indexOf(selectedMonth);
    if (currentMonthIndex < 11) {
      setSelectedMonth(months[currentMonthIndex + 1]);
    } else {
      setSelectedMonth(months[0]);
      setSelectedYear(selectedYear + 1);
    }
  };
  
  const getEventColor = (eventType: string) => {
    switch(eventType) {
      case 'Bootcamp':
        return 'text-[#0CAF6F] bg-[#E6F7F1]';
      case 'Short Class':
        return 'text-[#EF4444] bg-[#FEF2F2]';
      case 'Mentoring':
        return 'text-[#3B82F6] bg-[#EFF6FF]';
      case 'Live Class':
        return 'text-[#F59E0B] bg-[#FEF9C3]';
      default:
        return 'text-gray-500';
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        {/* Month selector */}
        <div className="relative">
          <button 
            className="flex items-center gap-1 bg-[#F5F5F5] px-3 py-2 rounded-md text-[#0E1115]"
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
          >
            {selectedMonth}
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          
          {showMonthDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-[#E0E0E0] w-40 z-10">
              {months.map((m) => (
                <button 
                  key={m} 
                  className="block w-full text-left px-4 py-2 hover:bg-[#F5F5F5] text-sm"
                  onClick={() => {
                    setSelectedMonth(m);
                    setShowMonthDropdown(false);
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Month navigation */}
        <div className="flex items-center gap-2">
          <button 
            className="p-1 rounded-full hover:bg-[#F5F5F5]"
            onClick={handlePreviousMonth}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <span className="font-medium">{selectedMonth} {selectedYear}</span>
          
          <button 
            className="p-1 rounded-full hover:bg-[#F5F5F5]"
            onClick={handleNextMonth}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {/* Days of week header */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center py-2 text-[#737373] text-sm font-medium">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((week, weekIndex) => (
          <React.Fragment key={`week-${weekIndex}`}>
            {week.map((dayObj, dayIndex) => {
              const isCurrentMonth = !dayObj.isPreviousMonth && !dayObj.isNextMonth;
              
              return (
                <div 
                  key={`day-${weekIndex}-${dayIndex}`}
                  className={`border border-[#F0F0F0] min-h-[80px] p-1 ${
                    isCurrentMonth ? 'bg-white' : 'bg-[#F9F9F9] text-[#A1A1A1]'
                  }`}
                  onClick={() => isCurrentMonth && onDateClick && onDateClick(dayObj.day)}
                >
                  <div className="text-center mb-1">{dayObj.day}</div>
                  
                  {/* Events */}
                  {dayObj.events && dayObj.events.map((event, eventIndex) => (
                    <div 
                      key={`event-${weekIndex}-${dayIndex}-${eventIndex}`}
                      className={`text-[10px] px-1 py-0.5 rounded mb-1 ${getEventColor(event)}`}
                    >
                      {event}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JadwalCalendar;