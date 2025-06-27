"use client"

import { Download, Plus } from "lucide-react"

interface ActionButtonsProps {
  onExportData: () => void
  onAddMentee: () => void
}

export default function ActionButtons({ onExportData, onAddMentee }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onExportData}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        <Download className="h-4 w-4" />
        Export Data
      </button>
      <button
        onClick={onAddMentee}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
      >
        <Plus className="h-4 w-4" />
        Tambah Mentee
      </button>
    </div>
  )
}
