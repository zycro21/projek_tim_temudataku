import React, { useState } from "react";
import { X, Briefcase, Calendar, Brain } from "lucide-react";
import ScheduleModal from "./ScheduleModal"; // pastikan komponen ini sudah ada

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mentors = [
  {
    name: "Jefri Nichol",
    desc: "Data Scientist di PT. Pertamina",
    experience: "3 Tahun sebagai Data Scientist",
    skills: "Python, Excel, Power BI, SQL",
    img: "/img/Programs_alumni_section_picture1.png",
  },
  {
    name: "Maudy Ayunda",
    desc: "Data Scientist di PT. Pertamina",
    experience: "3 Tahun sebagai Data Scientist",
    skills: "Python, Excel, Power BI, SQL",
    img: "/img/Programs_alumni_section_picture2.png",
  },
  {
    name: "David Pratama",
    desc: "Data Scientist di PT. Pertamina",
    experience: "3 Tahun sebagai Data Scientist",
    skills: "Python, Excel, Power BI, SQL",
    img: "/img/Programs_alumni_section_picture3.png",
  },

  {
    name: "Jefri Nichol",
    desc: "Data Scientist di PT. Pertamina",
    experience: "3 Tahun sebagai Data Scientist",
    skills: "Python, Excel, Power BI, SQL",
    img: "/img/Programs_alumni_section_picture1.png",
  },
  {
    name: "Maudy Ayunda",
    desc: "Data Scientist di PT. Pertamina",
    experience: "3 Tahun sebagai Data Scientist",
    skills: "Python, Excel, Power BI, SQL",
    img: "/img/Programs_alumni_section_picture2.png",
  },
  {
    name: "David Pratama",
    desc: "Data Scientist di PT. Pertamina",
    experience: "3 Tahun sebagai Data Scientist",
    skills: "Python, Excel, Power BI, SQL",
    img: "/img/Programs_alumni_section_picture3.png",
  },
];

const MentorModal: React.FC<MentorModalProps> = ({ isOpen, onClose }) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  if (!isOpen) return null;

  const handleMentorClick = (mentor: any) => {
    setSelectedMentor(mentor);
    setIsScheduleOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl max-w-6xl w-full relative overflow-y-auto max-h-[90vh] scrollbar-hide ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold mb-2">Pilih Mentor Favorit-mu!</h2>
          <p className="text-sm text-gray-600 mb-4">
            Temukan mentor yang paling cocok buat kamu. Lihat profil mereka, cek
            pengalaman dan pilih yang paling pas untuk bantu kamu berkembang!
          </p>

          <input
            type="text"
            placeholder="Cari mentor-mu di sini"
            className="w-full border rounded-md px-4 py-2 mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.name}
                className="bg-white rounded-xl overflow-hidden shadow-md border"
              >
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{mentor.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2 gap-2">
                    <Briefcase className="w-4 h-4" />
                    {mentor.desc}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1 gap-2">
                    <Calendar className="w-4 h-4" />
                    {mentor.experience}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1 gap-2">
                    <Brain className="w-4 h-4" />
                    {mentor.skills}
                  </div>

                  <button
                    onClick={() => handleMentorClick(mentor)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 w-full rounded-lg transition"
                  >
                    Daftar Mentoring
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup schedule */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        mentor={selectedMentor}
      />
    </>
  );
};

export default MentorModal;
