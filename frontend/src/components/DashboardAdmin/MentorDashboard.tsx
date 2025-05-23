// frontend/src/components/DashboardAdmin/MentorDashboard.tsx
import React, { useState } from 'react';
import MentorStatistics from './Mentor/MentorStatistics';
import MentorTable from './Mentor/MentorTable';
import AddMentorModal from './Mentor/AddMentorModal';
import MentorDetailModal from './Mentor/MentorDetailModal';
import EditMentorModal from './Mentor/EditMentorModal';
import { Mentor } from './Mentor/types';
import useMentorAdmin from '../../hooks/useMentorAdmin';
import { toast } from 'sonner';

const MentorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  
  // Use the custom hook
  const {
    mentorData,
    selectedMentor,
    isLoading,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    selectMentor,
    addMentor,
    updateMentor,
    deleteMentor,
    toggleMentorStatus
  } = useMentorAdmin();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleExportData = () => {
    // Implementasi export data
    toast.info('Fitur export data sedang dalam pengembangan');
    console.log('Exporting mentor data...');
  };

  const handleAddMentor = () => {
    setIsAddModalOpen(true);
  };
  
  const handleSaveMentor = async (newMentor: Mentor) => {
    const success = await addMentor(newMentor);
    if (success) {
      setIsAddModalOpen(false);
    }
  };
  
  const handleViewMentorDetails = (mentor: Mentor) => {
    selectMentor(mentor);
    setIsDetailModalOpen(true);
  };
  
  const handleEditMentor = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };
  
  const handleSaveEditedMentor = async (updatedMentor: Mentor) => {
    const success = await updateMentor(updatedMentor);
    if (success) {
      setIsEditModalOpen(false);
    }
  };
  
  const handleDeleteMentor = async () => {
    if (selectedMentor) {
      const success = await deleteMentor(selectedMentor.id);
      if (success) {
        setIsDetailModalOpen(false);
      }
    }
  };
  
  const handleToggleMentorStatus = async (mentorId: string): Promise<boolean> => {
    return await toggleMentorStatus(mentorId);
  };
  
  if (isLoading && !mentorData) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!mentorData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Gagal memuat data mentor.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Muat Ulang
        </button>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mentor</h1>
          <p className="text-gray-500">Kelola data mentor TemuDataku</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExportData}
            className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Data
          </button>
          <button 
            onClick={handleAddMentor}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Mentor
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <MentorStatistics 
        totalMentors={mentorData.totalMentors}
        activeMentors={mentorData.activeMentors}
        inactiveMentors={mentorData.inactiveMentors}
        recentlyAdded={mentorData.recentlyAdded}
      />
      
      {/* Mentor Table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Mentor Terdaftar</h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berdasarkan nama, email, keahlian, atau status..."
              className="w-full sm:w-96 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute left-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <MentorTable 
          mentors={mentorData.mentors}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          searchQuery={searchQuery}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onViewMentorDetails={handleViewMentorDetails}
          onToggleStatus={handleToggleMentorStatus}
          isLoading={isLoading}
        />
      </div>
      
      {/* Modals */}
      <AddMentorModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveMentor}
      />
      
      <MentorDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        mentor={selectedMentor}
        onEdit={handleEditMentor}
        onDelete={handleDeleteMentor}
      />
      
      <EditMentorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mentor={selectedMentor}
        onSave={handleSaveEditedMentor}
      />
    </div>
  );
};

export default MentorDashboard;