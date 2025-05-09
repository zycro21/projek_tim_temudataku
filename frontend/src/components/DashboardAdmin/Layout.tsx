// frontend/src/components/DashboardMentee/Layout.tsx
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area with transparent scrollbar */}
        <main className="flex-1 overflow-auto p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-track]:bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;