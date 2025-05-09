// frontend/src/pages/DashboardMentee.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardAdmin/Layout';
import OverviewDashboard from '../components/DashboardAdmin/OverviewDashboard';
import MenteeDashboard from '../components/DashboardAdmin/MenteeDashboard';
import MentorDashboard from '../components/DashboardAdmin/MentorDashboard';
import AdminDashboard from '../components/DashboardAdmin/AdminDashboard';
import TransaksiDashboard from '../components/DashboardAdmin/TransaksiDashboard';
import KelolaMentoringDashboard from '../components/DashboardAdmin/KelolaMentoringDashboard';
import KelolaPracticeDashboard from '../components/DashboardAdmin/KelolaPracticeDashboard';
import ProdukDashboard from '../components/DashboardAdmin/ProdukDashboard';


const DashboardMentee = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/produk-event" element={<ProdukDashboard />} />
        <Route path="/kelola-practice" element={<KelolaPracticeDashboard />} />
        <Route path="/kelola-mentoring" element={<KelolaMentoringDashboard />} />
        <Route path="/transaksi" element={<TransaksiDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/mentee" element={<MenteeDashboard />} />
        <Route path="/" element={<OverviewDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard-admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardMentee;