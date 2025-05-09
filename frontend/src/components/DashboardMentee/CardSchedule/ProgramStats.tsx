// frontend/src/components/DashboardMentee/CardSchedule/ProgramStats.tsx
import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface ProgramStatsProps {
  registered: number;
  completed: number;
}

const ProgramStats: React.FC<ProgramStatsProps> = ({ registered, completed }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <DocumentTextIcon className="w-5 h-5 text-[#0CAF6F]" />
          <span className="text-[#737373] text-sm">Program Terdaftar</span>
        </div>
        <div className="text-3xl font-bold">{registered}</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <DocumentTextIcon className="w-5 h-5 text-[#0CAF6F]" />
          <span className="text-[#737373] text-sm">Program Telah Dilakukan</span>
        </div>
        <div className="text-3xl font-bold">{completed}</div>
      </div>
    </div>
  );
};

export default ProgramStats;