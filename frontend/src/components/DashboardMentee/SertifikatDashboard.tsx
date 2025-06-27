"use client"

import { useState } from "react"
import SearchBar from "./Sertifikat/SearchBar"
import FilterButtons from "./Sertifikat/FilterButtons"
import CertificateCard from "./Sertifikat/CertificateCard"

interface Certificate {
  id: string
  title: string
  description: string
  image: string
  dateRange: string
  programType: "bootcamp" | "short-class" | "live-class"
  downloadUrl?: string
  isAvailable: boolean
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    title: "Bootcamp Data Scientist",
    description: "Mempelajari seluruh step by step menjadi data scientist profesional dengan portofolio project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    programType: "bootcamp",
    downloadUrl: "/certificates/bootcamp-data-scientist.pdf",
    isAvailable: true,
  },
  {
    id: "2",
    title: "Short Class Python",
    description: "Mempelajari seluruh step by step menjadi data scientist profesional dengan portofolio project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    programType: "short-class",
    downloadUrl: "/certificates/short-class-python.pdf",
    isAvailable: true,
  },
  {
    id: "3",
    title: "Short Class EDA",
    description: "Mempelajari seluruh step by step menjadi data scientist profesional dengan portofolio project",
    image: "/img/pengumpulan/pengumpulan-1.png",
    dateRange: "April - Juli 2025",
    programType: "short-class",
    downloadUrl: "/certificates/short-class-eda.pdf",
    isAvailable: true,
  },
]

export default function SertifikatDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgramType, setSelectedProgramType] = useState("semua")

  const programTypes = [
    { id: "semua", label: "Semua" },
    { id: "bootcamp", label: "Bootcamp" },
    { id: "short-class", label: "Short Class" },
    { id: "live-class", label: "Live Class" },
  ]

  const filteredCertificates = mockCertificates.filter((certificate) => {
    const matchesSearch =
      certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedProgramType === "semua" || certificate.programType === selectedProgramType

    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Sertifikat</div>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari berdasarkan nama dan program" />

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Jenis Program:</span>
            <FilterButtons options={programTypes} selected={selectedProgramType} onChange={setSelectedProgramType} />
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada sertifikat yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
