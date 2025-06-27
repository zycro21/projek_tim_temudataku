"use client"

import { useState } from "react"
import SearchBar from "./Practice/SearchBar"
import FilterButtons from "./Practice/FilterButtons"
import PracticeCard from "./Practice/PracticeCard"

interface Practice {
  id: string
  title: string
  description: string
  image: string
  level: "pemula" | "menengah" | "ahli"
  dateRange: string
  status: "belum-dikerjakan" | "selesai" | "sudah-direview"
  hasReview?: boolean
  hasSubmission?: boolean
}

const mockPractices: Practice[] = [
  {
    id: "1",
    title: "EDA practice",
    description:
      "Practice ini bertujuan memperdalam pemahaman lebih tentang EDA dengan topik kesehatan. Lihat detail Practice",
    image: "/img/pengumpulan/pengumpulan-1.png",
    level: "pemula",
    dateRange: "05 Maret 2025 - 10 Maret 2025",
    status: "belum-dikerjakan",
  },
  {
    id: "2",
    title: "EDA practice",
    description:
      "Practice ini bertujuan memperdalam pemahaman lebih tentang EDA dengan topik kesehatan. Lihat detail Practice",
    image: "/img/pengumpulan/pengumpulan-1.png",
    level: "menengah",
    dateRange: "05 Maret 2025 - 10 Maret 2025",
    status: "belum-dikerjakan",
  },
  {
    id: "3",
    title: "EDA practice",
    description:
      "Practice ini bertujuan memperdalam pemahaman lebih tentang EDA dengan topik kesehatan. Lihat detail Practice",
    image: "/img/pengumpulan/pengumpulan-1.png",
    level: "pemula",
    dateRange: "05 Maret 2025 - 10 Maret 2025",
    status: "selesai",
    hasReview: true,
    hasSubmission: true,
  },
]

export default function PracticeDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("semua")
  const [selectedStatus, setSelectedStatus] = useState("semua")

  const levelOptions = [
    { id: "semua", label: "Semua" },
    { id: "pemula", label: "Pemula" },
    { id: "menengah", label: "Menengah" },
    { id: "ahli", label: "Ahli" },
  ]

  const statusOptions = [
    { id: "semua", label: "Semua" },
    { id: "belum-dikerjakan", label: "Belum Dikerjakan" },
    { id: "selesai", label: "Selesai" },
    { id: "sudah-direview", label: "Sudah Direview" },
  ]

  const filteredPractices = mockPractices.filter((practice) => {
    const matchesSearch =
      practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practice.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLevel === "semua" || practice.level === selectedLevel
    const matchesStatus = selectedStatus === "semua" || practice.status === selectedStatus

    return matchesSearch && matchesLevel && matchesStatus
  })

  const belumDikerjakanPractices = filteredPractices.filter((practice) => practice.status === "belum-dikerjakan")
  const selesaiPractices = filteredPractices.filter((practice) => practice.status === "selesai")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Practice</div>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari berdasarkan nama dan program" />

        {/* Filter Buttons */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Level:</span>
            <FilterButtons options={levelOptions} selected={selectedLevel} onChange={setSelectedLevel} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Pengerjaan:</span>
            <FilterButtons options={statusOptions} selected={selectedStatus} onChange={setSelectedStatus} />
          </div>
        </div>

        {/* Practice Sections */}
        {(selectedStatus === "semua" || selectedStatus === "belum-dikerjakan") &&
          belumDikerjakanPractices.length > 0 && (
            <div className="mb-12">
              <div className="text-xl font-semibold text-gray-900 mb-6">Belum dikerjakan</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {belumDikerjakanPractices.map((practice) => (
                  <PracticeCard key={practice.id} practice={practice} />
                ))}
              </div>
            </div>
          )}

        {(selectedStatus === "semua" || selectedStatus === "selesai") && selesaiPractices.length > 0 && (
          <div className="mb-12">
            <div className="text-xl font-semibold text-gray-900 mb-6">Selesai</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selesaiPractices.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </div>
          </div>
        )}

        {filteredPractices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada practice yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
