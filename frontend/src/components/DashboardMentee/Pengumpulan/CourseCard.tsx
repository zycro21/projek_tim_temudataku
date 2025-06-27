"use client"

import { Calendar } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  image: string
  dateRange: string
  status: "belum-dikumpulkan" | "selesai" | "sudah-direview"
  type: "bootcamp" | "short-class" | "live-class"
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const handleKumpulkanProject = () => {
    // Handle project submission logic here
    console.log("Kumpulkan project for:", course.title)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Course Image */}
      <div className="relative h-48 w-full">
        <img
          src={course.image || "https://via.placeholder.com/300x200?text=Course+Image"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="text-lg font-semibold text-gray-900 mb-2">{course.title}</div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

        {/* Date Range */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{course.dateRange}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleKumpulkanProject}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Kumpulkan Project
        </button>
      </div>
    </div>
  )
}
