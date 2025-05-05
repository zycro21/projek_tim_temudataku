// frontend/src/components/DashboardMentee/Header.tsx
import { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userImage?: string;
}

const Header = ({
  userName = 'Lana D',
  userRole = 'Mentee',
  userImage = '/img/default-avatar.png'
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <header className="bg-white py-3 px-4 flex items-center justify-between border-b border-gray-200">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full px-10 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500"
            placeholder="Masukkan kata kunci pencarian..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      
      {/* User Profile & Notifications */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="w-6 h-6 text-gray-500" />
          {/* Notification Badge - uncomment if needed */}
          {/* <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            3
          </span> */}
        </button>
        
        {/* User Menu */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName) + '&background=0D8ABC&color=fff';
            }}
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;