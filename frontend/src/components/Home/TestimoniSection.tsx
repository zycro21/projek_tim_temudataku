// src/components/Home/TestimoniSection.tsx
import { useState } from "react";
import TestimoniCard from "./Card/TestimoniCard";

export default function TestimoniSection() {
  // Array of testimoni data
  const testimonials = [
    {
      id: 1,
      testimoni: "Lorem ipsum dolor sit amet consectetur. Elementum augue eget leo ut commodo morbi. Eget scelerisque aliquam turpis elementum in eu mattis posuere. Aliquam elit egestas est odio aenean mattis bibendum lorem.",
      photo: "/img/Home/PhotoTestimoni/img_user_1.png",
      name: "Johan",
      job: "Mahasiswa"
    },
    {
      id: 2,
      testimoni: "Lorem ipsum dolor sit amet consectetur. Elementum augue eget leo ut commodo morbi. Eget scelerisque aliquam turpis elementum in eu mattis posuere. Aliquam elit egestas est odio aenean mattis bibendum lorem.",
      photo: "/img/Home/PhotoTestimoni/img_user_2.png",
      name: "Mei",
      job: "Mahasiswa"
    },
    {
      id: 3,
      testimoni: "Lorem ipsum dolor sit amet consectetur. Elementum augue eget leo ut commodo morbi. Eget scelerisque aliquam turpis elementum in eu mattis posuere. Aliquam elit egestas est odio aenean mattis bibendum lorem.",
      photo: "/img/Home/PhotoTestimoni/img_user_1.png",
      name: "Mei",
      job: "Mahasiswa"
    },
    {
      id: 4,
      testimoni: "Lorem ipsum dolor sit amet consectetur. Elementum augue eget leo ut commodo morbi. Eget scelerisque aliquam turpis elementum in eu mattis posuere. Aliquam elit egestas est odio aenean mattis bibendum lorem.",
      photo: "/img/Home/PhotoTestimoni/img_user_2.png",
      name: "Alex",
      job: "Mahasiswa"
    },
    {
      id: 5,
      testimoni: "Lorem ipsum dolor sit amet consectetur. Elementum augue eget leo ut commodo morbi. Eget scelerisque aliquam turpis elementum in eu mattis posuere. Aliquam elit egestas est odio aenean mattis bibendum lorem.",
      photo: "/img/Home/PhotoTestimoni/img_user_1.png",
      name: "Sarah",
      job: "Mahasiswa"
    },
    {
        id: 6,
        testimoni: "Lorem ipsum dolor sit amet consectetur. Elementum augue eget leo ut commodo morbi. Eget scelerisque aliquam turpis elementum in eu mattis posuere. Aliquam elit egestas est odio aenean mattis bibendum lorem.",
        photo: "/img/Home/PhotoTestimoni/img_user_2.png",
        name: "Alex",
        job: "Mahasiswa"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % totalPages
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  // Get current testimonials to display
  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage, 
    (currentIndex + 1) * testimonialsPerPage
  );

  return (
    <section 
      className="w-full bg-[var(--background-secondary)]"
      style={{ height: "687px" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-[60px]">
        {/* Section Title */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-[var(--secondary-main)] font-medium text-base mb-2">
              Testimoni
            </p>
            <h2 className="text-[32px] font-medium text-[var(--text-primary)] leading-tight max-w-md">
              Apa Kata Mereka?
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--primary-base)] hover:text-white transition-colors"
              aria-label="Previous testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--primary-base)] hover:text-white transition-colors"
              aria-label="Next testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimoni Cards */}
        <div className="flex flex-wrap justify-center lg:justify-between gap-8">
          {currentTestimonials.map((testimonial) => (
            <TestimoniCard 
              key={testimonial.id}
              testimoni={testimonial.testimoni}
              photo={testimonial.photo}
              name={testimonial.name}
              job={testimonial.job}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array(totalPages).fill(0).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex 
                  ? "bg-[var(--primary-base)]" 
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}