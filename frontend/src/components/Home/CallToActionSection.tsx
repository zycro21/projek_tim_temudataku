// src/components/Home/CallToActionSection.tsx
import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <section className="w-full py-[60px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        <div 
          className="w-full rounded-lg flex flex-col items-center justify-center text-center py-[60px] px-6"
          style={{ 
            width: "1240px", 
            height: "446px",
            backgroundImage: "url('/img/Home/bg_rectangel_blue_section.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "0 auto"
          }}
        >
          {/* Title */}
          <h2 
            className="text-[var(--text-tertiary)] font-semibold text-[40px] leading-[50px] mb-4 max-w-xl"
          >
            Siap Tingkatkan Karier di Dunia Data?
          </h2>
          
          {/* Description */}
          <p 
            className="text-[var(--text-tertiary)] font-regular text-[16px] leading-[25px] mb-[40px] max-w-xl"
          >
            Bergabunglah dengan TemuDataku dan mulai perjalananmu sekarang!
          </p>
          
          {/* Button */}
          <Link
            to="/register"
            className="px-8 py-3 bg-[var(--primary-base)] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
          >
            Gabung Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}