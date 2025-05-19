// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mentoring from "./pages/Mentoring";
import Practice from "./pages/Practice"; 
import Layout from "./components/Layout";
import PracticeDetail from "./pages/PracticeDetail";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramsDetailPage from "./pages/ProgramsDetailPage";
import DashboardMentee from "./pages/DashboardMentee";
import EmailVerification from "./pages/EmailVerification";
import Mentor from "./pages/Mentor";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardMentor from "./pages/DashboardMentor";
import ProtectedRoute from "./components/Middleware/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={["MENTEE"]}
            redirectPath="/"
          >
            <DashboardMentee />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard-admin/*" element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={["ADMIN"]}
            redirectPath="/"
          >
            <DashboardAdmin />
          </ProtectedRoute>
        } />

        <Route path="/dashboard-mentor/*" element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={["MENTOR"]}
            redirectPath="/"
          >
            <DashboardMentor />
          </ProtectedRoute>
        } />
        
        {/* Auth Routes - tanpa Layout karena memiliki desain sendiri */}
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        
        {/* Main Website Routes */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mentoring" element={<Mentoring />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/practice/:id" element={<PracticeDetail />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:id" element={<ProgramsDetailPage />} />
                <Route path="/mentor" element={<Mentor />} />
                
                {/* Fallback route untuk halaman yang tidak ditemukan */}
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center min-h-screen py-20">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Halaman Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Maaf, halaman yang Anda cari tidak ditemukan.</p>
                    <a href="/" className="px-6 py-2 bg-[#0CAF6F] text-white rounded-md hover:bg-[#099660] transition">
                      Kembali ke Beranda
                    </a>
                  </div>
                } />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;