// frontend/src/pages/Home.tsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import DashboardNavbar from "../components/DashboardMentee/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/Home/HeroSection";
import DiscountSection from "../components/Home/DiscountSection";
import BenefitSection from "../components/Home/BenefitSection";
import ToolsSection from "../components/Home/ToolsSection";
import ServiceSection from "../components/Home/ServiceSection";
import MentorSection from "../components/Home/MentorSection";
import TestimoniSection from "../components/Home/TestimoniSection";
import FAQSection from "../components/Home/FAQSection";
import CallToActionSection from "../components/Home/CallToActionSection";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isAuthenticated, user } = useAuth();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(isAuthenticated);
    
    // Jika user terautentikasi, cek role dan redirect jika perlu
    if (isAuthenticated && user) {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      const userRoles = userData?.roles?.map((role: string) => role.toUpperCase()) || [];
      
      if (userRoles.includes("ADMIN")) {
        navigate("/dashboard-admin");
      } else if (userRoles.includes("MENTOR")) {
        navigate("/dashboard-mentor");
      }
    }
    
    console.log("Auth state updated:", isAuthenticated);
  }, [isAuthenticated, user, navigate]);

  // Mendengarkan event auth-change dari useAuth
  useEffect(() => {
    const handleAuthChange = () => {
      const isUserAuth = localStorage.getItem('auth_token') !== null;
      setIsAuth(isUserAuth);
      
      // Jika user login, cek role
      if (isUserAuth) {
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        const userRoles = userData?.roles?.map((role: string) => role.toUpperCase()) || [];
        
        if (userRoles.includes("ADMIN")) {
          navigate("/dashboard-admin");
          return;
        } else if (userRoles.includes("MENTOR")) {
          navigate("/dashboard-mentor");
          return;
        }
      }
      
      console.log("Auth event received, new state:", isUserAuth);
    };

    window.addEventListener('auth-change', handleAuthChange);
    
    // Periksa status autentikasi saat komponen dimuat
    handleAuthChange();
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [navigate]);

  return (
    <Layout>
      {isAuth ? <DashboardNavbar /> : <Navbar />}
      
      <main>
        <HeroSection />
        <DiscountSection />
        <BenefitSection />
        <ToolsSection />
        <ServiceSection />
        <MentorSection />
        <TestimoniSection />
        <FAQSection />
        <CallToActionSection />
      </main>
      <Footer />
    </Layout>
  );
}

export default Home;