import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini

interface DetailMateriModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailMateriModal: React.FC<DetailMateriModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate(); // ✅ Tambahkan ini

  const handleConfirm = () => {
    navigate("/checkout"); // ✅ Navigasi ke halaman checkout
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl w-full max-w-5xl p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gray-500"
          onClick={onClose}
        >
          <X />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kiri: Mentor Info */}
          <div>
            <h3 className="font-semibold text-base mb-1">Detail Mentoring</h3>
            <p className="text-sm text-gray-600 mb-6">
              Lihat lebih detail mentor dan jadwal-mu
            </p>

            <div className="flex flex-col items-center text-center">
              <img
                src="/img/Programs_alumni_section_picture2.png"
                alt="Mentor"
                className="rounded-full w-24 h-24 object-cover mb-4"
              />
              <h4 className="font-semibold text-lg">Maudy Ayunda</h4>
              <p className="text-sm text-gray-600 mt-2">
                Nadya adalah Data Scientist dengan pengalaman di industri
                teknologi dan e-commerce. Ia aktif membimbing peserta bootcamp
                untuk memahami data science secara praktis dan aplikatif.
              </p>
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm">
                Lihat Linkedin
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-700 w-full">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>Senin, 21 April 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>19.30 - 20.00 WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🕒</span>
                  <span>45 menit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💻</span>
                  <span>Zoom Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>WIB (UTC+7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Form Input */}
          <div>
            <h3 className="font-semibold text-base mb-1">
              Lengkapi Detail Materi
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Selangkah lagi menuju sesi mentoring yang menyenangkan
            </p>

            <div className="mb-4">
              <label className="block font-medium text-sm mb-1">
                Materi yang Diinginkan <span className="text-green-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Power BI untuk analisis data"
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-sm mb-1">
                Catatan atau Permintaan Khusus untuk Mentor{" "}
                <span className="text-green-600">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Contoh: Ingin penjelasan lebih dalam tentang data cleaning"
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm} // ✅ Diganti
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMateriModal;
