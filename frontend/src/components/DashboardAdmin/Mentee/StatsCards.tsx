"use client"

import { Users, UserCheck, UserX } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalMentees: number
    weeklyIncrease: number
    activeMentees: number
    inactiveMentees: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Mentees */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Jumlah Mentee</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900">{stats.totalMentees}</span>
          <span className="text-sm text-green-600 font-medium">+{stats.weeklyIncrease} minggu ini</span>
        </div>
      </div>

      {/* Active Mentees */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <UserCheck className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-gray-600">Mentee Aktif</span>
        </div>
        <span className="text-3xl font-bold text-green-600">{stats.activeMentees}</span>
      </div>

      {/* Inactive Mentees */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <UserX className="h-5 w-5 text-red-600" />
          <span className="text-sm font-medium text-gray-600">Mentee Tidak Aktif</span>
        </div>
        <span className="text-3xl font-bold text-red-600">{stats.inactiveMentees}</span>
      </div>
    </div>
  )
}
