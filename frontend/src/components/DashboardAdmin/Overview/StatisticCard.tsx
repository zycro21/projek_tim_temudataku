import type React from "react"

interface StatisticCardProps {
  icon: React.ReactNode
  title: string
  value: number
  increment?: number
  incrementText?: string
}

const StatisticCard: React.FC<StatisticCardProps> = ({ icon, title, value, increment, incrementText }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-center mb-2">
        <div className="text-gray-500 mr-2">{icon}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        {increment !== undefined && (
          <span className="ml-2 text-xs text-green-500">
            +{increment} {incrementText}
          </span>
        )}
      </div>
      <div className="mt-2">
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default StatisticCard
