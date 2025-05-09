"use client"

import { useState } from "react"
import MentorCard from "../Home/Card/MentorCard"

// Sample mentor data
const mentors = [
  {
    id: 1,
    name: "John Doe",
    photo: "/img/Home/PhotoMentor/img_mentor_1.png",
    workplace: "Lorem Ipsum",
    experience: 2,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 2,
    name: "Jefri Nichol",
    photo: "/img/Home/PhotoMentor/img_mentor_2.png",
    workplace: "Lorem Ipsum",
    experience: 2,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 3,
    name: "Laura",
    photo: "/img/Home/PhotoMentor/img_mentor_3.png",
    workplace: "Lorem Ipsum",
    experience: 3,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 4,
    name: "John Doe",
    photo: "/img/Home/PhotoMentor/img_mentor_1.png",
    workplace: "Lorem Ipsum",
    experience: 2,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 5,
    name: "Jefri Nichol",
    photo: "/img/Home/PhotoMentor/img_mentor_2.png",
    workplace: "Lorem Ipsum",
    experience: 2,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 6,
    name: "Laura",
    photo: "/img/Home/PhotoMentor/img_mentor_3.png",
    workplace: "Lorem Ipsum",
    experience: 3,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 7,
    name: "John Doe",
    photo: "/img/Home/PhotoMentor/img_mentor_1.png",
    workplace: "Lorem Ipsum",
    experience: 2,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 8,
    name: "Jefri Nichol",
    photo: "/img/Home/PhotoMentor/img_mentor_2.png",
    workplace: "Lorem Ipsum",
    experience: 2,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
  {
    id: 9,
    name: "Laura",
    photo: "/img/Home/PhotoMentor/img_mentor_3.png",
    workplace: "Lorem Ipsum",
    experience: 3,
    tools: ["Python", "Excel", "BI", "SQL"],
  },
]

const ListMentor = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 9
  const totalPages = Math.ceil(mentors.length / itemsPerPage)

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Get current page mentors
  const currentMentors = mentors.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div id="list-mentor-section" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-6">
          <p className="text-sm font-bold mb-1" style={{ color: "var(--brand-blue)" }}>
            Mentor
          </p>

          <div className="flex justify-between items-center">
            <h2 className="text-xl semi-bold" style={{ color: "var(--text-primary)" }}>
              Daftar Mentor di TemuDataku
            </h2>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevPage}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--primary-base)] hover:text-white transition-colors"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNextPage}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--primary-base)] hover:text-white transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mentors Grid - Using grid with equal column spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentMentors.map((mentor) => (
            <div key={mentor.id} className="flex justify-center">
              <MentorCard
                name={mentor.name}
                photo={mentor.photo}
                workplace={mentor.workplace}
                experience={mentor.experience}
                tools={mentor.tools}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListMentor