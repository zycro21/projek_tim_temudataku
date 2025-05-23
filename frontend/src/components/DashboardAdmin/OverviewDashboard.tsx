// frontend/src/components/DashboardAdmin/OverviewDashboard.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import StatisticCard from "./Overview/StatisticCard"
import PaymentStatusChart from "./Overview/PaymentStatusChart"
import IncomeChart from "./Overview/IncomeChart"
import MentoringSessionCard from "./Overview/MentoringSessionCard"
import ActivityList from "./Overview/ActivityList"
import { mockDashboardData } from "./Overview/mockData"
import type { DashboardData } from "./Overview/types"
import { UserIcon, UsersIcon, ShieldCheckIcon, CreditCardIcon } from "./Overview/Icons"
import useStatistics from "../../hooks/useStatistics" // Import hook statistik

const OverviewDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [timeFilter, setTimeFilter] = useState<string>("Minggu Ini")
  
  // Gunakan hook statistik
  const { 
    statistics, 
    isLoading: statsLoading, 
    error: statsError, 
    loadStatistics 
  } = useStatistics()

  // Effect untuk mengambil data statistik
  useEffect(() => {
    loadStatistics(timeFilter)
  }, [timeFilter])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulasi network delay untuk data lainnya (selain statistik)
        setTimeout(() => {
          // Gabungkan data mock dengan data statistik dari API
          setDashboardData({
            ...mockDashboardData,
            stats: {
              // Gunakan data dari API untuk statistik
              jumlahPengguna: statistics.jumlahPengguna,
              penggunaIncrement: statistics.penggunaIncrement,
              jumlahMentor: statistics.jumlahMentor,
              jumlahAdmin: statistics.jumlahAdmin,
              totalTransaksi: mockDashboardData.stats.totalTransaksi, // Masih menggunakan mock untuk total transaksi
            }
          })
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    // Jika data statistik sudah siap, maka lanjutkan dengan fetch data dashboard
    if (!statsLoading) {
      fetchDashboardData()
    }
  }, [statistics, statsLoading, timeFilter])

  // Tampilkan loading jika sedang memuat
  if (loading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // Tampilkan error jika ada
  if (statsError || !dashboardData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          {statsError || "Gagal memuat data dashboard."}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-2xl font-semibold">Overview</div>
          <p className="text-gray-500">Overview</p>
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option>Minggu Ini</option>
            <option>Bulan Ini</option>
            <option>Tahun Ini</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 1: Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatisticCard
          icon={<UserIcon />}
          title="Jumlah Pengguna"
          value={dashboardData.stats.jumlahPengguna}
          increment={dashboardData.stats.penggunaIncrement}
          incrementText="minggu ini"
        />
        <StatisticCard icon={<UsersIcon />} title="Jumlah Mentor" value={dashboardData.stats.jumlahMentor} />
        <StatisticCard icon={<ShieldCheckIcon />} title="Jumlah Admin" value={dashboardData.stats.jumlahAdmin} />
        <StatisticCard icon={<CreditCardIcon />} title="Total Transaksi" value={dashboardData.stats.totalTransaksi} />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Status Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <PaymentStatusChart data={dashboardData.paymentStatus} />
        </div>

        {/* Income Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <IncomeChart data={dashboardData.incomeData} />
        </div>
      </div>

      {/* Row 3: Mentoring Sessions and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mentoring Sessions */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Sesi Mentoring</div>
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
          <div className="space-y-4">
            {dashboardData.mentoringSessions.map((session, index) => (
              <MentoringSessionCard key={index} session={session} />
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Aktivitas</div>
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
          <ActivityList activities={dashboardData.activities} />
        </div>
      </div>
    </div>
  )
}

export default OverviewDashboard