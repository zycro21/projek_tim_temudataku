import type React from "react"
import { CalendarIcon, DocumentIcon, TopicIcon } from "./Icons"

interface MentoringSession {
  status: string
  mentor: {
    name: string
    avatar?: string
  }
  mentee: {
    name: string
    avatar?: string
  }
  dateTime: string
  topic: string
  document: {
    name: string
    size: string
  }
}

interface MentoringSessionCardProps {
  session: MentoringSession
}

const MentoringSessionCard: React.FC<MentoringSessionCardProps> = ({ session }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {session.status}
        </span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Edit
          </button>
          <button className="px-3 py-1 text-xs font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50">
            Hapus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Mentor</div>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-2">
              {session.mentor.avatar ? (
                <img
                  src={session.mentor.avatar || "/placeholder.svg"}
                  alt={session.mentor.name}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{session.mentor.name}</span>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">Mentee</div>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-2">
              {session.mentee.avatar ? (
                <img
                  src={session.mentee.avatar || "/placeholder.svg"}
                  alt={session.mentee.name}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{session.mentee.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center">
          <CalendarIcon />
          <div className="ml-2">
            <div className="text-xs text-gray-500">Tanggal & Waktu</div>
            <div className="text-sm">{session.dateTime}</div>
          </div>
        </div>

        <div className="flex items-center">
          <TopicIcon />
          <div className="ml-2">
            <div className="text-xs text-gray-500">Topik Pembahasan</div>
            <div className="text-sm">{session.topic}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-500 mb-1">Dokumen Diajukan</div>
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
          <div className="flex items-center">
            <DocumentIcon />
            <div className="ml-2">
              <div className="text-sm">{session.document.name}</div>
              <div className="text-xs text-gray-500">{session.document.size}</div>
            </div>
          </div>
          <a href="#" className="text-xs text-green-500 hover:text-green-600">
            Lihat Dokumen
          </a>
        </div>
      </div>
    </div>
  )
}

export default MentoringSessionCard
