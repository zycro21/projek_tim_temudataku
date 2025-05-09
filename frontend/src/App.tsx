// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mentoring from "./pages/Mentoring";
import Practice from "./pages/Practice";
import Layout from "./components/Layout";
import PracticeDetail from "./pages/PracticeDetail";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramsDetailPage from "./pages/ProgramsDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import DashboardMentee from "./pages/DashboardMentee";
import EmailVerification from "./pages/EmailVerification";
import Mentor from "./pages/Mentor";
import DashboardAdmin from "./pages/DashboardAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardMentee />} />
        <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />

        {/* Auth Routes */}
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />

        {/* Main Website Routes dibungkus dalam Layout */}
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
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
