// frontend/src/components/DashboardAdmin/Mentor/EditMentorModal.tsx
import React, { useState, useEffect } from 'react';
import { Mentor } from './types';

interface EditMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
  onSave: (mentorData: Mentor) => void;
}

const EditMentorModal: React.FC<EditMentorModalProps> = ({ 
  isOpen, 
  onClose,
  mentor,
  onSave
}) => {
  const [mentorData, setMentorData] = useState<Mentor | null>(null);
  const [, setPhotoFile] = useState<File | undefined>(undefined);
  
  useEffect(() => {
    if (mentor) {
      setMentorData({...mentor});
    }
  }, [mentor]);
  
  if (!isOpen || !mentorData) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMentorData(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && mentorData) {
      const file = files[0];
      setPhotoFile(file);
      setMentorData({ 
        ...mentorData, 
        photo: URL.createObjectURL(file),
        photoFile: file
      });
    }
  };
  
  const handleDeletePhoto = () => {
    if (mentorData) {
      setMentorData({ 
        ...mentorData, 
        photo: "",
        photoFile: undefined
      });
      setPhotoFile(undefined);
    }
  };
  
  const handleSave = () => {
    if (mentorData) {
      // Validate required fields
      if (!mentorData.fullName.trim() || !mentorData.email.trim() || !mentorData.expertise?.trim()) {
        alert("Harap lengkapi semua field yang wajib diisi");
        return;
      }
      
      onSave(mentorData);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Edit Mentor</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Foto Mentor</label>
            <div className="flex items-center">
              {mentorData.photo ? (
                <img 
                  src={mentorData.photo} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div>
                <div className="flex">
                  <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-green-300 rounded-md bg-white text-green-600 hover:bg-green-50 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    Upload foto profil
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                  {mentorData.photo && (
                    <button 
                      onClick={handleDeletePhoto}
                      className="px-3 py-2 border border-red-300 rounded-md bg-white text-red-600 hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">File png atau jpg maks 4MB</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullName"
              value={mentorData.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap mentor"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={mentorData.email}
              onChange={handleChange}
              placeholder="Masukkan alamat email aktif"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={mentorData.phoneNumber || ''}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Kota</label>
            <input
              type="text"
              name="city"
              value={mentorData.city || ''}
              onChange={handleChange}
              placeholder="Masukkan kota"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Provinsi</label>
            <input
              type="text"
              name="province"
              value={mentorData.province || ''}
              onChange={handleChange}
              placeholder="Masukkan provinsi"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Keahlian Mentor <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="expertise"
              value={mentorData.expertise || ''}
              onChange={handleChange}
              placeholder="Contoh: Data Science, Web Development"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pengalaman</label>
            <input
              type="text"
              name="experience"
              value={mentorData.experience || ''}
              onChange={handleChange}
              placeholder="Contoh: 5 tahun sebagai Data Scientist"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tarif per Jam (Rp)</label>
            <input
              type="number"
              name="hourlyRate"
              value={mentorData.hourlyRate || '0'}
              onChange={handleChange}
              placeholder="Masukkan tarif per jam"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={mentorData.bio || ''}
              onChange={handleChange}
              placeholder="Masukkan bio mentor"
              rows={5}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Status Akun</label>
              <select
                name="isActive"
                value={String(mentorData.isActive)}
                onChange={(e) => {
                  const value = e.target.value === 'true';
                  setMentorData(prev => prev ? { ...prev, isActive: value } : null);
                }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-green-600 rounded-md text-green-600 hover:bg-green-50"
          >
            Batal
          </button>
          
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMentorModal;