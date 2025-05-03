// src/pages/Mentoring.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import { useState } from "react";
import { dummyPrograms } from "../data/dummyPrograms";
import { dummyProgramsProject } from "../data/dummyProgramsProject";
import { useKeenSlider } from "keen-slider/react";
import { TestimoniBootcampSection } from "../components/TestimoniBootcampSection";

export default function ProgramsPage() {
  
  const [showAll, setShowAll] = useState(false);
  const displayedPrograms = showAll ? dummyPrograms : dummyPrograms.slice(0, 6); // 2 baris × 3 kolom

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 2, spacing: 16 },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-10 px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* Left: Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                <img
                  src="/img/Mentoring_hero_section.png"
                  alt="Mentoring Hero"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Right: Text and CTAs */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-2xl md:text-[42px] font-bold text-gray-900 mb-4 leading-tight">
                Materi Terstruktur & Praktik <br />
                Langsung dengan Bootcamp
              </h1>
              <p className="text-lg text-blue-600 font-semibold mb-2">
                #GasBelajarData
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Bootcamp TemuDataku dirancang buat kamu yang pengen belajar data
                dari nol sampai paham, tanpa pusing. Materinya udah disusun rapi
                dan langsung dipraktikkin, jadi kamu nggak cuma belajar—tapi
                juga beneran bisa!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <button className="bg-[#0CA678] text-white hover:bg-[#08916C] focus-visible:text-black font-semibold px-6 py-3 rounded-full transition">
                  Pilihan Bootcamp
                </button>

                <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition">
                  Konsultasi Gratis
                </button>
              </div>

              {/* Avatars (Testimonial preview) */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex gap-3">
                  {/* Avatar images, nanti pakai Image component */}
                  <img
                    src="/img/Mentoring_hero_section_people1.png"
                    alt="User 1"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="/img/Mentoring_hero_section_people2.png"
                    alt="User 2"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="/img/Mentoring_hero_section_people3.png"
                    alt="User 3"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="/img/Mentoring_hero_section_people4.png"
                    alt="User 3"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="/img/Mentoring_hero_section_people5.png"
                    alt="User 3"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  {/* Tambahkan avatar lain kalau mau */}
                </div>
                <p className="text-sm text-gray-600 ml-4">
                  95+ mentee telah mendaftar
                </p>
              </div>
              <a
                href="#testimoni"
                className="text-gray-600 text-sm underline underline-offset-4 hover:text-blue-600"
              >
                Apa yang mereka katakan?
              </a>
            </div>
          </div>
        </section>
        {/* Benefit Section */}
        <section className="bg-white py-20 px-6 md:px-16" id="benefits">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Judul */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Kenapa Harus Ikut Bootcamp TemuDataku?
              </h2>
              {/* Deskripsi */}
              <p className="text-gray-600 text-base">
                Bootcamp ini nggak cuma ngasih teori, tapi juga pengalaman
                belajar yang real dan relevan. Kamu bakal dapet akses ke mentor
                kece, materi yang udah dikurasi, project beneran, dan pastinya
                komunitas seru buat tumbuh bareng!
              </p>
            </div>

            {/* Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <span>
                      <img src="/img/Programs_benefit_section_icon1.png" />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    Belajar Langsung Bareng Mentor
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Dapet insight & feedback langsung dari praktisi yang udah
                    berpengalaman di dunia data.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <img src="/img/Programs_benefit_section_icon2.png" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Project Beneran, Bukan Cuma Teori
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Langsung praktik ngerjain studi kasus biar portofolio kamu
                    makin stand out.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <img src="/img/Programs_benefit_section_icon3.png" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Materi Terstruktur & Nggak Ngebosenin
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Disusun step-by-step biar kamu nggak bingung, cocok buat
                    pemula sampai yang mau leveling up.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <img src="/img/Programs_benefit_section_icon4.png" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Komunitas Supportive Buat Tumbuh Bareng
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nggak belajar sendirian! Ada teman diskusi, semangat bareng,
                    dan networking juga.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pilih Bootcamp Section */}
        <section className="bg-white py-20 px-6 md:px-16" id="pilih-bootcamp">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Pilih Bootcamp yang Pas Untuk Kamu!
              </h2>
              <p className="text-gray-600 text-base">
                Dengan kebutuhan yang sama, TemuDataku nyediain pilihan bootcamp
                yang bisa kamu sesuaikan sama kebutuhan, waktu, dan goals kamu.
                Yuk, cari yang paling pas buat perjalanan belajarmu!
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
              <input
                type="text"
                placeholder="Cari bootcamp-mu di sini"
                className="w-full md:flex-1 border border-gray-300 px-4 py-2 rounded-lg"
              />
              <select className="border border-gray-300 px-4 py-2 rounded-lg">
                <option value="semua">Semua</option>
              </select>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-col gap-4 mb-10">
              {/* Jenis Program */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">Jenis Program:</span>
                {["Semua", "Bootcamp", "Short Class", "Live Class"].map(
                  (item) => (
                    <button
                      key={item}
                      className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-full`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* Jenis Keterampilan */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">Jenis Keterampilan:</span>
                {[
                  "Semua",
                  "Data Analysis",
                  "Data Science",
                  "Machine Learning",
                ].map((item) => (
                  <button
                    key={item}
                    className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-full`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {displayedPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* Button Lihat Lebih Banyak/Sedikit */}
            {dummyPrograms.length > 6 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="bg-[#1E3A8A] hover:bg-[#1b2e6e] text-white text-sm px-6 py-3 rounded-lg"
                >
                  {showAll ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
                </button>
              </div>
            )}
          </div>
        </section>
        {/* Programs Project Section */}
        <section className="bg-white py-20 px-6 md:px-16" id="programs-project">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Project Sejauh Ini, Keren Nggak Sih?
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Di sini kamu bisa lihat hasil karya alumni TemuDataku selama
                ikut bootcamp. Bukan cuma materi, tapi project beneran yang
                nunjukin skill mereka di dunia data. Yuk intip, siapa tahu bisa
                jadi inspirasi kamu juga!
              </p>
            </div>

            {/* Carousel */}
            <div ref={sliderRef} className="keen-slider">
              {dummyProgramsProject.map((project) => (
                <div key={project.id} className="keen-slider__slide">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {project.description}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <span>👥</span>
                        {project.contributors}
                      </p>
                      <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition">
                        Jelajahi Proyek
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni Bootcamp Section */}
        <TestimoniBootcampSection />

        {/* Need Help Section */}
        <section className="bg-gray-50 py-16 px-8 md:px-[100px]" id="bantuan">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-2 items-center">
            {/* Left - Text & Buttons */}
            <div>
              <h2 className="text-[32px] font-bold mb-4 leading-tight">
                Butuh Bantuan?
              </h2>
              <p className="text-[16px] font-normal text-[#1E1E1E] mb-6">
                Masih bingung pilih mentoring yang pas? Atau ada pertanyaan soal
                program? Tenang, tim kami siap bantu jawab semua kebingunganmu.
                Jangan ragu buat hubungi kami, ya!
              </p>

              {/* Konsultasi Gratis Button */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/6281234567890" // Ganti dengan link WA TemuDataku
                  className=" hover:bg-green-600 text-[#0CA678] border font-semibold py-2 px-4 rounded-lg transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi Gratis
                </a>

                {/* Social Media Icons */}
                {/* Gambar Instagram */}
                <a
                  href="https://instagram.com/temudataku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src="/img/Mentoring_need_help_section_icon1.png" // Ganti sesuai nama file kamu
                    alt="Instagram TemuDataku"
                    className="w-full h-full object-contain"
                  />
                </a>

                {/* Gambar LinkedIn */}
                <a
                  href="https://linkedin.com/company/temudataku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src="/img/Mentoring_need_help_section_icon2.png" // Ganti sesuai nama file kamu
                    alt="LinkedIn TemuDataku"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center">
              <img
                src="/img/Mentoring_need_help_section_picture.png" // Simpan gambarnya di public/img
                alt="Butuh Bantuan"
                className="md:w-[608px] md:h-[451px]"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
