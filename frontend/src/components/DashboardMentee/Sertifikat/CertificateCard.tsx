"use client"

import { Calendar, Download } from "lucide-react"

interface Certificate {
  id: string
  title: string
  description: string
  image: string
  dateRange: string
  programType: "bootcamp" | "short-class" | "live-class"
  downloadUrl?: string
  isAvailable: boolean
}

interface CertificateCardProps {
  certificate: Certificate
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const handleDownload = () => {
    if (certificate.downloadUrl && certificate.isAvailable) {
      console.log("Download sertifikat:", certificate.title)
      // Create a temporary link to download the certificate
      const link = document.createElement("a")
      link.href = certificate.downloadUrl
      link.download = `${certificate.title.replace(/\s+/g, "-").toLowerCase()}-certificate.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Certificate Image */}
      <div className="relative h-48 w-full">
        <img
          src={certificate.image || "https://via.placeholder.com/300x200?text=Certificate+Image"}
          alt={certificate.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Certificate Content */}
      <div className="p-6">
        <div className="text-lg font-semibold text-gray-900 mb-2">{certificate.title}</div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{certificate.description}</p>

        {/* Date Range */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{certificate.dateRange}</span>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={!certificate.isAvailable}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            certificate.isAvailable
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Download className="h-4 w-4" />
          {certificate.isAvailable ? "Download" : "Tidak Tersedia"}
        </button>
      </div>
    </div>
  )
}
