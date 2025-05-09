// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mentoring from "./pages/Mentoring";
import Practice from "./pages/Practice"; //
import Layout from "./components/Layout"; // Import Layout
import PracticeDetail from "./pages/PracticeDetail";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramsDetailPage from "./pages/ProgramsDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Layout>
        {" "}
        {/* Membungkus seluruh aplikasi dalam Layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:id" element={<PracticeDetail />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramsDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
