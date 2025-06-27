"use client"

import { useState } from "react"
import SearchBar from "./UmpanBalik/SearchBar"
import FilterButtons from "./UmpanBalik/FilterButtons"
import FeedbackCard from "./UmpanBalik/FeedbackCard"

interface FeedbackSession {
  id: string
  title: string
  description: string
  image: string
  date: string
  time: string
  instructor: string
  hasFeedback: boolean
  programType: "bootcamp" | "mentoring-1on1" | "mentoring-group" | "short-class" | "live-class"
  category: string
}

const mockSessions: FeedbackSession[] = [
  {
    id: "1",
    title: "Data Science Class Week 3",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    date: "2 Mei 2025",
    time: "10:00 - 12:00",
    instructor: "Kak Rina",
    hasFeedback: false,
    programType: "bootcamp",
    category: "Bootcamp Data Science",
  },
  {
    id: "2",
    title: "Data Science Class Week 2",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    date: "2 Mei 2025",
    time: "10:00 - 12:00",
    instructor: "Kak Rina",
    hasFeedback: false,
    programType: "bootcamp",
    category: "Bootcamp Data Science",
  },
  {
    id: "3",
    title: "Data Science Class Week 1",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menjadi data scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    date: "2 Mei 2025",
    time: "10:00 - 12:00",
    instructor: "Kak Rina",
    hasFeedback: true,
    programType: "bootcamp",
    category: "Bootcamp Data Science",
  },
  {
    id: "4",
    title: "Python Short Class",
    description: "Pertemuan 1 membahas beberapa penting data science dan bagaimana step by step menggunakan python",
    image: "/img/pengumpulan/pengumpulan-1.png",
    date: "2 Mei 2025",
    time: "10:00 - 12:00",
    instructor: "Kak Rina",
    hasFeedback: false,
    programType: "short-class",
    category: "Short Class Python",
  },
]

export default function UmpanBalikDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgramType, setSelectedProgramType] = useState("semua")

  const programTypes = [
    { id: "semua", label: "Semua" },
    { id: "bootcamp", label: "Bootcamp" },
    { id: "mentoring-1on1", label: "Mentoring 1 on 1" },
    { id: "mentoring-group", label: "Mentoring Group" },
    { id: "short-class", label: "Short Class" },
    { id: "live-class", label: "Live Class" },
  ]

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedProgramType === "semua" || session.programType === selectedProgramType

    return matchesSearch && matchesType
  })

  // Group sessions by category
  const groupedSessions = filteredSessions.reduce(
    (acc, session) => {
      if (!acc[session.category]) {
        acc[session.category] = []
      }
      acc[session.category].push(session)
      return acc
    },
    {} as Record<string, FeedbackSession[]>,
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Umpan Balik</div>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari berdasarkan nama dan program" />

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Jenis Program:</span>
            <FilterButtons options={programTypes} selected={selectedProgramType} onChange={setSelectedProgramType} />
          </div>
        </div>

        {/* Session Sections */}
        {Object.entries(groupedSessions).map(([category, sessions]) => (
          <div key={category} className="mb-12">
            <div className="text-xl font-semibold text-gray-900 mb-6">{category}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <FeedbackCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        ))}

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada sesi yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
