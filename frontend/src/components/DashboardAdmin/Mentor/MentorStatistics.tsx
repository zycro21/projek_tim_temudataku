// frontend/src/components/DashboardAdmin/Mentor/MentorStatistics.tsx
import React from 'react';

interface MentorStatisticsProps {
  totalMentors: number;
  activeMentors: number;
  inactiveMentors: number;
  recentlyAdded: string;
}

const MentorStatistics: React.FC<MentorStatisticsProps> = ({
  totalMentors,
  activeMentors,
  inactiveMentors,
  recentlyAdded
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Mentors Card */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-gray-100 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Jumlah Mentor</p>
            <div className="flex items-end">
              <h2 className="text-3xl font-bold">{totalMentors}</h2>
              {recentlyAdded && (
                <span className="ml-2 text-xs text-green-600 font-medium mb-1">{recentlyAdded}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Mentors Card */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-gray-100 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Mentor Aktif</p>
            <h2 className="text-3xl font-bold text-green-600">{activeMentors}</h2>
          </div>
        </div>
      </div>
      
      {/* Inactive Mentors Card */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-3 bg-gray-100 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Mentor Tidak Aktif</p>
            <h2 className="text-3xl font-bold text-red-500">{inactiveMentors}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorStatistics;