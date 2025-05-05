// src/components/Home/MentorSection.tsx
import { useState } from "react";
import MentorCard from "./Card/MentorCard";

export default function MentorSection() {
  // Array of mentors data
  const mentors = [
    {
      id: 1,
      name: "John Doe",
      photo: "/img/Home/PhotoMentor/img_mentor_1.png",
      workplace: "Lorem Ipsum",
      experience: 2,
      tools: ["Python", "Excel", "BI", "SQL"]
    },
    {
      id: 2,
      name: "Jefri Nichol",
      photo: "/img/Home/PhotoMentor/img_mentor_2.png",
      workplace: "Lorem Ipsum",
      experience: 2,
      tools: ["Python", "Excel", "BI", "SQL"]
    },
    {
      id: 3,
      name: "Laura",
      photo: "/img/Home/PhotoMentor/img_mentor_3.png",
      workplace: "Lorem Ipsum",
      experience: 3,
      tools: ["Python", "Excel", "BI", "SQL"]
    },
    {
      id: 4,
      name: "Alex Johnson",
      photo: "/img/Home/PhotoMentor/img_mentor_1.png", // Reusing photo for example
      workplace: "Lorem Ipsum",
      experience: 4,
      tools: ["Python", "Excel", "BI", "SQL", "Tableau"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const mentorsPerPage = 3;
  const totalPages = Math.ceil(mentors.length / mentorsPerPage);

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

  // Get current mentors to display
  const currentMentors = mentors.slice(
    currentIndex * mentorsPerPage, 
    (currentIndex + 1) * mentorsPerPage
  );

  return (
    <section className="w-full bg-white py-[60px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        {/* Section Title */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-[var(--secondary-main)] font-medium text-base mb-2">
              Mentor
            </p>
            <h2 className="text-[32px] font-medium text-[var(--text-primary)] leading-tight max-w-md">
              Perkenalkan Mentor-Mentor Berpengalaman Kami
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--primary-base)] hover:text-white transition-colors"
              aria-label="Previous mentors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--primary-base)] hover:text-white transition-colors"
              aria-label="Next mentors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mentor Cards */}
        <div className="flex flex-wrap justify-center lg:justify-between gap-8">
          {currentMentors.map((mentor) => (
            <MentorCard 
              key={mentor.id}
              name={mentor.name}
              photo={mentor.photo}
              workplace={mentor.workplace}
              experience={mentor.experience}
              tools={mentor.tools}
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