// frontend/src/components/DashboardMentee/CardOverview/ActivityCard.tsx
import React from 'react';

interface ActivityItem {
  id: string;
  title: string;
  type: 'Pengumpulan' | 'Materi';
  category: string;
}

interface ActivityCardProps {
  activities: ActivityItem[];
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activities }) => {
  return (
    <>
      <div className="font-semibold text-xl mb-4">Aktivitas Terkini</div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-[#F5F5F5] rounded-md p-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{activity.category}</div>
              <p className="text-sm text-[#737373]">{activity.type}</p>
            </div>
            <button className="bg-[#0CAF6F] text-white px-3 py-1 rounded-md text-sm hover:bg-[#5F8368] transition-colors">
              Lihat
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivityCard;