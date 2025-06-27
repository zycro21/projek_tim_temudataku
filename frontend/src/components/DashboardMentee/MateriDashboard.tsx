"use client"

import { useState } from "react"
import SearchBar from "./Materi/SearchBar"
import FilterButtons from "./Materi/FilterButtons"
import MaterialCard from "./Materi/MaterialCard"

interface Material {
  id: string
  title: string
  description: string
  image: string
  dateRange: string
  programType: "bootcamp" | "short-class" | "live-class" | "mentoring-group" | "mentoring-1on1"
  category: string
  hasPPT: boolean
  hasRecording: boolean
}

const mockMaterials: Material[] = [
  {
    id: "1",
    title: "Data Science Week 3",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    programType: "bootcamp",
    category: "Bootcamp",
    hasPPT: true,
    hasRecording: true,
  },
  {
    id: "2",
    title: "Data Science Week 2",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    programType: "bootcamp",
    category: "Bootcamp",
    hasPPT: true,
    hasRecording: true,
  },
  {
    id: "3",
    title: "Data Science Week 1",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    programType: "bootcamp",
    category: "Bootcamp",
    hasPPT: true,
    hasRecording: true,
  },
  {
    id: "4",
    title: "Python Short Class",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Mei 2025",
    programType: "short-class",
    category: "Short Class",
    hasPPT: true,
    hasRecording: true,
  },
]

export default function MateriDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgramType, setSelectedProgramType] = useState("semua")

  const programTypes = [
    { id: "semua", label: "Semua" },
    { id: "bootcamp", label: "Bootcamp" },
    { id: "short-class", label: "Short Class" },
    { id: "live-class", label: "Live Class" },
    { id: "mentoring-group", label: "Mentoring Group" },
    { id: "mentoring-1on1", label: "Mentoring 1 on 1" },
  ]

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedProgramType === "semua" || material.programType === selectedProgramType

    return matchesSearch && matchesType
  })

  // Group materials by category
  const groupedMaterials = filteredMaterials.reduce(
    (acc, material) => {
      if (!acc[material.category]) {
        acc[material.category] = []
      }
      acc[material.category].push(material)
      return acc
    },
    {} as Record<string, Material[]>,
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Materi</div>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari berdasarkan nama dan program" />

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Jenis Program:</span>
            <FilterButtons options={programTypes} selected={selectedProgramType} onChange={setSelectedProgramType} />
          </div>
        </div>

        {/* Material Sections */}
        {Object.entries(groupedMaterials).map(([category, materials]) => (
          <div key={category} className="mb-12">
            <div className="text-xl font-semibold text-gray-900 mb-6">{category}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </div>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada materi yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
