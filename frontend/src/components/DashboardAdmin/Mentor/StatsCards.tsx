"use client"

import { Users, UserCheck, UserX } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalMentors: number
    weeklyChange: number
    activeMentors: number
    inactiveMentors: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const isDecrease = stats.weeklyChange < 0
  const changeText = isDecrease ? `${stats.weeklyChange} minggu ini` : `+${stats.weeklyChange} minggu ini`
  const changeColor = isDecrease ? "text-red-600" : "text-green-600"

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Mentors */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Jumlah Mentor</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900">{stats.totalMentors}</span>
          <span className={`text-sm font-medium ${changeColor}`}>{changeText}</span>
        </div>
      </div>

      {/* Active Mentors */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <UserCheck className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-gray-600">Mentor Aktif</span>
        </div>
        <span className="text-3xl font-bold text-green-600">{stats.activeMentors}</span>
      </div>

      {/* Inactive Mentors */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <UserX className="h-5 w-5 text-red-600" />
          <span className="text-sm font-medium text-gray-600">Mentor Tidak Aktif</span>
        </div>
        <span className="text-3xl font-bold text-red-600">{stats.inactiveMentors}</span>
      </div>
    </div>
  )
}
