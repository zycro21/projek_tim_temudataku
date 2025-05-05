// src/components/Home/DiscountSection.tsx
import { useState, useEffect } from "react";

export default function DiscountSection() {
  // Tampilkan slide yang sama beberapa kali (karena menggunakan asset yang sama)
  const slides = [
    {
      id: 1,
      image: "/img/Home/img_card_discount_home.png"
    },
    {
      id: 2,
      image: "/img/Home/img_card_discount_home.png"
    },
    {
      id: 3,
      image: "/img/Home/img_card_discount_home.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fungsi untuk navigasi carousel
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CSS class untuk animasi kustom dengan gap
  const slideContainerStyle = {
    display: "flex",
    gap: "32px",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 32}px))`
  };

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[100px]">
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative max-w-[970px] mx-auto overflow-hidden">
            <div className="flex">
              
              {/* Carousel Viewport - perlu overflow hidden */}
              <div className="flex-1 overflow-hidden">
                <div style={slideContainerStyle}>
                  {slides.map((slide, index) => (
                    <div 
                      key={slide.id} 
                      className="min-w-full flex-shrink-0"
                    >
                      <img 
                        src={slide.image} 
                        alt={`Discount promotion ${index + 1}`} 
                        className="w-full h-[250px] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-0 w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#0CA678] border border-[#0CA678] hover:bg-[#0CA678] hover:text-white transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext} 
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#0CA678] border border-[#0CA678] hover:bg-[#0CA678] hover:text-white transition-colors z-10"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-[#0CA678]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}