import type React from "react"

interface PaymentStatusData {
  status: string
  count: number
  color: string
}

interface PaymentStatusChartProps {
  data: PaymentStatusData[]
}

const PaymentStatusChart: React.FC<PaymentStatusChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.count))

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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <div className="text-lg font-medium">Status Pembayaran</div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-6 gap-2 text-xs text-gray-500">
          <div className="col-span-1"></div>
          <div>0</div>
          <div>50</div>
          <div>100</div>
          <div>200</div>
          <div>300</div>
          <div>400</div>
        </div>

        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-16 text-xs text-gray-600">{item.status}</div>
            <div className="flex-1">
              <div className="relative pt-1">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div
                      className={`h-8 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-700">{item.count}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentStatusChart
