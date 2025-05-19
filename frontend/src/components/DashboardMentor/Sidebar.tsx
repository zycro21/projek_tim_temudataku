import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import useAuth from '../../hooks/useAuth';
import { apiRequest } from '../../service/api';
import { useState } from 'react';

interface SidebarLink {
  name: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fungsi untuk melakukan logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Panggil API logout jika tersedia
      try {
        await apiRequest({
          method: 'POST',
          url: '/auth/logout'
        });
      } catch (apiError) {
        console.warn('Logout API error:', apiError);
        // Lanjutkan proses logout lokal meskipun API error
      }

      // Logout lokal
      logout();
      
      // Tampilkan notifikasi sukses
      toast.success('Berhasil logout', {
        description: 'Anda telah keluar dari akun'
      });
      
      // Navigasi ke halaman utama
      navigate('/');
      
      // Dispatch event untuk memberitahu komponen lain
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Gagal logout', {
        description: 'Terjadi kesalahan saat logout. Silakan coba lagi.'
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const mainLinks: SidebarLink[] = [
    {
      name: 'Overview',
      icon: <HomeIcon className="w-6 h-6" />,
      path: '/dashboard-mentor'
    },
    {
      name: 'Schedule',
      icon: <CalendarIcon className="w-6 h-6" />,
      path: '/dashboard-mentor/schedule'
    },
    {
      name: 'Session Services',
      icon: <ClockIcon className="w-6 h-6" />,
      path: '/dashboard-mentor/session-services'
    },
    {
      name: 'Mentor Report',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      path: '/dashboard-mentor/mentor-report'
    },
    {
      name: 'Mentee Feedback',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      path: '/dashboard-mentor/mentee-feedback'
    },
  ];

  const bottomLinks: SidebarLink[] = [
    {
      name: 'Butuh bantuan?',
      icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
      path: '/dashboard-mentor/bantuan'
    },
    {
      name: isLoggingOut ? 'Logging out...' : 'Logout',
      icon: <ArrowRightOnRectangleIcon className="w-6 h-6" />,
      path: '#', // Menggunakan '#' sebagai placeholder, karena kita akan menangani onClick
      onClick: handleLogout
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-60 bg-background-primary h-screen flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        <img src="/img/Auth/ic_logo.png" alt="TemuDataku Logo" className="h-15" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {mainLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium gap-3 
                ${isActive(link.path) 
                  ? 'bg-[#0CAF6F] text-white' 
                  : 'text-[#737373] hover:bg-[#F5F5F5]'
                }`}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="px-3 py-6">
        <ul className="space-y-1">
          {bottomLinks.map((link) => (
            <li key={link.name}>
              {link.onClick ? (
                <button
                  onClick={link.onClick}
                  disabled={isLoggingOut && link.name.includes('Logout')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-medium text-[#737373] hover:bg-[#F5F5F5] gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="flex-shrink-0">
                    {isLoggingOut && link.name.includes('Logout') ? (
                      <svg className="animate-spin h-6 w-6 text-[#737373]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      link.icon
                    )}
                  </span>
                  <span>{link.name}</span>
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium text-[#737373] hover:bg-[#F5F5F5] gap-3`}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;