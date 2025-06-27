"use client"

import { useState } from "react"
import SearchBar from "./HistoriTransaksi/SearchBar"
import TransactionTable from "./HistoriTransaksi/TransactionTable"
import Pagination from "./HistoriTransaksi/Pagination"

interface Transaction {
  id: string
  noTransaksi: string
  tanggalDaftar: string
  program: string
  harga: number
  statusPembayaran: "berhasil" | "pending" | "gagal"
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    noTransaksi: "ABCD04",
    tanggalDaftar: "04-05-2025",
    program: "Bootcamp Data Science",
    harga: 1750000,
    statusPembayaran: "berhasil",
  },
  {
    id: "2",
    noTransaksi: "ABCD03",
    tanggalDaftar: "27-04-2025",
    program: "Bootcamp Python",
    harga: 1500000,
    statusPembayaran: "berhasil",
  },
  {
    id: "3",
    noTransaksi: "ABCD04",
    tanggalDaftar: "02-04-2025",
    program: "SQL Short Class",
    harga: 200000,
    statusPembayaran: "berhasil",
  },
  {
    id: "4",
    noTransaksi: "ABCD05",
    tanggalDaftar: "13-03-2025",
    program: "Webinar Data Science",
    harga: 30000,
    statusPembayaran: "berhasil",
  },
]

export default function HistoriTransaksiDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<keyof Transaction | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      transaction.noTransaksi.toLowerCase().includes(searchLower) ||
      transaction.tanggalDaftar.toLowerCase().includes(searchLower) ||
      transaction.program.toLowerCase().includes(searchLower) ||
      transaction.statusPembayaran.toLowerCase().includes(searchLower)
    )
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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

  const totalItems = sortedTransactions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex)

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900 mb-6">Histori Transaksi</div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari berdasarkan tanggal, program dan status"
        />

        {/* Transaction Table */}
        <TransactionTable
          transactions={currentTransactions}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          endIndex={Math.min(endIndex, totalItems)}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  )
}
