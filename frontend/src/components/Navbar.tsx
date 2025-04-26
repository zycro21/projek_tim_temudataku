import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Klik di luar dropdown => tutup dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="h-[88px] w-full flex items-center justify-between px-8 md:px-[100px]
 bg-white shadow-sm relative font-['Inter']"
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/img/Navbar_logo.png"
          alt="TemuDataku Logo"
          className="w-[134px] h-[82px]"
        />
      </div>

      {/* Menu */}
      <ul className="hidden md:flex items-center space-x-8 text-[16px] text-[#5F6368] font-medium">
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-1 cursor-pointer hover:text-[#0CA678]"
          >
            <span>Jalur Belajar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <ul className="absolute z-20 top-full mt-2 left-0 w-56 bg-gray-60 shadow-lg rounded-md py-2">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/programs" className="flex items-center space-x-2">
                  <span>📚</span>
                  <span>Program & Bootcamp</span>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/mentoring" className="flex items-center space-x-2">
                  <span>👨‍🏫</span>
                  <span>Mentoring</span>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/practice" className="flex items-center space-x-2">
                  <span>📄</span>
                  <span>Praktik</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="hover:text-[#0CA678] cursor-pointer">
          <Link to="/mentor">Mentor</Link>
        </li>
        <li className="hover:text-[#0CA678] cursor-pointer">
          <Link to="/faq">FAQ</Link>
        </li>
        <li className="hover:text-[#0CA678] cursor-pointer">
          <Link to="/tentang-kami">Tentang Kami</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/login"
          className="px-7 py-2 border border-[#0CA678] text-[#0CA678] rounded-md hover:bg-[#0CA678] hover:text-white text-sm transition"
        >
          Masuk
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 bg-[#0CA678] rounded-md hover:bg-[#08916C] !text-white text-sm transition"
        >
          Daftar Akun
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button>
          <svg
            className="h-6 w-6 text-[#0CA678]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
