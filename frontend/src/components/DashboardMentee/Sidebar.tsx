import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CreditCardIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface SidebarLink {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();

  const mainLinks: SidebarLink[] = [
    {
      name: 'Overview',
      icon: <HomeIcon className="w-6 h-6" />,
      path: '/dashboard'
    },
    {
      name: 'Jadwal',
      icon: <CalendarIcon className="w-6 h-6" />,
      path: '/dashboard/jadwal'
    },
    {
      name: 'Pengumpulan',
      icon: <DocumentDuplicateIcon className="w-6 h-6" />,
      path: '/dashboard/pengumpulan'
    },
    {
      name: 'Umpan balik',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      path: '/dashboard/umpan-balik'
    },
    {
      name: 'Materi',
      icon: <BookOpenIcon className="w-6 h-6" />,
      path: '/dashboard/materi'
    },
    {
      name: 'Sertifikat',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      path: '/dashboard/sertifikat'
    },
    {
      name: 'Practice',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      path: '/dashboard/practice'
    },
    {
      name: 'Histori Transaksi',
      icon: <CreditCardIcon className="w-6 h-6" />,
      path: '/dashboard/histori-transaksi'
    },
    {
      name: 'Acara',
      icon: <EnvelopeIcon className="w-6 h-6" />,
      path: '/dashboard/acara'
    },
  ];

  const bottomLinks: SidebarLink[] = [
    {
      name: 'Butuh bantuan?',
      icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
      path: '/dashboard/bantuan'
    },
    {
      name: 'Logout',
      icon: <ArrowRightOnRectangleIcon className="w-6 h-6" />,
      path: '/'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-60 bg-white h-screen flex flex-col shadow-sm">
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
                  : 'text-gray-600 hover:bg-gray-100'
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
              <Link
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 gap-3`}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;