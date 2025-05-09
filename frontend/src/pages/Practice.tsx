import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyPractices from "../data/dummyPractices";
import { dummyAlumniPractices } from "../data/dummyAlumniPractices";

export default function Practice() {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);
  const visibleCards = showAll ? dummyPractices : dummyPractices.slice(0, 6);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-10 px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* Left: Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                <img
                  src="/img/Practice_hero_section_picture1.png"
                  alt="Mentoring Hero"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Right: Text and CTAs */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Siap Level Up? Mulai Latihan Sekarang!
              </h1>
              <p className="text-lg text-blue-600 font-semibold mb-2">
                #LatihanBiarGakPanik
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Skill gak bakal naik level kalau cuma baca teori. Yuk, langsung
                praktik lewat latihan interaktif yang dibuat khusus buat calon
                praktisi data kayak kamu.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <button className="bg-[#0CA678] text-white hover:bg-[#08916C] focus-visible:text-black font-semibold px-6 py-3 rounded-full transition">
                  Pilihan Mentoring
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
                Kenapa Harus Ikut Mentoring di TemuDataku?
              </h2>
              {/* Deskripsi */}
              <p className="text-gray-600 text-base">
                Karena belajar data sendirian tuh bikin overthinking. Di sini,
                kamu bisa dapet arahan langsung dari praktisi yang udah pernah
                ngerasain struggle-nya. Lebih cepat, lebih jelas, dan pastinya
                gak se-error itu.
              </p>
            </div>

            {/* Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <span>
                      <img src="/img/Mentoring_benefit_section_icon1.png" />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    Tanya Apa Aja, Bebas Judgment
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Gak ngerti SQL? Bingung project portofolio? Pengen curhat
                    soal gagal interview? Boleh banget. Mentor di sini no-judge
                    zone 100%.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <img src="/img/Mentoring_benefit_section_icon2.png" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Portofolio Gak Cuma Cakep, Tapi Powerful
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mentor bantuin review, benerin, bahkan kasih ide project
                    biar portofoliomu bisa "speak louder" ke recruiter.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <img src="/img/Mentoring_benefit_section_icon3.png" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    1-on-1 Session, Biar Kamu Fokus Sama Dirimu
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Gak perlu rebutan mic atau malu ditanya. Kamu dapet sesi
                    pribadi, jadi bisa all out tanya dan eksplor skill-mu
                    sendiri.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <img src="/img/Mentoring_benefit_section_icon4.png" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Mentor = Support System + Career GPS
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mentor bukan cuma ngarahin, tapi juga menyemangatin. Karena
                    belajar data itu emang berat, tapi gak harus kamu lewatin
                    sendiri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pilih Practice Section */}
        <section id="latihan" className="py-20 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Pilih Latihan Sesuai Levelmu!
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Dari yang baru kenal data sampai yang udah siap project, semua
              bisa latihan di sini. Tinggal pilih tantangan yang cocok, terus
              gasin!
            </p>

            {/* Search Bar + Filter Level */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Cari latihan-mu di sini"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-md shadow-sm md:w-48">
                <option value="semua">Semua Level</option>
                <option value="pemula">Pemula</option>
                <option value="menengah">Menengah</option>
              </select>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Semua",
                "Data Analysis",
                "Data Science",
                "Machine Learning",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-[#0CA678] hover:text-[#0CA678]"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {visibleCards.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl shadow-sm overflow-hidden bg-white"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt="Ilustrasi Latihan"
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium shadow-sm">
                      {item.level}
                    </span>
                    <div className="absolute bottom-0 left-0 w-full bg-[#1E3A8A] text-white text-xs text-center py-2 font-semibold">
                      {item.badge}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Estimasi pengerjaan {item.duration}
                    </p>

                    <div className="flex items-center gap-2 text-sm mb-4">
                      <span className="text-gray-400 line-through">
                        {item.originalPrice}
                      </span>
                      <span className="text-green-600 font-bold">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src="/img/profile_placeholder.png"
                        alt="profile"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600 font-medium">
                        {item.instructor}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="bg-[#0CA678] hover:bg-[#08916C] text-white py-2 rounded-md font-semibold">
                        Mulai Latihan
                      </button>
                      <button
                        onClick={() => navigate(`/practice/${item.id}`)}
                        className="border border-[#0CA678] text-[#0CA678] hover:bg-[#E6FBF2] py-2 rounded-md font-semibold"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button Lihat Lebih Banyak */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={toggleShowAll}
                className="bg-[#0CA678] hover:bg-[#08916C] text-white px-6 py-3 rounded-md font-semibold shadow-md"
              >
                {showAll ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
              </button>
            </div>
          </div>
        </section>

        {/* Alumni Section */}
        <section className="bg-white py-20 px-6 md:px-16" id="alumni">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            {/* Top Texts */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              {/* Left Heading */}
              <div className="md:w-1/2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Apa Kata Alumni Tentang Mentoring di TemuDataku?
                </h2>
              </div>

              {/* Right Paragraph */}
              <div className="md:w-1/2">
                <p className="text-gray-600">
                  Belajar bareng mentor bikin perjalanan data gak kerasa
                  sendirian. Banyak alumni jadi makin paham, makin pede, dan
                  siap terjun ke dunia kerja. Yuk, intip cerita mereka!
                </p>
              </div>
            </div>

            {/* Carousel */}
            <div>
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                grabCursor={true}
                loop={true}
              >
                {dummyAlumniPractices.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
                      {/* Alumni Photo */}
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-60 object-cover"
                      />

                      {/* Alumni Info */}
                      <div className="flex items-center gap-4 p-4">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">{item.status}</p>
                        </div>
                      </div>

                      {/* Hover Testimonial */}
                      {item.testimonial && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-center px-4 transition-all duration-300">
                          <p className="text-sm">{item.testimonial}</p>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

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
