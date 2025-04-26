// src/components/Home/Card/FAQCard.tsx
import { useState } from "react";

interface FAQCardProps {
  question: string;
  answer: string;
}

export default function FAQCard({ question, answer }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="w-full bg-[var(--state-20)] rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      style={{ 
        width: "1240px", 
        height: isOpen ? "153px" : "89px",
        minHeight: isOpen ? "153px" : "89px",
      }}
      onClick={toggleOpen}
    >
      <div className="p-6">
        {/* Question and Toggle Icon */}
        <div className="flex justify-between items-center">
          <div className="text-[var(--text-primary)] font-medium text-[16px] leading-[25px]">
            {question}
          </div>
          <button 
            className="text-[var(--text-primary)] focus:outline-none transition-transform"
            aria-label={isOpen ? "Close answer" : "Open answer"}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* Answer */}
        {isOpen && (
          <div className="mt-4 text-[var(--text-secondary)] text-[14px] leading-[25px] font-regular">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}