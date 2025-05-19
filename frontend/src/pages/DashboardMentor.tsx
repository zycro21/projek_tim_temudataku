// frontend/src/pages/DashboardMentor.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ScheduleDashboard from '../components/DashboardMentor/ScheduleDashboard';
import OverviewDashboard from '../components/DashboardMentor/OverviewDashboard';
import DashboardLayout from '../components/DashboardMentor/Layout';
import SessionServicesDashboard from '../components/DashboardMentor/SessionServicesDashboard';
import MentorReportDashboard from '../components/DashboardMentor/MentorReportDashboard';
import MenteeFeedbackDashboard from '../components/DashboardMentor/MenteeFeedbackDashboard';

const DashboardMentor = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/schedule" element={<ScheduleDashboard />} />
        <Route path="/session-services" element={<SessionServicesDashboard />} />
        <Route path="/mentor-report" element={<MentorReportDashboard />} />
        <Route path="/mentee-feedback" element={<MenteeFeedbackDashboard />} />
        <Route path="/" element={<OverviewDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard-mentor" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardMentor;