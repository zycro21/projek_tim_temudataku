// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mentoring from "./pages/Mentoring";
import Practice from "./pages/Practice"; 
import Layout from "./components/Layout"; // Import Layout
import PracticeDetail from "./pages/PracticeDetail";
import ProgramsPage from "./pages/ProgramsPage";
import DashboardMentee from "./pages/DashboardMentee"; // Import Dashboard
import EmailVerification from "./pages/EmailVerification"; // Import EmailVerification

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardMentee />} />
        
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
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;