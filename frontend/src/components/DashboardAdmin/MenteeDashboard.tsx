"use client"

import { useState } from "react"
import StatsCards from "./Mentee/StatsCards"
import SearchBar from "./Mentee/SearchBar"
import MenteeTable from "./Mentee/MenteeTable"
import Pagination from "./Mentee/Pagination"
import ActionButtons from "./Mentee/ActionButtons"

interface Mentee {
  id: string
  idMentee: string
  foto: string
  namaLengkap: string
  username: string
  email: string
  peran: string
  status: "aktif" | "tidak-aktif"
}

const mockMentees: Mentee[] = [
  {
    id: "1",
    idMentee: "ABCD01",
    foto: "https://via.placeholder.com/40x40?text=GD",
    namaLengkap: "Gilang Dirga",
    username: "gildir",
    email: "gilangdirga1@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "2",
    idMentee: "ABCD02",
    foto: "https://via.placeholder.com/40x40?text=RS",
    namaLengkap: "Rina Suryani",
    username: "rinsury",
    email: "sarah.connor@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "3",
    idMentee: "ABCD03",
    foto: "https://via.placeholder.com/40x40?text=BS",
    namaLengkap: "Budi Santoso",
    username: "budsans",
    email: "john.doe@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "4",
    idMentee: "ABCD04",
    foto: "https://via.placeholder.com/40x40?text=NP",
    namaLengkap: "Nina Pratiwi",
    username: "nanpa",
    email: "alice.james@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "5",
    idMentee: "ABCD05",
    foto: "https://via.placeholder.com/40x40?text=AW",
    namaLengkap: "Andi Wijaya",
    username: "awijaya",
    email: "bob.marley@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "6",
    idMentee: "ABCD06",
    foto: "https://via.placeholder.com/40x40?text=SA",
    namaLengkap: "Siti Aminah",
    username: "sitiaminah",
    email: "jane.smith@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "7",
    idMentee: "ABCD07",
    foto: "https://via.placeholder.com/40x40?text=TR",
    namaLengkap: "Tono Rahardjo",
    username: "tonojo",
    email: "michael.brown@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "8",
    idMentee: "ABCD08",
    foto: "https://via.placeholder.com/40x40?text=DL",
    namaLengkap: "Dewi Lestari",
    username: "dewis",
    email: "emily.davis@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "9",
    idMentee: "ABCD09",
    foto: "https://via.placeholder.com/40x40?text=DL",
    namaLengkap: "Dewi Lestari",
    username: "dewis",
    email: "emily.davis@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
  {
    id: "10",
    idMentee: "ABCD10",
    foto: "https://via.placeholder.com/40x40?text=DL",
    namaLengkap: "Dewi Lestari",
    username: "dewis",
    email: "emily.davis@gmail.com",
    peran: "Mentee",
    status: "aktif",
  },
]

export default function MenteeDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMentees, setSelectedMentees] = useState<string[]>([])
  const [sortField, setSortField] = useState<keyof Mentee | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const stats = {
    totalMentees: 390,
    weeklyIncrease: 5,
    activeMentees: 376,
    inactiveMentees: 14,
  }

  const filteredMentees = mockMentees.filter((mentee) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      mentee.namaLengkap.toLowerCase().includes(searchLower) ||
      mentee.email.toLowerCase().includes(searchLower) ||
      mentee.username.toLowerCase().includes(searchLower) ||
      mentee.peran.toLowerCase().includes(searchLower)
    )
  })

  const sortedMentees = [...filteredMentees].sort((a, b) => {
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

  const totalItems = sortedMentees.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMentees = sortedMentees.slice(startIndex, endIndex)

  const handleSort = (field: keyof Mentee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectMentee = (menteeId: string) => {
    setSelectedMentees((prev) => (prev.includes(menteeId) ? prev.filter((id) => id !== menteeId) : [...prev, menteeId]))
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedMentees(checked ? currentMentees.map((mentee) => mentee.id) : [])
  }

  const handleExportData = () => {
    console.log("Export data")
    // Handle export functionality
  }

  const handleAddMentee = () => {
    console.log("Add new mentee")
    // Handle add mentee functionality
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-2xl font-bold text-gray-900">Mentee</div>
            <p className="text-gray-600">Mentee</p>
          </div>
          <ActionButtons onExportData={handleExportData} onAddMentee={handleAddMentee} />
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Mentee Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="text-lg font-semibold text-gray-900 mb-4">Mentee Terdaftar</div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari berdasarkan nama, email, atau status..."
            />
          </div>

          <MenteeTable
            mentees={currentMentees}
            selectedMentees={selectedMentees}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onSelectMentee={handleSelectMentee}
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