// src/pages/Mentoring.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProgramsPage() {
  const dummyPrograms = [
    {
      id: 1,
      title: "Bootcamp - Data Science",
      level: "Level 2 – Skill Booster: Saatnya Upgrade Skill",
      startDate: "15 Maret 2025",
      endDate: "17 Maret 2025",
      price: 500000,
      originalPrice: 650000,
      badge: "BEST PRACTICE",
      image: "/img/Programs_pilih_section_picture1.png",
      tools: [
        "/img/Programs_pilih_section_skill1.png",
        "/img/Programs_pilih_section_skill2.png",
        "/img/Programs_pilih_section_skill3.png",
      ],
    },
    {
      id: 2,
      title: "Short Class - Data Science",
      level: "Level 2 – Skill Booster: Saatnya Upgrade Skill",
      startDate: "15 Maret 2025",
      endDate: "17 Maret 2025",
      price: 500000,
      originalPrice: 550000,
      badge: "BEST PRACTICE",
      image: "/img/Programs_pilih_section_picture2.png",
      tools: [
        "/img/Programs_pilih_section_skill1.png",
        "/img/Programs_pilih_section_skill2.png",
        "/img/Programs_pilih_section_skill3.png",
      ],
    },
    {
      id: 3,
      title: "Live Class - Data Analysis",
      level: "Level 2 – Skill Booster: Saatnya Upgrade Skill",
      startDate: "Maret 2025",
      endDate: "17 Maret 2025",
      price: 500000,
      originalPrice: 560000,
      badge: "BEST PRACTICE",
      image: "/img/Programs_pilih_section_picture3.png",
      tools: [
        "/img/Programs_pilih_section_skill1.png",
        "/img/Programs_pilih_section_skill2.png",
        "/img/Programs_pilih_section_skill3.png",
      ],
    },
    {
      id: 4,
      title: "Bootcamp - Machine Learning",
      level: "Level 3 – Skill Mastery: Jadi Expert di Bidangnya",
      startDate: "20 Maret 2025",
      endDate: "25 Maret 2025",
      price: 750000,
      originalPrice: 900000,
      badge: "RECOMMENDED",
      image: "/img/Programs_pilih_section_picture4.png",
      tools: [
        "/img/Programs_pilih_section_skill4.png",
        "/img/Programs_pilih_section_skill5.png",
        "/img/Programs_pilih_section_skill6.png",
      ],
    },
    {
      id: 5,
      title: "Short Class - Python for Data",
      level: "Level 1 – Skill Starter: Mulai Dari Dasar",
      startDate: "10 April 2025",
      endDate: "12 April 2025",
      price: 300000,
      originalPrice: 450000,
      badge: "FAVORIT",
      image: "/img/Programs_pilih_section_picture5.png",
      tools: [
        "/img/Programs_pilih_section_skill2.png",
        "/img/Programs_pilih_section_skill7.png",
        "/img/Programs_pilih_section_skill8.png",
      ],
    },
    {
      id: 6,
      title: "Live Class - Excel for Analyst",
      level: "Level 1 – Skill Starter: Mulai Dari Dasar",
      startDate: "5 April 2025",
      endDate: "7 April 2025",
      price: 250000,
      originalPrice: 400000,
      badge: "FAVORIT",
      image: "/img/Programs_pilih_section_picture6.png",
      tools: [
        "/img/Programs_pilih_section_skill1.png",
        "/img/Programs_pilih_section_skill9.png",
        "/img/Programs_pilih_section_skill10.png",
      ],
    },
    {
      id: 7,
      title: "Bootcamp - SQL Mastery",
      level: "Level 3 – Skill Mastery: Jadi Expert di Bidangnya",
      startDate: "22 April 2025",
      endDate: "28 April 2025",
      price: 600000,
      originalPrice: 800000,
      badge: "RECOMMENDED",
      image: "/img/Programs_pilih_section_picture7.png",
      tools: [
        "/img/Programs_pilih_section_skill3.png",
        "/img/Programs_pilih_section_skill10.png",
        "/img/Programs_pilih_section_skill6.png",
      ],
    },
    {
      id: 8,
      title: "Live Class - Tableau Visualizations",
      level: "Level 2 – Skill Booster: Saatnya Upgrade Skill",
      startDate: "29 April 2025",
      endDate: "30 April 2025",
      price: 450000,
      originalPrice: 550000,
      badge: "POPULAR",
      image: "/img/Programs_pilih_section_picture8.png",
      tools: [
        "/img/Programs_pilih_section_skill11.png",
        "/img/Programs_pilih_section_skill12.png",
        "/img/Programs_pilih_section_skill1.png",
      ],
    },
    {
      id: 9,
      title: "Short Class - Data Cleaning",
      level: "Level 1 – Skill Starter: Mulai Dari Dasar",
      startDate: "2 Mei 2025",
      endDate: "4 Mei 2025",
      price: 350000,
      originalPrice: 500000,
      badge: "FAVORIT",
      image: "/img/Programs_pilih_section_picture9.png",
      tools: [
        "/img/Programs_pilih_section_skill13.png",
        "/img/Programs_pilih_section_skill2.png",
        "/img/Programs_pilih_section_skill5.png",
      ],
    },
  ];

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
              {dummyPrograms.map((program) => (
                <div
                  key={program.id}
                  className="border rounded-xl shadow p-4 flex flex-col bg-white"
                >
                  <div className="relative">
                    <img
                      src={program.image}
                      alt="Ilustrasi Latihan"
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium shadow-sm">
                      {program.level}
                    </span>
                    <div className="absolute bottom-0 left-0 w-full bg-[#1E3A8A] text-white text-xs text-center py-2 font-semibold">
                      {program.badge}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[16px] text-gray-800 mb-3">
                    {program.title}
                  </h3>

                  {/* Tools */}
                  <div className="flex gap-3 mb-3">
                    {program.tools.map((tool, idx) => (
                      <img
                        key={idx}
                        src={tool}
                        alt={`tool-${idx}`}
                        className="w-6 h-6 object-contain"
                      />
                    ))}
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-600 mb-2 gap-2">
                    <span>
                      🗓️ {program.startDate} – {program.endDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="text-gray-400 line-through">
                      {program.originalPrice}
                    </span>
                    <span className="text-green-600 font-bold">
                      {program.price}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-auto flex flex-col gap-2">
                    <button className="bg-[#0CA678] hover:bg-[#099268] text-white text-sm px-4 py-2 rounded-lg w-full">
                      Daftar Sekarang
                    </button>
                    <button className="border border-[#0CA678] hover:bg-[#e6f9f2] text-[#0CA678] text-sm px-4 py-2 rounded-lg w-full">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
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
