// frontend/src/components/DashboardMentee/CardOverview/StatisticCard.tsx
import React, { ReactNode } from 'react';

interface StatisticCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  onClick?: () => void;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ icon, title, value, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow p-9 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center text-gray-500 mb-2">
        {icon}
        <span className="ml-2 text-sm">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default StatisticCard;