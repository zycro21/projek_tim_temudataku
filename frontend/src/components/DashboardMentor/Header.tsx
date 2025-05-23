// frontend/src/components/DashboardMentee/Header.tsx
import { useState, useEffect } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useAuth from '../../hooks/useAuth';
import { apiRequest } from '../../service/api';

interface HeaderProps {
  userImage?: string;
}

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Header = ({
  userImage = '/img/Practice_isi_latihan_section_peserta1.png'
}: HeaderProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mendapatkan nama pengguna dan peran dari user yang diambil dari useAuth
  const userName = user?.full_name || 'Mentee';
  const userRole = user?.roles?.includes('admin') ? 'Admin' : 'Mentee';
  
  // Fungsi untuk mengambil notifikasi dari API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest<{ data: Notification[] }>({
        method: 'GET',
        url: '/notifications'
      });
      
      if (response.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Contoh data notifikasi jika API gagal
      setNotifications([
        {
          id: 1,
          message: 'Jadwal mentoring dengan Pak Budi telah diubah',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          message: 'Tugas baru telah ditambahkan di kelas Data Science',
          isRead: false, 
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mengambil notifikasi saat komponen dimuat
  useEffect(() => {
    if (user) {
      // Komentar fetchNotifications() jika API belum tersedia
      // fetchNotifications();
    }
  }, [user]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  // Format tanggal untuk notifikasi
  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Menghitung notifikasi yang belum dibaca
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
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
        <div className="relative">
          <button 
            className="relative p-2 rounded-full hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon className="w-6 h-6 text-gray-500" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Dropdown Notifications */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700">Notifikasi</h3>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {isLoading ? (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <div className="animate-spin mx-auto mb-2 h-6 w-6 border-2 border-gray-200 border-t-gray-600 rounded-full"></div>
                    <p>Memuat notifikasi...</p>
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                    >
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatNotificationDate(notification.createdAt)}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <p>Tidak ada notifikasi</p>
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    Tandai semua sudah dibaca
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
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