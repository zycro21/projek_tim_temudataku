"use client"

import { Calendar, Clock, MapPin } from "lucide-react"

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

interface EventCardProps {
  event: Event
}

const typeColors = {
  berbayar: "bg-blue-100 text-blue-800",
  gratis: "bg-green-100 text-green-800",
}

const typeLabels = {
  berbayar: "Berbayar",
  gratis: "Gratis",
}

export default function EventCard({ event }: EventCardProps) {
  const handleRegister = () => {
    console.log("Daftar event:", event.title)
    // Navigate to registration page or handle registration logic
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Event Image with Type Badge */}
      <div className="relative h-48 w-full">
        <img
          src={event.image || "https://via.placeholder.com/300x200?text=Event+Image"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[event.type]}`}>
            {typeLabels[event.type]}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <div className="text-lg font-semibold text-gray-900 mb-2">{event.title}</div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Event Date Range */}
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {event.startDate} - {event.endDate}
            </span>
          </div>

          {/* Registration Deadline */}
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>Ditutup: {event.registrationDeadline}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Lokasi: {event.location}</span>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={event.isRegistered}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
            event.isRegistered
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 text-white"
          }`}
        >
          {event.isRegistered ? "Sudah Terdaftar" : "Daftar"}
        </button>
      </div>
    </div>
  )
}
