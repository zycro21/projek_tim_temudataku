"use client"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

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

interface MentorTableProps {
  mentors: Mentor[]
  selectedMentors: string[]
  sortField: keyof Mentor | null
  sortDirection: "asc" | "desc"
  onSort: (field: keyof Mentor) => void
  onSelectMentor: (mentorId: string) => void
  onSelectAll: (checked: boolean) => void
}

export default function MentorTable({
  mentors,
  selectedMentors,
  sortField,
  sortDirection,
  onSort,
  onSelectMentor,
  onSelectAll,
}: MentorTableProps) {
  const getSortIcon = (field: keyof Mentor) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const isAllSelected = mentors.length > 0 && selectedMentors.length === mentors.length

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("idMentor")}
            >
              <div className="flex items-center gap-2">
                ID Mentor
                {getSortIcon("idMentor")}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("namaLengkap")}
            >
              <div className="flex items-center gap-2">
                Nama Lengkap
                {getSortIcon("namaLengkap")}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("username")}
            >
              <div className="flex items-center gap-2">
                Username
                {getSortIcon("username")}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("email")}
            >
              <div className="flex items-center gap-2">
                Email
                {getSortIcon("email")}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("peran")}
            >
              <div className="flex items-center gap-2">
                Peran
                {getSortIcon("peran")}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mentors.map((mentor) => (
            <tr key={mentor.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedMentors.includes(mentor.id)}
                  onChange={() => onSelectMentor(mentor.id)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mentor.idMentor}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={mentor.foto || "/placeholder.svg"}
                  alt={mentor.namaLengkap}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentor.namaLengkap}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mentor.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mentor.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentor.peran}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
