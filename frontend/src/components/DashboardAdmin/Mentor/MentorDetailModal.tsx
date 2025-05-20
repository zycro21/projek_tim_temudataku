// frontend/src/components/DashboardAdmin/Mentor/MentorDetailModal.tsx
import React from 'react';
import { Mentor } from './types';

interface MentorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
  onEdit: () => void;
  onDelete: () => void;
}

const MentorDetailModal: React.FC<MentorDetailModalProps> = ({
  isOpen,
  onClose,
  mentor,
  onEdit,
  onDelete
}) => {
  if (!isOpen || !mentor) return null;
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Detail Mentor</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="mb-6">
            <label className="block text-gray-500 text-sm mb-1">Foto Mentor</label>
            <img 
              src={mentor.photo || "/img/Practice_isi_latihan_section_peserta1.png"} 
              alt="Mentor" 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-500 text-sm mb-1">ID Mentor</label>
              <p className="font-medium">{mentor.id}</p>
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Nama Lengkap</label>
              <p className="font-medium">{mentor.fullName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Username</label>
              <p className="font-medium">{mentor.username}</p>
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Email</label>
              <p className="font-medium">{mentor.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Nomor Telepon</label>
              <p className="font-medium">{mentor.phoneNumber || "-"}</p>
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Status</label>
              <p className={`font-medium ${mentor.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {mentor.isActive ? 'Aktif' : 'Tidak Aktif'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Kota</label>
              <p className="font-medium">{mentor.city || "-"}</p>
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Provinsi</label>
              <p className="font-medium">{mentor.province || "-"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Keahlian</label>
              <p className="font-medium">{mentor.expertise || "-"}</p>
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Pengalaman</label>
              <p className="font-medium">{mentor.experience || "-"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Tarif per Jam</label>
              <p className="font-medium">
                {mentor.hourlyRate ? `Rp ${parseInt(mentor.hourlyRate).toLocaleString('id-ID')}` : "-"}
              </p>
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Peran</label>
              <p className="font-medium">{mentor.role}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-500 text-sm mb-1">Bio</label>
            <p className="font-medium whitespace-pre-wrap">{mentor.bio || "-"}</p>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t flex gap-4">
          <button 
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            {mentor.isActive ? 'Nonaktifkan' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorDetailModal;