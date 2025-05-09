import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarIcon,
  BeakerIcon,
  CreditCardIcon,
  ShoppingBagIcon,
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
      path: '/dashboard-admin'
    },
    {
      name: 'Mentee',
      icon: <UserIcon className="w-6 h-6" />,
      path: '/dashboard-admin/mentee'
    },
    {
      name: 'Mentor',
      icon: <UserGroupIcon className="w-6 h-6" />,
      path: '/dashboard-admin/mentor'
    },
    {
      name: 'Admin',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      path: '/dashboard-admin/admin'
    },
    {
      name: 'Kelola Mentoring',
      icon: <CalendarIcon className="w-6 h-6" />,
      path: '/dashboard-admin/kelola-mentoring'
    },
    {
      name: 'Kelola Practice',
      icon: <BeakerIcon className="w-6 h-6" />,
      path: '/dashboard-admin/kelola-practice'
    },
    {
      name: 'Transaksi',
      icon: <CreditCardIcon className="w-6 h-6" />,
      path: '/dashboard-admin/transaksi'
    },
    {
      name: 'Produk & Event',
      icon: <ShoppingBagIcon className="w-6 h-6" />,
      path: '/dashboard-admin/produk-event'
    },
  ];

  const bottomLinks: SidebarLink[] = [
    {
      name: 'Butuh bantuan?',
      icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
      path: '/dashboard-admin/bantuan'
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
              <Link
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium text-[#737373] hover:bg-[#F5F5F5] gap-3`}
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