import * as React from "react"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

const HeroSection = () => {
  const scrollToListMentor = () => {
    // Find the ListMentor component or use an id to scroll to it
    const listMentorSection = document.getElementById("list-mentor-section");
    if (listMentorSection) {
      listMentorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-between w-full py-[60px] px-6 bg-white md:py-[60px] sm:py-10 xs:py-8">
      {/* Container with spacing: 144 x 602, with padding 60px top/bottom and 100px gap */}
      <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto w-full md:gap-[100px] gap-8">
        {/* Left content: Heading and text */}
        <div className="flex flex-col justify-center md:max-w-lg order-2 md:order-1">
          <h1 className="heading1 text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-4 text-black" style={{ 
            fontSize: 'var(--heading2-size)', 
            lineHeight: 'var(--heading2-line-height)' 
          }}>
            Belajar Lebih Cepat dengan Mentor Berpengalaman
          </h1>
          <p className="body-text text-gray-600 mb-8" style={{ 
            fontSize: 'var(--body-size)', 
            lineHeight: 'var(--body-line-height)' 
          }}>
            Dapatkan bimbingan langsung dari praktisi data di perusahaan ternama.
            Dengan pengalaman nyata dan wawasan industri, mereka siap
            membantu kamu mencapai tujuan karier di dunia data.
          </p>
          <div className="w-fit">
            <Button 
              variant="default" 
              className="bg-[#28B67A] text-white hover:bg-[#28B67A]/90"
              onClick={scrollToListMentor}
            >
              Lihat Mentor
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right content: Mentor image */}
        <div className="rounded-lg overflow-hidden md:w-[459px] md:h-[482px] w-full max-w-[500px] mx-auto order-1 md:order-2">
          <img 
            src="/img/Mentor/img_hero_mentor.png" 
            alt="Mentor berpengalaman" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;