// src/components/Home/ServiceSection.tsx
import { useState } from "react";
import ServiceCard from "./Card/ServiceCard";

export default function ServiceSection() {
  const [activeTab, setActiveTab] = useState("mentoring");

  // Common features for mentoring
  const commonFeatures = [
    "Tanya apapun permasalahan dalam bidang data science",
    "Rekaman sesi mentoring",
    "Garansi kepuasan*",
    "Dapatkan akses ke praktik data science**"
  ];

  // Tab options
  const tabs = [
    { id: "mentoring", label: "Mentoring" },
    { id: "praktik", label: "Praktik" },
    { id: "program", label: "Program & Bootcamp" }
  ];

  return (
    <section className="w-full bg-white py-[60px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[95.5px]">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[#243A77] font-medium text-base mb-2">
            Jalur Belajar
          </p>
          <h2 className="text-[32px] font-medium text-[#0E1115] leading-tight">
            Jalur Belajar di TemuDataku<br />
            yang Bisa Kamu Pilih
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-lg p-1 mb-8 w-[1239px] h-[63px] mx-auto border border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-3 px-4 mx-[16px] rounded-md text-center transition-colors ${
                activeTab === tab.id
                  ? "bg-[#0CA678] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {activeTab === "mentoring" && (
            <>
              <ServiceCard
                title="Mentoring 1 on 1"
                coverImage="/img/Home/img_cover_service_best.png"
                regularPrice={45000}
                discountPrice={40000}
                duration={45}
                features={commonFeatures}
              />
              
              <ServiceCard
                title="Mentoring Group"
                coverImage="/img/Home/img_cover_service.png"
                discountPrice={70000}
                duration={90}
                features={commonFeatures}
              />
            </>
          )}

          {activeTab === "praktik" && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">
                Konten Praktik akan segera tersedia
              </h3>
              <p>
                Kami sedang mempersiapkan konten praktik terbaik untuk Anda
              </p>
            </div>
          )}

          {activeTab === "program" && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">
                Program & Bootcamp akan segera tersedia
              </h3>
              <p>
                Kami sedang mempersiapkan program dan bootcamp terbaik untuk Anda
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}