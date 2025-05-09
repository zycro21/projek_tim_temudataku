// src/components/Home/BenefitSection.tsx
import { Link } from "react-router-dom";

export default function BenefitSection() {
  // Data untuk benefit cards
  const benefits = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur. Urna ornare quam facilisis elit est quam."
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur. Urna ornare quam facilisis elit est quam."
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur. Urna ornare quam facilisis elit est quam."
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur. Urna ornare quam facilisis elit est quam."
    }
  ];

  return (
    <section 
      className="w-full flex items-center"
      style={{ 
        backgroundImage: "url('/img/Home/bg_benefit_section.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "752px"
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[60px] lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <p className="text-[#243A77] font-medium mb-2">Benefit</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0E1115] mb-6">
              Kenapa Belajar di TemuDataku?
            </h2>
            <p className="text-gray-500 mb-10 max-w-lg">
              TemuDataku hadir sebagai platform learning terdepan untuk membantu Anda menguasai dunia data. Kami tidak sekadar mengajar, tapi menghubungkan Anda dengan masa depan karier yang cemerlang di bidang data science, analytics, dan teknologi informasi.
            </p>
            <Link
              to="/jalur-belajar"
              className="inline-block px-6 py-3 bg-[#0CA678] text-white font-medium rounded-md hover:bg-[#08916C] transition-colors"
            >
              Lihat Jalur Belajar
            </Link>
          </div>

          {/* Right Column - Benefit Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.id} 
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="mb-4">
                    <img 
                      src="/img/Home/ic_book_benefit_section.png" 
                      alt="Book Icon" 
                      className="w-10 h-10"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#122B5C] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}