"use client"

import { useState } from "react"
import SearchBar from "./Pengumpulan/SearchBar"
import FilterButtons from "./Pengumpulan/FilterButtons"
import CourseCard from "./Pengumpulan/CourseCard"

interface Course {
  id: string
  title: string
  description: string
  image: string
  dateRange: string
  status: "belum-dikumpulkan" | "selesai" | "sudah-direview"
  type: "bootcamp" | "short-class" | "live-class"
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Bootcamp Data Science",
    description:
      "Project pada bootcamp ini mengajarkan prediksi harga rumah di daerah Jawa Timur. Lihat detail project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    status: "belum-dikumpulkan",
    type: "bootcamp",
  },
  {
    id: "2",
    title: "Python Short Class",
    description:
      "Project pada bootcamp ini mengajarkan prediksi harga rumah di daerah Jawa Timur. Lihat detail project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    status: "belum-dikumpulkan",
    type: "short-class",
  },
  {
    id: "3",
    title: "Data Science Class",
    description:
      "Project pada bootcamp ini mengajarkan prediksi harga rumah di daerah Jawa Timur. Lihat detail project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    status: "belum-dikumpulkan",
    type: "live-class",
  },
  {
    id: "4",
    title: "Bootcamp SQL",
    description:
      "Project pada bootcamp ini mengajarkan prediksi harga rumah di daerah Jawa Timur. Lihat detail project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    status: "selesai",
    type: "bootcamp",
  },
]

export default function PengumpulanDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgramType, setSelectedProgramType] = useState("semua")
  const [selectedStatus, setSelectedStatus] = useState("semua")

  const programTypes = [
    { id: "semua", label: "Semua" },
    { id: "bootcamp", label: "Bootcamp" },
    { id: "short-class", label: "Short Class" },
    { id: "live-class", label: "Live Class" },
  ]

  const statusTypes = [
    { id: "semua", label: "Semua" },
    { id: "belum-dikumpulkan", label: "Belum Dikumpulkan" },
    { id: "selesai", label: "Selesai" },
    { id: "sudah-direview", label: "Sudah Direview" },
  ]

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedProgramType === "semua" || course.type === selectedProgramType
    const matchesStatus = selectedStatus === "semua" || course.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const belumDikumpulkanCourses = filteredCourses.filter((course) => course.status === "belum-dikumpulkan")
  const selesaiCourses = filteredCourses.filter((course) => course.status === "selesai")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Pengumpulan</div>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari berdasarkan nama dan program" />

        {/* Filter Buttons */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Jenis Program:</span>
            <FilterButtons options={programTypes} selected={selectedProgramType} onChange={setSelectedProgramType} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Pengumpulan:</span>
            <FilterButtons options={statusTypes} selected={selectedStatus} onChange={setSelectedStatus} />
          </div>
        </div>

        {/* Course Sections */}
        {(selectedStatus === "semua" || selectedStatus === "belum-dikumpulkan") &&
          belumDikumpulkanCourses.length > 0 && (
            <div className="mb-12">
              <div className="text-xl font-semibold text-gray-900 mb-6">Belum Dikumpulkan</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {belumDikumpulkanCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

        {(selectedStatus === "semua" || selectedStatus === "selesai") && selesaiCourses.length > 0 && (
          <div className="mb-12">
            <div className="text-xl font-semibold text-gray-900 mb-6">Selesai</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selesaiCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada kursus yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
