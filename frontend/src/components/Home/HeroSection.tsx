// src/components/Home/HeroSection.tsx
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section 
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: "url('/img/Home/bg_hero_section.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Jembatan Menuju Karier Impian di Dunia Data
            </h1>
            <p className="text-base md:text-lg text-gray-500 mb-8">
              Temukan jalur belajar yang terstruktur, bimbingan dari mentor industri, 
              dan proyek nyata untuk mengasah keterampilan datamu.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-[#0CA678] text-white font-medium rounded-md hover:bg-[#08916C] transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative md:flex justify-end items-center">
            <img
              src="/img/Home/img_hero_section.png"
              alt="Data Science Professional"
              className="w-full max-w-lg mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}