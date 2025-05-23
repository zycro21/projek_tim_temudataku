// frontend/src/components/DashboardAdmin/Mentor/MentorTable.tsx
import React, { useState } from 'react';
import { Mentor } from './types';

interface MentorTableProps {
  mentors: Mentor[];
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onViewMentorDetails: (mentor: Mentor) => void;
  onToggleStatus?: (mentorId: string) => Promise<boolean>;
  isLoading?: boolean;
}

const MentorTable: React.FC<MentorTableProps> = ({
  mentors,
  currentPage,
  itemsPerPage,
  searchQuery,
  onPageChange,
  onItemsPerPageChange,
  onViewMentorDetails,
  onToggleStatus,
  isLoading = false
}) => {
  const [selectedMentors, setSelectedMentors] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

// frontend/src/components/DashboardAdmin/Mentor/MentorTable.tsx (lanjutan)
  // Filter mentors based on search query
  const filteredMentors = mentors.filter(mentor => {
    const query = searchQuery.toLowerCase();
    return (
      mentor.fullName.toLowerCase().includes(query) ||
      mentor.email.toLowerCase().includes(query) ||
      mentor.username.toLowerCase().includes(query) ||
      mentor.id.toLowerCase().includes(query) ||
      (mentor.expertise && mentor.expertise.toLowerCase().includes(query)) ||
      (mentor.isActive ? 'aktif'.includes(query) : 'tidak aktif'.includes(query))
    );
  });

  // Sort mentors
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    const aValue = a[sortField as keyof Mentor];
    const bValue = b[sortField as keyof Mentor];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      if (sortDirection === 'asc') {
        return aValue === bValue ? 0 : aValue ? -1 : 1;
      } else {
        return aValue === bValue ? 0 : aValue ? 1 : -1;
      }
    }
    
    return 0;
  });

  // Paginate
  const indexOfLastMentor = currentPage * itemsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - itemsPerPage;
  const currentMentors = sortedMentors.slice(indexOfFirstMentor, indexOfLastMentor);
  
  const pageCount = Math.ceil(filteredMentors.length / itemsPerPage);
  const pageNumbers = [];
  
  // Calculate page numbers to display
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(pageCount, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMentors(currentMentors.map(mentor => mentor.id));
    } else {
      setSelectedMentors([]);
    }
  };

  const handleSelectMentor = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (selectedMentors.includes(id)) {
      setSelectedMentors(selectedMentors.filter(mentorId => mentorId !== id));
    } else {
      setSelectedMentors([...selectedMentors, id]);
    }
  };

  const handleToggleStatus = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleStatus) {
      await onToggleStatus(id);
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return null;
    }
    
    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="bg-white overflow-hidden border rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}
      
      <div className="overflow-x-auto relative">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  onChange={handleSelectAll}
                  checked={selectedMentors.length === currentMentors.length && currentMentors.length > 0}
                  aria-label="Select all mentors"
                />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID Mentor {renderSortIcon('id')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Foto
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('fullName')}
              >
                Nama Lengkap {renderSortIcon('fullName')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email {renderSortIcon('email')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('expertise')}
              >
                Keahlian {renderSortIcon('expertise')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('isActive')}
              >
                Status {renderSortIcon('isActive')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMentors.length > 0 ? (
              currentMentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewMentorDetails(mentor)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded text-green-600 focus:ring-green-500"
                      checked={selectedMentors.includes(mentor.id)}
                      onChange={() => {}}
                      onClick={(e) => handleSelectMentor(mentor.id, e)}
                      aria-label={`Select ${mentor.fullName}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mentor.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      className="h-10 w-10 rounded-full object-cover" 
                      src={mentor.photo || "/img/Practice_isi_latihan_section_peserta1.png"} 
                      alt={mentor.fullName} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mentor.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mentor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mentor.expertise || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      mentor.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mentor.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewMentorDetails(mentor);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Lihat Detail"
                        disabled={isLoading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {onToggleStatus && (
                        <button 
                          onClick={(e) => handleToggleStatus(mentor.id, e)}
                          className={`${
                            mentor.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                          }`}
                          title={mentor.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                          disabled={isLoading}
                        >
                          {mentor.isActive ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchQuery ? 'Tidak ada mentor yang sesuai dengan pencarian' : 'Tidak ada data mentor'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-700 mb-4 sm:mb-0">
            Menampilkan {filteredMentors.length > 0 ? indexOfFirstMentor + 1 : 0}-{Math.min(indexOfLastMentor, filteredMentors.length)} dari {filteredMentors.length} data
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="px-2 py-1 border rounded-md text-sm"
                disabled={currentPage === 1 || isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => onPageChange(number)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === number ? 'bg-green-600 text-white' : 'text-gray-700'
                  }`}
                  disabled={isLoading}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
                className="px-2 py-1 border rounded-md text-sm"
                disabled={currentPage === pageCount || pageCount === 0 || isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Tampilkan per halaman</span>
              <select
                value={itemsPerPage}
                onChange={onItemsPerPageChange}
                className="border rounded-md text-sm p-1"
                disabled={isLoading}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorTable;