import React from "react";
import { useNavigate } from "react-router-dom";

interface Program {
  id: number;
  title: string;
  level: string;
  startDate: string;
  endDate: string;
  price: number;
  originalPrice: number;
  badge: string;
  image: string;
  tools: string[];
}

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  const navigate = useNavigate(); // ✅ dipanggil di dalam komponen

  return (
    <div className="border rounded-xl shadow p-4 flex flex-col bg-white">
      <div className="relative">
        <img
          src={program.image}
          alt="Ilustrasi Latihan"
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 right-3 bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium shadow-sm">
          {program.level}
        </span>
        <div className="absolute bottom-0 left-0 w-full bg-[#1E3A8A] text-white text-xs text-center py-2 font-semibold">
          {program.badge}
        </div>
      </div>

      <h3 className="font-semibold text-[16px] text-gray-800 mb-3">
        {program.title}
      </h3>

      <div className="flex gap-3 mb-3">
        {program.tools.map((tool, idx) => (
          <img
            key={idx}
            src={tool}
            alt={`tool-${idx}`}
            className="w-6 h-6 object-contain"
          />
        ))}
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-2 gap-2">
        <span>
          🗓️ {program.startDate} – {program.endDate}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm mb-4">
        <span className="text-gray-400 line-through">
          {program.originalPrice}
        </span>
        <span className="text-green-600 font-bold">{program.price}</span>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <button className="bg-[#0CA678] hover:bg-[#099268] text-white text-sm px-4 py-2 rounded-lg w-full">
          Daftar Sekarang
        </button>
        <button
          onClick={() => navigate(`/programs/${program.id}`)} // ✅ program.id
          className="border border-[#0CA678] hover:bg-[#e6f9f2] text-[#0CA678] text-sm px-4 py-2 rounded-lg w-full"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
