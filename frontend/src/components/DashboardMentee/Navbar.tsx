// frontend/src/components/DashboardMentee/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const programsDropdownRef = useRef<HTMLDivElement>(null);

  // Klik di luar dropdown => tutup dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      
      if (
        programsDropdownRef.current &&
        !programsDropdownRef.current.contains(event.target as Node)
      ) {
        setProgramsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    // Redirect ke halaman utama setelah logout
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between">
          {/* Logo di kiri */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/img/Navbar_logo.png"
                alt="TemuDataku"
                className="h-12"
              />
            </Link>
          </div>

          {/* Navigasi di tengah */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center gap-8">
              <div className="relative" ref={programsDropdownRef}>
                <button 
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  className="flex items-center gap-1.5 text-gray-700 hover:text-[#0CAF6F] transition font-medium"
                >
                  <span>Program Belajar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${programsDropdownOpen ? 'rotate-180' : ''}`}
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
                
                {/* Dropdown untuk Program Belajar */}
                {programsDropdownOpen && (
                  <div className="absolute z-10 left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 border border-gray-100">
                    <Link
                      to="/programs"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      <span className="mr-2">📚</span>
                      <span>Program & Bootcamp</span>
                    </Link>
                    <Link
                      to="/mentoring"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      <span className="mr-2">👨‍🏫</span>
                      <span>Mentoring</span>
                    </Link>
                    <Link
                      to="/practice"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      <span className="mr-2">📄</span>
                      <span>Praktik</span>
                    </Link>
                  </div>
                )}
              </div>
              
              <Link
                to="/mentor"
                className="text-gray-700 hover:text-[#0CAF6F] transition font-medium"
              >
                Mentor
              </Link>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-[#0CAF6F] transition font-medium"
              >
                FAQ
              </Link>
              <Link
                to="/tentang-kami"
                className="text-gray-700 hover:text-[#0CAF6F] transition font-medium"
              >
                Tentang Kami
              </Link>
            </nav>
          </div>

          {/* User Profile di kanan */}
          <div className="flex items-center">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 focus:outline-none rounded-full hover:bg-gray-50 py-1.5 px-2 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <img
                    src="/img/Practice_isi_latihan_section_peserta1.png"
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#0CAF6F]"
                  />
                  <span className="hidden md:inline-block text-gray-800 font-medium">
                    {user?.full_name || "Gilang Dirga"}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
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

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-100">
                  {/* User Info Box */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{user?.full_name || "Gilang Dirga"}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email || "gilang@example.com"}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/profil"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Profil Saya</span>
                    </Link>
                    
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      <span>Dashboard Saya</span>
                    </Link>
                    
                    <Link
                      to="/kelas"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>Kelas Saya</span>
                    </Link>
                    
                    <Link
                      to="/transaksi"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span>Transaksi Saya</span>
                    </Link>
                    
                    <Link
                      to="/pengaturan"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Pengaturan</span>
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-100 mt-1"></div>
                  
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - hanya tampil di mobile */}
            <div className="block md:hidden ml-4">
              <button className="p-2 text-gray-700 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}