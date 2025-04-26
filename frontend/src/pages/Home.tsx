// src/pages/Home.tsx
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
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

function Home() {
  return (
    <Layout>
      <Navbar />
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