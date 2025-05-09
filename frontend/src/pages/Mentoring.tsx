// src/pages/Mentoring.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Mentoring() {
  const alumni = [
    {
      name: "John Drake Lane",
      status: "Alumni Group Mentoring - Mahasiswa Aktif",
      img: "/img/Mentoring_alumni_section_picture1.png",
      avatar: "/img/Mentoring_alumni_section_avatar1.png",
      testimonial:
        "Belajar bareng mentor bikin perjalanan data gak kerasa sendirian!",
    },
    {
      name: "Jane Doe",
      status: "Alumni Group Mentoring - Mahasiswa Aktif",
      img: "/img/Mentoring_alumni_section_picture2.png",
      avatar: "/img/Mentoring_alumni_section_avatar2.png",
      testimonial: "Mentoring di TemuDataku bikin aku makin pede sama skillku!",
    },
    {
      name: "Mario Bros",
      status: "Alumni Group Mentoring - Mahasiswa Aktif",
      img: "/img/Mentoring_alumni_section_picture3.png",
      avatar: "/img/Mentoring_alumni_section_avatar3.png",
      testimonial: "Sangat membantu untuk persiapan masuk dunia kerja!",
    },
    {
      name: "Lusiana Gomes",
      status: "Alumni Group Mentoring - Mahasiswa Aktif",
      img: "/img/Mentoring_alumni_section_picture4.png",
      avatar: "/img/Mentoring_alumni_section_avatar4.png",
      testimonial:
        "Aku jadi lebih ngerti konsep data science dengan mentor di sini.",
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Bimbingan Langsung dari Praktisi Data
              </h1>
              <p className="text-lg text-blue-600 font-semibold mb-2">
                #MentoringBiarNggakError
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Belajar data tuh gak harus sendirian. Di TemuDataku, kamu bisa
                dapat insight langsung dari praktisi yang udah terjun di dunia
                data analyst, machine-learning, dan AI industry.
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

        {/* Pilihan Mentoring Section */}
        <section
          className="bg-white py-20 px-6 md:px-16"
          id="pilihan-mentoring"
        >
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Pilih Gaya Belajar Sesuai Vibenya Kamu!
              </h2>
              <p className="text-gray-600 text-base mx-10">
                Mau belajar bareng mentor secara intensif atau fleksibel sesuai
                waktu kamu? TemuDataku punya beberapa pilihan mentoring yang
                bisa disesuaikan sama kebutuhan dan ritme belajar kamu. Yuk,
                pilih yang paling cocok buat kamu!
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 - Mentoring 1 on 1 */}
              <div className="border rounded-xl overflow-hidden shadow-sm">
                <div className="relative">
                  <img
                    src="/img/Mentoring_gaya_belajar_section_picture1.png"
                    alt="Mentoring 1 on 1"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-blue-700 text-white text-xs font-semibold px-4 py-1">
                    BEST SESSION
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-semibold">Mentoring 1 on 1</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 line-through text-sm">
                      Rp 45.000
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      Rp 40.000
                    </span>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>✅ Mentoring 45 menit</li>
                    <li>✅ Tanya apapun permasalahan di bidang data</li>
                    <li>✅ Rekaman sesi mentoring</li>
                    <li>✅ Garansi kepuasan*</li>
                    <li>✅ Dapatkan akses ke praktik data science**</li>
                  </ul>
                  <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
                    Ikuti Sesi
                  </button>
                </div>
              </div>

              {/* Card 2 - Mentoring Group */}
              <div className="border rounded-xl overflow-hidden shadow-sm">
                <div className="relative">
                  <img
                    src="/img/Mentoring_gaya_belajar_section_picture2.png"
                    alt="Mentoring Group"
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-semibold">Mentoring Group</h3>
                  <div className="text-lg font-bold text-green-600">
                    Rp 70.000
                  </div>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>✅ Mentoring 90 menit</li>
                    <li>
                      ✅ Tanya apapun permasalahan dalam bidang data science
                    </li>
                    <li>✅ Rekaman sesi mentoring</li>
                    <li>✅ Garansi kepuasan*</li>
                    <li>✅ Dapatkan akses ke praktik data science**</li>
                  </ul>
                  <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
                    Ikuti Sesi
                  </button>
                </div>
              </div>
            </div>

            {/* Catatan bawah */}
            <p className="text-xs text-gray-500 mt-8">
              * Garansi kepuasan bisa didapatkan jika peserta tidak puas dan
              mengisi form untuk melakukan klaim garansi serta memberikan bukti
              valid. <br />
              ** Untuk peserta yang pertama kali mengikuti mentoring akan
              mendapatkan akses ke praktik data science.
            </p>
          </div>
        </section>

        {/* Portofolio Section */}
        <section className="bg-gray-50 py-20 px-6 md:px-16" id="portofolio">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Project Sejauh Ini, Keren Nggak Sih?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Di sini kamu bisa lihat hasil karya alumni TemuDataku selama
                ikut mentoring. Bukan cuma latihan, tapi project beneran yang
                nunjukin skill mereka di dunia data. Yuk intip, siapa tahu bisa
                jadi inspirasi kamu juga!
              </p>
            </div>

            {/* Project Cards */}
            <div className="flex flex-col gap-12">
              {/* Project Card 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <img
                  src="/img/Mentoring_portofolio_section_picture1.png"
                  alt="Project 1"
                  className="w-full h-64 object-cover rounded-xl shadow"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Hubungan Positif antara Angka Stunting dan Faktor Provinsi
                    Papua Barat Indonesia
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Project ini menganalisis hubungan angka stunting dengan
                    faktor ekonomi di Papua Barat, dan menemukan korelasi
                    positif di antara keduanya.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    👥 <span className="font-semibold">John Drake Lane</span>,{" "}
                    <span className="font-semibold">Mario Bros</span>,{" "}
                    <span className="font-semibold">Lusiana Gomes</span>
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Jelajahi Proyek
                  </button>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Gambar kanan di project kedua */}
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold mb-2">
                    Hubungan Positif antara Angka Stunting dan Faktor Provinsi
                    Papua Barat Indonesia
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Project ini menganalisis hubungan angka stunting dengan
                    faktor ekonomi di Papua Barat, dan menemukan korelasi
                    positif di antara keduanya.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    👥 <span className="font-semibold">John Drake Lane</span>,{" "}
                    <span className="font-semibold">Mario Bros</span>,{" "}
                    <span className="font-semibold">Lusiana Gomes</span>
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Jelajahi Proyek
                  </button>
                </div>
                <img
                  src="/img/Mentoring_portofolio_section_picture2.png"
                  alt="Project 2"
                  className="w-full h-64 object-cover rounded-xl shadow order-1 md:order-2"
                />
              </div>
            </div>

            {/* Button Lihat Lebih Banyak */}
            <div className="text-center mt-16">
              <button className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-3 px-6 rounded-lg transition">
                Lihat Lebih Banyak
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
                {alumni.map((item, idx) => (
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