import React from 'react';
import { DashboardData } from './types';

interface RecommendationCardProps {
  recommendations: DashboardData['recommendations'];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  return (
    <div>
      <div className="font-semibold text-xl mb-4">Rekomendasi</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((course) => (
          <div 
            key={course.id} 
            className="bg-green-50 rounded-lg p-4 border border-green-100 relative overflow-hidden"
          >
            <div className="mb-1 text-sm text-green-600">Dapatkan Sertifikat!</div>
            <h4 className="font-medium text-green-900 mb-6">{course.title}</h4>
            <div className="flex space-x-2 items-center text-sm">
              <span className="bg-white px-2 py-1 rounded text-gray-700">{course.type}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">{course.level}</span>
            </div>
            
            {/* Decorative leaf element */}
            <div className="absolute bottom-0 right-0">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 80C80 35.8172 44.1828 0 0 0V80H80Z" fill="#4ADE80" fillOpacity="0.2"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCard;