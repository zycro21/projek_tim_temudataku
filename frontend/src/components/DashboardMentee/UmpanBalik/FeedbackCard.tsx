"use client"

import { Calendar, Clock, User } from "lucide-react"

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

interface FeedbackCardProps {
  session: FeedbackSession
}

export default function FeedbackCard({ session }: FeedbackCardProps) {
  const handleFeedbackAction = () => {
    if (session.hasFeedback) {
      console.log("Lihat umpan balik untuk:", session.title)
      // Navigate to view feedback page
    } else {
      console.log("Tambah umpan balik untuk:", session.title)
      // Navigate to add feedback page
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Session Image */}
      <div className="relative h-48 w-full">
        <img
          src={session.image || "https://via.placeholder.com/300x200?text=Session+Image"}
          alt={session.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Session Content */}
      <div className="p-6">
        <div className="text-lg font-semibold text-gray-900 mb-2">{session.title}</div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{session.description}</p>

        {/* Session Details */}
        <div className="space-y-2 mb-4">
          {/* Date and Time */}
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{session.date}</span>
            <div className="mx-2">|</div>
            <Clock className="h-4 w-4 mr-1" />
            <span>{session.time}</span>
          </div>

          {/* Instructor */}
          <div className="flex items-center text-gray-500 text-sm">
            <User className="h-4 w-4 mr-2" />
            <span>{session.instructor}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleFeedbackAction}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
            session.hasFeedback
              ? "bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50"
              : "bg-emerald-500 hover:bg-emerald-600 text-white"
          }`}
        >
          {session.hasFeedback ? "Lihat Umpan Balik" : "Tambah Umpan Balik"}
        </button>
      </div>
    </div>
  )
}
