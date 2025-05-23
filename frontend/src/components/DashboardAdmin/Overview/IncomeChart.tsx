import type React from "react"

interface IncomeDataPoint {
  month: string
  mentoring: number
  bootcamp: number
  praktik: number
}

interface IncomeChartProps {
  data: IncomeDataPoint[]
}

const IncomeChart: React.FC<IncomeChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.flatMap((item) => [item.mentoring, item.bootcamp, item.praktik]))

  const formatCurrency = (value: number) => {
    return `Rp${value / 1000}K`
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="text-lg font-medium">Pendapatan</div>
      </div>

      <div className="flex flex-col h-64">
        {/* Y-axis labels */}
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
            <div>{formatCurrency(maxValue)}</div>
            <div>{formatCurrency(maxValue * 0.75)}</div>
            <div>{formatCurrency(maxValue * 0.5)}</div>
            <div>{formatCurrency(maxValue * 0.25)}</div>
            <div>{formatCurrency(0)}</div>
          </div>

          {/* Chart area */}
          <div className="flex-1 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-rows-4 gap-0 border-l border-gray-200">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t border-gray-200 h-full"></div>
              ))}
            </div>

            {/* Chart lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${data.length * 100} 400`}
              preserveAspectRatio="none"
            >
              {/* Mentoring line */}
              <polyline
                points={data.map((item, i) => `${i * 100 + 50},${400 - (item.mentoring / maxValue) * 400}`).join(" ")}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
              />

              {/* Bootcamp line */}
              <polyline
                points={data.map((item, i) => `${i * 100 + 50},${400 - (item.bootcamp / maxValue) * 400}`).join(" ")}
                fill="none"
                stroke="#84CC16"
                strokeWidth="2"
              />

              {/* Praktik line */}
              <polyline
                points={data.map((item, i) => `${i * 100 + 50},${400 - (item.praktik / maxValue) * 400}`).join(" ")}
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
              />
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
              {data.map((item, index) => (
                <div key={index}>{item.month}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
            <span className="text-xs">Mentoring</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-lime-500 rounded-full mr-1"></div>
            <span className="text-xs">Bootcamp</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-500 rounded-full mr-1"></div>
            <span className="text-xs">Praktik</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeChart
