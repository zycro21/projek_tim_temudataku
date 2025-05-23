import React, { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import DetailMateriModal from "./DetailMateriModal";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [month, setMonth] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());
  const [showDetailModal, setShowDetailModal] = useState(false);

  if (!isOpen) return null;

  const totalDays = dayjs(`${year}-${month + 1}`).daysInMonth();
  const firstDay = dayjs(`${year}-${month + 1}-01`).day();
  const days = [
    ...Array(firstDay).fill(null),
    ...Array(totalDays)
      .fill(null)
      .map((_, i) => i + 1),
  ];

  const timeSlots = [
    "17:00 - 17:45",
    "17:45 - 18:30",
    "18:30 - 19:15",
    "19:15 - 20:00",
  ];

  const handlePrevMonth = () => {
    const newDate = dayjs(new Date(year, month, 1)).subtract(1, "month");
    setMonth(newDate.month());
    setYear(newDate.year());
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(new Date(year, month, 1)).add(1, "month");
    setMonth(newDate.month());
    setYear(newDate.year());
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const formattedSelectedDate =
    selectedDate && selectedTime
      ? dayjs(new Date(year, month, selectedDate))
          .locale("id")
          .format("dddd, D MMMM YYYY")
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl w-full max-w-6xl p-8 overflow-y-auto max-h-[95vh]">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gray-500"
          onClick={onClose}
        >
          <X />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mentor Info */}
          <div className="flex flex-col items-center text-center">
            <button className="flex items-center text-gray-500 text-sm self-start mb-4">
              <ArrowLeft size={16} className="mr-1" /> Pilih Mentor
            </button>
            <img
              src="/img/Programs_alumni_section_picture2.png"
              alt="Mentor"
              className="rounded-full w-24 h-24 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Maudy Ayunda</h3>
            <p className="text-sm text-gray-600 mt-2">
              Nadya adalah Data Scientist dengan pengalaman di industri
              teknologi dan e-commerce. Ia aktif membimbing peserta bootcamp
              untuk memahami data science secara praktis dan aplikatif.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm">
              Lihat Profil
            </button>
          </div>

          {/* Calendar */}
          <div>
            <h4 className="font-semibold text-base mb-1">Atur Jadwalmu</h4>
            <p className="text-sm text-gray-600 mb-4">
              Tentukan tanggal dan bulan yang paling pas buat-mu
            </p>

            <div className="flex justify-between items-center mb-2">
              <button onClick={handlePrevMonth} className="text-gray-600">
                <ArrowLeft size={20} />
              </button>
              <span className="font-medium text-gray-800">
                {dayjs(new Date(year, month)).locale("id").format("MMMM YYYY")}
              </span>
              <button onClick={handleNextMonth} className="text-gray-600">
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-700 mb-1">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                <div key={d} className="font-medium">
                  {d}
                </div>
              ))}
              {days.map((d, i) => (
                <div
                  key={i}
                  onClick={() => d && setSelectedDate(d)}
                  className={`py-2 rounded-lg transition-all ${
                    !d
                      ? ""
                      : selectedDate === d
                      ? "bg-green-500 text-white"
                      : "hover:bg-green-100 cursor-pointer"
                  }`}
                >
                  {d || ""}
                </div>
              ))}
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <h4 className="font-semibold text-base mb-1">Pilih Waktu</h4>
            <p className="text-sm text-gray-600 mb-4">
              Tentukan jam yang paling pas buat-mu
            </p>

            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`w-full text-center py-2 border rounded-full text-sm font-medium ${
                    selectedTime === slot
                      ? "bg-green-500 text-white border-green-500"
                      : "hover:bg-green-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Section */}
        {selectedDate && selectedTime && (
          <div className="mt-6 p-6 bg-gray-50 rounded-xl text-sm flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Info Kiri */}
            <div className="space-y-2 text-gray-700 w-full md:w-auto md:min-w-[180px] pr-10">
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

            {/* Konfirmasi Jadwal */}
            <div className="flex-1">
              <p className="font-medium text-gray-800 mb-1">
                Berikut jadwal mentoring-mu:
              </p>
              <p className="font-semibold mb-2">
                {formattedSelectedDate} pukul {selectedTime} WIB
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={() => setShowDetailModal(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <DetailMateriModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default ScheduleModal;
