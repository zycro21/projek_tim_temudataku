// src/pages/Mentor.tsx
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/Mentor/HeroSection";
import ListMentor from "../components/Mentor/ListMentor";
import TestimoniSection from "../components/Home/TestimoniSection";
import CallToActionSection from "../components/Home/CallToActionSection";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import DashboardNavbar from "../components/DashboardMentee/Navbar";

function Mentor() {
    const { isAuthenticated, user } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
  
    // Mendengarkan perubahan isAuthenticated
    useEffect(() => {
      setIsAuth(isAuthenticated);
      console.log("Auth state updated:", isAuthenticated);
    }, [isAuthenticated]);
  
    // Mendengarkan event auth-change dari useAuth
    useEffect(() => {
      const handleAuthChange = () => {
        const isUserAuth = localStorage.getItem('auth_token') !== null;
        setIsAuth(isUserAuth);
        console.log("Auth event received, new state:", isUserAuth);
      };
  
      window.addEventListener('auth-change', handleAuthChange);
      
      // Periksa status autentikasi saat komponen dimuat
      handleAuthChange();
      
      return () => {
        window.removeEventListener('auth-change', handleAuthChange);
      };
    }, []);
  
    // Logging untuk debugging
    useEffect(() => {
      console.log("Current auth status:", isAuth);
      if (user) {
        console.log("User data:", user);
      }
    }, [isAuth, user]);
  return (
    <Layout>
      {/* Tampilkan DashboardNavbar jika user sudah login, Navbar jika belum */}
      {isAuth ? <DashboardNavbar /> : <Navbar />}
      <main>
        <HeroSection />
        <ListMentor/>
        <TestimoniSection/>
        <CallToActionSection/>
      </main>
      <Footer />
    </Layout>
  );
}

export default Mentor;