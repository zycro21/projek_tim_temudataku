"use client"

import { Calendar, FileText, Video } from "lucide-react"

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

interface MaterialCardProps {
  material: Material
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const handleViewPPT = () => {
    console.log("Lihat PPT untuk:", material.title)
    // Navigate to PPT viewer or download PPT
  }

  const handleViewRecording = () => {
    console.log("Lihat rekaman kelas untuk:", material.title)
    // Navigate to video player or recording page
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Material Image */}
      <div className="relative h-48 w-full">
        <img
          src={material.image || "https://via.placeholder.com/300x200?text=Material+Image"}
          alt={material.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Material Content */}
      <div className="p-6">
        <div className="text-lg font-semibold text-gray-900 mb-2">{material.title}</div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{material.description}</p>

        {/* Date Range */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{material.dateRange}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* View PPT Button */}
          {material.hasPPT && (
            <button
              onClick={handleViewPPT}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Lihat PPT
            </button>
          )}

          {/* View Recording Button */}
          {material.hasRecording && (
            <button
              onClick={handleViewRecording}
              className="w-full bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Video className="h-4 w-4" />
              Lihat Rekaman Kelas
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
