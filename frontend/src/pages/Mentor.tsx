// src/pages/Mentor.tsx
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/Mentor/HeroSection";
import ListMentor from "../components/Mentor/ListMentor";
import TestimoniSection from "../components/Home/TestimoniSection";
import CallToActionSection from "../components/Home/CallToActionSection";

function Mentor() {
  return (
    <Layout>
      <Navbar />
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