"use client"

import { useState } from "react"
import StatsCards from "./Mentor/StatsCards"
import SearchBar from "./Mentor/SearchBar"
import MentorTable from "./Mentor/MentorTable"
import Pagination from "./Mentor/Pagination"
import ActionButtons from "./Mentor/ActionButtons"

interface Mentor {
  id: string
  idMentor: string
  foto: string
  namaLengkap: string
  username: string
  email: string
  peran: string
  status: "aktif" | "tidak-aktif"
}

const mockMentors: Mentor[] = [
  {
    id: "1",
    idMentor: "ABCD01",
    foto: "https://via.placeholder.com/40x40?text=GD",
    namaLengkap: "Gilang Dirga",
    username: "gildir",
    email: "gilangdirga1@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "2",
    idMentor: "ABCD02",
    foto: "https://via.placeholder.com/40x40?text=RS",
    namaLengkap: "Rina Suryani",
    username: "rinsury",
    email: "sarah.connor@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "3",
    idMentor: "ABCD03",
    foto: "https://via.placeholder.com/40x40?text=BS",
    namaLengkap: "Budi Santoso",
    username: "budsans",
    email: "john.doe@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "4",
    idMentor: "ABCD04",
    foto: "https://via.placeholder.com/40x40?text=NP",
    namaLengkap: "Nina Pratiwi",
    username: "nanpa",
    email: "alice.james@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "5",
    idMentor: "ABCD05",
    foto: "https://via.placeholder.com/40x40?text=AW",
    namaLengkap: "Andi Wijaya",
    username: "awijaya",
    email: "bob.marley@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "6",
    idMentor: "ABCD06",
    foto: "https://via.placeholder.com/40x40?text=SA",
    namaLengkap: "Siti Aminah",
    username: "sitiaminah",
    email: "jane.smith@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "7",
    idMentor: "ABCD07",
    foto: "https://via.placeholder.com/40x40?text=TR",
    namaLengkap: "Tono Rahardjo",
    username: "tonojo",
    email: "michael.brown@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "8",
    idMentor: "ABCD08",
    foto: "https://via.placeholder.com/40x40?text=DL",
    namaLengkap: "Dewi Lestari",
    username: "dewis",
    email: "emily.davis@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "9",
    idMentor: "ABCD09",
    foto: "https://via.placeholder.com/40x40?text=DL",
    namaLengkap: "Dewi Lestari",
    username: "dewis",
    email: "emily.davis@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
  {
    id: "10",
    idMentor: "ABCD10",
    foto: "https://via.placeholder.com/40x40?text=DL",
    namaLengkap: "Dewi Lestari",
    username: "dewis",
    email: "emily.davis@gmail.com",
    peran: "Mentor",
    status: "aktif",
  },
]

export default function MentorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMentors, setSelectedMentors] = useState<string[]>([])
  const [sortField, setSortField] = useState<keyof Mentor | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const stats = {
    totalMentors: 14,
    weeklyChange: -3, // Negative indicates decrease
    activeMentors: 14,
    inactiveMentors: 0,
  }

  const filteredMentors = mockMentors.filter((mentor) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      mentor.namaLengkap.toLowerCase().includes(searchLower) ||
      mentor.email.toLowerCase().includes(searchLower) ||
      mentor.username.toLowerCase().includes(searchLower) ||
      mentor.peran.toLowerCase().includes(searchLower)
    )
  })

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (!sortField) return 0

    let aValue = a[sortField]
    let bValue = b[sortField]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalItems = sortedMentors.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMentors = sortedMentors.slice(startIndex, endIndex)

  const handleSort = (field: keyof Mentor) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectMentor = (mentorId: string) => {
    setSelectedMentors((prev) => (prev.includes(mentorId) ? prev.filter((id) => id !== mentorId) : [...prev, mentorId]))
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedMentors(checked ? currentMentors.map((mentor) => mentor.id) : [])
  }

  const handleExportData = () => {
    console.log("Export mentor data")
    // Handle export functionality
  }

  const handleAddMentor = () => {
    console.log("Add new mentor")
    // Handle add mentor functionality
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-2xl font-bold text-gray-900">Mentor</div>
            <p className="text-gray-600">Mentor</p>
          </div>
          <ActionButtons onExportData={handleExportData} onAddMentor={handleAddMentor} />
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Mentor Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="text-lg font-semibold text-gray-900 mb-4">Mentor Terdaftar</div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari berdasarkan nama, email, atau status..."
            />
          </div>

          <MentorTable
            mentors={currentMentors}
            selectedMentors={selectedMentors}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onSelectMentor={handleSelectMentor}
            onSelectAll={handleSelectAll}
          />

          <div className="p-6 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={200} // Using 200 as shown in the design
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              endIndex={Math.min(endIndex, 200)}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
