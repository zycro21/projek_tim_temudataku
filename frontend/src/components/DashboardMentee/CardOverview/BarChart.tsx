// frontend/src/components/DashboardMentee/CardOverview/BarChart.tsx
import React, { useState } from 'react';

interface ChartData {
  month: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const [viewMode, setViewMode] = useState<'Week' | 'Month'>('Month');
  
  // Temukan nilai tertinggi untuk skala
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-xl">{title}</div>
        <div className="flex rounded-md overflow-hidden border border-[#E0E0E0]">
          <button   
            className={`px-3 py-1 text-sm ${viewMode === 'Week' ? 'bg-[#0CAF6F] text-white': 'bg-white'}`}
            onClick={() => setViewMode('Week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-sm ${viewMode === 'Month' ? 'bg-[#0CAF6F] text-white' : 'bg-white'}`}
            onClick={() => setViewMode('Month')}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="h-44 flex items-end justify-between">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          // Highlight Agustus (Aug) seperti di Figma
          const isHighlighted = item.month === 'Aug';
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-4/5 ${isHighlighted ? 'bg-[#0CAF6F]' : 'bg-[#D1D5DC]'} rounded-t-sm`} 
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs text-[#737373] mt-1">{item.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;