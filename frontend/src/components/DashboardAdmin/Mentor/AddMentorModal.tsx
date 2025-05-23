// frontend/src/components/DashboardAdmin/Mentor/AddMentorModal.tsx
import React, { useState } from 'react';
import { Mentor } from './types';

interface AddMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mentorData: Mentor) => void;
}

const AddMentorModal: React.FC<AddMentorModalProps> = ({ 
  isOpen, 
  onClose,
  onSave
}) => {
  const [step, setStep] = useState<number>(1);
  const [mentorData, setMentorData] = useState({
    photo: "",
    photoFile: undefined as File | undefined,
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    province: "",
    expertise: "",
    bio: "",
    experience: "",
    hourlyRate: "0",
    role: "Mentor",
    status: "Aktif"
  });
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMentorData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setMentorData(prev => ({ 
        ...prev, 
        photo: URL.createObjectURL(file),
        photoFile: file
      }));
    }
  };
  
  const handleDeletePhoto = () => {
    setMentorData(prev => ({ 
      ...prev, 
      photo: "",
      photoFile: undefined
    }));
  };
  
  const handleNext = () => {
    // Validasi dasar
    if (step === 1) {
      if (!mentorData.fullName.trim() || !mentorData.email.trim() || !mentorData.password.trim()) {
        alert("Mohon lengkapi data nama, email, dan password");
        return;
      }
      
      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mentorData.email)) {
        alert("Format email tidak valid");
        return;
      }
      
      // Validasi password (minimal 8 karakter)
      if (mentorData.password.length < 8) {
        alert("Password harus minimal 8 karakter");
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const handlePrevious = () => {
    setStep(step - 1);
  };
  
  const handleSave = () => {
    // Validasi dasar step 3
    if (!mentorData.expertise.trim()) {
      alert("Mohon lengkapi data keahlian mentor");
      return;
    }
    
    // Generate a random ID for the new mentor (will be replaced by API)
    const newMentor = {
      ...mentorData,
      id: `TEMP_${Math.floor(10 + Math.random() * 90)}`,
      username: mentorData.email.split('@')[0],
      isActive: mentorData.status === "Aktif"
    } as Mentor;
    
    onSave(newMentor);
    onClose();
    
    // Reset the form
    setMentorData({
      photo: "",
      photoFile: undefined,
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      city: "",
      province: "",
      expertise: "",
      bio: "",
      experience: "",
      hourlyRate: "0",
      role: "Mentor",
      status: "Aktif"
    });
    setStep(1);
  };
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Tambah Mentor Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Step indicator */}
        <div className="flex justify-between px-4 py-3 bg-gray-50">
          <div className={`flex items-center ${step === 1 ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${step === 1 ? 'bg-green-600 text-white' : 'bg-gray-200'} mr-2`}>
              1
            </div>
            <span className="text-sm">Informasi Dasar</span>
          </div>
          <div className={`flex items-center ${step === 2 ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${step === 2 ? 'bg-green-600 text-white' : 'bg-gray-200'} mr-2`}>
              2
            </div>
            <span className="text-sm">Lokasi & Kontak</span>
          </div>
          <div className={`flex items-center ${step === 3 ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${step === 3 ? 'bg-green-600 text-white' : 'bg-gray-200'} mr-2`}>
              3
            </div>
            <span className="text-sm">Profil Profesional</span>
          </div>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div>
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
// frontend/src/components/DashboardAdmin/Mentor/AddMentorModal.tsx (lanjutan)
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
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={mentorData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password (min. 8 karakter)"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={mentorData.phoneNumber}
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
                  value={mentorData.city}
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
                  value={mentorData.province}
                  onChange={handleChange}
                  placeholder="Masukkan provinsi"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Keahlian Mentor <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="expertise"
                  value={mentorData.expertise}
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
                  value={mentorData.experience}
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
                  value={mentorData.hourlyRate}
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
                  value={mentorData.bio}
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
                    name="status"
                    value={mentorData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 border-t flex justify-between">
          {step > 1 ? (
            <button 
              onClick={handlePrevious}
              className="px-4 py-2 border border-green-600 rounded-md text-green-600 hover:bg-green-50"
            >
              Sebelumnya
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-green-600 rounded-md text-green-600 hover:bg-green-50"
            >
              Kembali
            </button>
          )}
          
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Selanjutnya
            </button>
          ) : (
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Tambah Mentor
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMentorModal;