"use client"

import { Calendar } from "lucide-react"

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

interface PracticeCardProps {
  practice: Practice
}

const levelColors = {
  pemula: "bg-blue-100 text-blue-800",
  menengah: "bg-yellow-100 text-yellow-800",
  ahli: "bg-red-100 text-red-800",
}

const levelLabels = {
  pemula: "Pemula",
  menengah: "Menengah",
  ahli: "Ahli",
}

export default function PracticeCard({ practice }: PracticeCardProps) {
  const handleSubmit = () => {
    console.log("Kumpulkan practice:", practice.title)
    // Navigate to submission page
  }

  const handleViewReview = () => {
    console.log("Lihat review untuk:", practice.title)
    // Navigate to review page
  }

  const handleViewSubmission = () => {
    console.log("Lihat pengumpulan untuk:", practice.title)
    // Navigate to submission details page
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Practice Image with Level Badge */}
      <div className="relative h-48 w-full">
        <img
          src={practice.image || "https://via.placeholder.com/300x200?text=Practice+Image"}
          alt={practice.title}
          className="w-full h-full object-cover"
        />
        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[practice.level]}`}>
            {levelLabels[practice.level]}
          </span>
        </div>
      </div>

      {/* Practice Content */}
      <div className="p-6">
        <div className="text-lg font-semibold text-gray-900 mb-2">{practice.title}</div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{practice.description}</p>

        {/* Date Range */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{practice.dateRange}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {practice.status === "belum-dikerjakan" && (
            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Kumpulkan
            </button>
          )}

          {practice.status === "selesai" && (
            <>
              {practice.hasReview && (
                <button
                  onClick={handleViewReview}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Lihat Review
                </button>
              )}
              {practice.hasSubmission && (
                <button
                  onClick={handleViewSubmission}
                  className="w-full bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Lihat Pengumpulan
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
