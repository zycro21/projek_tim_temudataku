"use client"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface Transaction {
  id: string
  noTransaksi: string
  tanggalDaftar: string
  program: string
  harga: number
  statusPembayaran: "berhasil" | "pending" | "gagal"
}

interface TransactionTableProps {
  transactions: Transaction[]
  sortField: keyof Transaction | null
  sortDirection: "asc" | "desc"
  onSort: (field: keyof Transaction) => void
}

const statusColors = {
  berhasil: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  gagal: "bg-red-100 text-red-800",
}

const statusLabels = {
  berhasil: "Berhasil",
  pending: "Pending",
  gagal: "Gagal",
}

export default function TransactionTable({ transactions, sortField, sortDirection, onSort }: TransactionTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount)
  }

  const getSortIcon = (field: keyof Transaction) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort("noTransaksi")}
              >
                <div className="flex items-center gap-2">
                  No Transaksi
                  {getSortIcon("noTransaksi")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort("tanggalDaftar")}
              >
                <div className="flex items-center gap-2">
                  Tanggal Daftar
                  {getSortIcon("tanggalDaftar")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort("program")}
              >
                <div className="flex items-center gap-2">
                  Program
                  {getSortIcon("program")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort("harga")}
              >
                <div className="flex items-center gap-2">
                  Harga
                  {getSortIcon("harga")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort("statusPembayaran")}
              >
                <div className="flex items-center gap-2">
                  Status Pembayaran
                  {getSortIcon("statusPembayaran")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.noTransaksi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.tanggalDaftar}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.program}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(transaction.harga)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[transaction.statusPembayaran]}`}
                  >
                    {statusLabels[transaction.statusPembayaran]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
