"use client"

import { useState } from "react"
import SearchBar from "./Event/SearchBar"
import FilterButtons from "./Event/FilterButtons"
import EventCard from "./Event/EventCard"

interface Event {
  id: string
  title: string
  description: string
  image: string
  type: "berbayar" | "gratis"
  startDate: string
  endDate: string
  registrationDeadline: string
  location: string
  isRegistered?: boolean
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "How To Become Data Scientist",
    description:
      "Bagi kalian yang ingin menjadi seorang data scientist, yuk ikuti Webinar ini hanya untuk membahas kamu memahami langkah-langkah untuk menjadi seorang Data Scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    type: "berbayar",
    startDate: "05 Maret 2025",
    endDate: "10 Maret 2025",
    registrationDeadline: "12 Maret 2025",
    location: "Zoom Meeting",
    isRegistered: false,
  },
  {
    id: "2",
    title: "How To Become Data Scientist",
    description:
      "Bagi kalian yang ingin menjadi seorang data scientist, yuk ikuti Webinar ini hanya untuk membahas kamu memahami langkah-langkah untuk menjadi seorang Data Scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    type: "gratis",
    startDate: "05 Maret 2025",
    endDate: "10 Maret 2025",
    registrationDeadline: "12 Maret 2025",
    location: "Zoom Meeting",
    isRegistered: false,
  },
  {
    id: "3",
    title: "How To Become Data Scientist",
    description:
      "Bagi kalian yang ingin menjadi seorang data scientist, yuk ikuti Webinar ini hanya untuk membahas kamu memahami langkah-langkah untuk menjadi seorang Data Scientist",
    image: "/img/pengumpulan/pengumpulan-1.png",
    type: "gratis",
    startDate: "05 Maret 2025",
    endDate: "10 Maret 2025",
    registrationDeadline: "12 Maret 2025",
    location: "Zoom Meeting",
    isRegistered: false,
  },
]

export default function EventDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("semua")

  const typeOptions = [
    { id: "semua", label: "Semua" },
    { id: "berbayar", label: "Berbayar" },
    { id: "gratis", label: "Gratis" },
  ]

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "semua" || event.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Event</div>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari berdasarkan nama" />

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 min-w-fit">Pengerjaan:</span>
            <FilterButtons options={typeOptions} selected={selectedType} onChange={setSelectedType} />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada event yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
