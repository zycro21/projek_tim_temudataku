// frontend/src/pages/DashboardMentee.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardMentee/Layout';
import OverviewDashboard from '../components/DashboardMentee/OverviewDashboard';
import JadwalDashboard from '../components/DashboardMentee/JadwalDashboard';
import PengumpulanDashboard from '../components/DashboardMentee/PengumpulanDashboard';
import UmpanbalikDashboard from '../components/DashboardMentee/UmpanbalikDashboard';
import MateriDashboard from '../components/DashboardMentee/MateriDashboard';
import SertifikatDashboard from '../components/DashboardMentee/SertifikatDashboard';
import PracticeDashboard from '../components/DashboardMentee/PracticeDashboard';
import HistoryDashboard from '../components/DashboardMentee/HistoryDashboard';
import EventDashboard from '../components/DashboardMentee/EventDashboard';
import HelpDashboard from '../components/DashboardMentee/HelpDashboard';


const DashboardMentee = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<OverviewDashboard />} />
        <Route path="/jadwal" element={<JadwalDashboard />} />
        <Route path="/pengumpulan" element={<PengumpulanDashboard />} />
        <Route path="/umpan-balik" element={<UmpanbalikDashboard />} />
        <Route path="/materi" element={<MateriDashboard />} />
        <Route path="/sertifikat" element={<SertifikatDashboard />} />
        <Route path="/practice" element={<PracticeDashboard />} />
        <Route path="/histori-transaksi" element={<HistoryDashboard />} />
        <Route path="/acara" element={<EventDashboard />} />
        <Route path="/bantuan" element={<HelpDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardMentee;