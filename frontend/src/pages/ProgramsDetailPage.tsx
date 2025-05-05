import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { dummyPrograms } from "../data/dummyPrograms";
import Footer from "../components/Footer";

export default function ProgramsDetailPage() {
  const { id } = useParams();
  const program = dummyPrograms.find((item) => item.id === Number(id));

  const formatTanggal = (tanggalStr: string) => {
    const tanggal = new Date(tanggalStr);
    return tanggal.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Tambahkan pengecekan jika program tidak ditemukan
  if (!program) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h1 className="text-2xl font-bold">Program tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-6 md:px-20 bg-[#F9FFFB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Ilustrasi / Poster */}
          <div className="flex justify-center">
            <img
              src={program.image}
              alt={program.title}
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Konten Teks */}
          <div>
            <span className="inline-block bg-blue-800 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {program.level}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {program.title}
            </h1>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt...
            </p>

            <div className="flex flex-col gap-2 text-sm text-gray-600 mb-6">
              <div>
                📅{" "}
                <strong>
                  {formatTanggal(program.startDate)} -{" "}
                  {formatTanggal(program.endDate)}
                </strong>
              </div>

              <div>
                💰 Harga:{" "}
                <span className="line-through text-gray-400">
                  {program.originalPrice}
                </span>{" "}
                <span className="text-green-600 font-semibold">
                  {program.price}
                </span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#0CA678] hover:bg-[#08916C] text-white px-6 py-2 rounded-md font-semibold transition">
                Daftar Sekarang
              </button>
              <button className="border border-[#0CA678] text-[#0CA678] hover:bg-[#E6FBF2] px-6 py-2 rounded-md font-semibold transition">
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>

        {/* Background Grafis (jika ada SVG/vector background) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src="/path-to-your/background-graphic.svg"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      </section>

      {/* Programs Description Section */}
      <section className="bg-[#F9FAFB] py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Waktu Belajar */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <img
              src="/img/Programs_detail_description_icon1.png"
              alt="Estimasi waktu"
              className="w-12 h-12"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">12</h2>
              <p className="text-sm text-gray-600">
                Minggu belajar intensif dan seru bersama mentor
              </p>
            </div>
          </div>

          {/* Mentoring */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <img
              src="/img/Programs_detail_description_icon2.png"
              alt="Jumlah alat"
              className="w-12 h-12"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">1 on 1</h2>
              <p className="text-sm text-gray-600">
                Mentoring setiap minggu + sesi review project
              </p>
            </div>
          </div>

          {/* Real Case */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <img
              src="/img/Programs_detail_description_icon3.png"
              alt="Baris data"
              className="w-12 h-12"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">3+</h2>
              <p className="text-sm text-gray-600">
                Real case projects sebagai portofolio yang relevan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Isi Latihan Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Isi Latihannya Apa Aja? Yuk Simak!
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Di latihan ini, kamu akan langsung terjun ke praktik: memahami dasar
            analisis data, mengenal tools yang sering dipakai di industri, dan
            membangun proyek yang bisa kamu tunjukkan ke HR atau klien.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-[250px_1fr] gap-10">
          {/* Sidebar Kiri */}
          <aside className="space-y-4 sticky top-24 self-start">
            <h3 className="text-lg font-semibold text-gray-700">
              Detail Program
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>1. Deskripsi Latihan</li>
              <li>2. Benefit Latihan</li>
              <li>3. Tools yang Digunakan</li>
              <li>4. Dataset Informasi</li>
              <li>5. Challenge yang Akan Diselesaikan</li>
              <li>6. Ekspektasi Keluaran</li>
              <li>7. Estimasi Pengerjaan</li>
              <li>8. Peserta Latihan</li>
              <li>9. Testimoni Alumni</li>
            </ul>

            <button className="w-full bg-[#0CA678] hover:bg-[#08916C] text-white py-2 rounded-md font-semibold">
              Daftar Sekarang
            </button>
          </aside>

          {/* Konten Utama */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  1. Tentang Latihan Ini
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <br />
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Section 2: Benefit */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  2. Apa Aja yang Kamu Dapet melalui Latihan ini?
                </h3>
              </div>

              {/* Grid Benefit */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Benefit Item */}
                <div className="bg-[#F9FAFB] p-4 rounded-lg flex items-start gap-4 shadow-sm">
                  <img
                    src="/img/Practice_isi_latihan_section_icon.png"
                    className="w-10 h-10"
                    alt="Benefit Icon 1"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">
                      Benefit 1
                    </h4>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] p-4 rounded-lg flex items-start gap-4 shadow-sm">
                  <img
                    src="/img/Practice_isi_latihan_section_icon.png"
                    className="w-10 h-10"
                    alt="Benefit Icon 1"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">
                      Benefit 2
                    </h4>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] p-4 rounded-lg flex items-start gap-4 shadow-sm">
                  <img
                    src="/img/Practice_isi_latihan_section_icon.png"
                    className="w-10 h-10"
                    alt="Benefit Icon 1"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">
                      Benefit 3
                    </h4>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] p-4 rounded-lg flex items-start gap-4 shadow-sm">
                  <img
                    src="/img/Practice_isi_latihan_section_icon.png"
                    className="w-10 h-10"
                    alt="Benefit Icon 1"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">
                      Benefit 4
                    </h4>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </p>
                  </div>
                </div>

                {/* Benefit lainnya bisa disalin struktur ini */}
              </div>
            </div>

            {/* Section 3: Peralatan dan Aplikasi Tempur */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  3. Peralatan dan Aplikasi Tempur Selama Latihan
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1">
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ol>
            </div>

            {/* Section 4: Gambaran Dataset */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  4. Gambaran Dataset yang Digunakan di Latihan Ini
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Section 5: Gimana Latihan Ini Berjalan? */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  5. Gimana Latihan Ini Berjalan?
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Task list */}
              <div className="space-y-4">
                {[
                  {
                    title: "Task 1: Data cleaning",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  },
                  {
                    title: "Task 2: Exploratory Data Analysis",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  },
                  {
                    title: "Task 3: Interpret and Visualize Results",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  },
                ].map((task, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow flex items-start gap-4 border border-gray-200"
                  >
                    <img
                      src="/img/Practice_isi_latihan_section_icon.png"
                      alt="task icon"
                      className="w-10 h-10"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600">{task.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Keluaran yang Kamu Capai */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  6. Keluaran yang Kamu Capai di Latihan Ini!
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Output accordion */}
              <div className="space-y-2">
                {[
                  "Tabel Data Bersih Hasil Transformasi",
                  "Dashboard Mini untuk Analisis Sentimen",
                  "Analisis Kebijakan untuk Perusahaan",
                ].map((item, idx) => (
                  <details
                    key={idx}
                    className="bg-white rounded-md border border-gray-200 p-4"
                  >
                    <summary className="cursor-pointer text-sm font-semibold text-gray-800">
                      {item}
                    </summary>
                    <p className="text-sm text-gray-600 mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Section 7: Berapa Lama Waktu yang Dibutuhkan */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  7. Berapa Lama Waktu yang Dibutuhkan untuk Latihan Ini?
                </h3>
              </div>
              <div className="text-sm text-gray-600 space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            {/* Section 8: Latihan Ini Cocok untuk Siapa */}
            <div>
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4 mt-8">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  8. Latihan Ini Cocok untuk Siapa?
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Peserta 1",
                    image: "/img/Practice_isi_latihan_section_peserta1.png",
                  },
                  {
                    name: "Peserta 1",
                    image: "/img/Practice_isi_latihan_section_peserta2.png",
                  },
                  {
                    name: "Peserta 1",
                    image: "/img/Practice_isi_latihan_section_peserta3.png",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 shadow p-4 text-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 mx-auto mb-4 rounded-full"
                    />
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 9: Testimoni */}
            <div className="mt-12">
              <div className="flex items-center gap-2 bg-[#2346A4] text-white px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-bold">▶</span>
                <h3 className="text-lg font-semibold">
                  9. Apa Kata Mereka Setelah Menyelesaikan Latihan?
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-[#F9FAFB] p-6 rounded-xl shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="/img/Mentoring_alumni_section_avatar4.png"
                        alt="John Drake Lane"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          John Drake Lane
                        </p>
                        <p className="text-sm text-gray-500 leading-tight">
                          Alumni Latihan Data Science <br />
                          Mahasiswa Aktif
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua."
                    </p>
                  </div>
                ))}
              </div>

              {/* Dot Indicator (optional carousel effect) */}
              <div className="flex justify-center mt-4 space-x-2">
                <span className="w-2 h-2 bg-[#2346A4] rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latihan Lainnya Section */}
            {/* Latihan Lainnya Section */}
<section className="bg-white py-16 px-8 md:px-[100px]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-[24px] md:text-[32px] font-bold mb-2">
      Latihan Lainnya yang Bisa Kamu Coba
    </h2>
    <p className="text-gray-600 text-sm md:text-base mb-8">
      Masih eksplor? Tenang, TemuDataku punya banyak pilihan latihan
      sesuai kebutuhan dan minat kamu. Cek yang lain, siapa tahu lebih
      cocok!
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {dummyPrograms
        .filter((item) => item.id !== program.id) // Hindari program yang sedang dibuka
        .slice(0, 3)
        .map((programItem) => (
          <div
            key={programItem.id}
            className="bg-white border border-gray-200 rounded-xl shadow p-4"
          >
            <div className="relative">
              <img
                src={programItem.image}
                alt={programItem.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <span className="absolute top-3 right-3 bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium shadow-sm">
                {programItem.level}
              </span>
              <div className="absolute bottom-0 left-0 w-full bg-[#1E3A8A] text-white text-xs text-center py-2 font-semibold rounded-b-md">
                {programItem.badge}
              </div>
            </div>

            <h3 className="font-bold text-[16px] text-gray-800 mb-2">
              {programItem.title}
            </h3>

            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>📅 {programItem.startDate} - {programItem.endDate}</li>
              <li>🛠️ Tools: {programItem.tools.length} digunakan</li>
            </ul>

            <div className="text-sm text-gray-800 mb-4">
              {programItem.originalPrice && (
                <span className="line-through text-gray-400 mr-2">
                  Rp {programItem.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[#0CA678] font-semibold">
                Rp {programItem.price.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button className="bg-[#0CA678] text-white text-sm py-2 px-4 rounded hover:bg-[#099268] transition">
                Mulai Latihan
              </button>
              <a
                href={`/programs/${programItem.id}`}
                className="border border-[#0CA678] text-[#0CA678] text-sm py-2 px-4 rounded hover:bg-[#e6f9f2] transition text-center"
              >
                Lihat Detail
              </a>
            </div>
          </div>
        ))}
    </div>

    <div className="flex justify-center mt-6 space-x-2">
      <span className="w-2 h-2 bg-[#2346A4] rounded-full"></span>
      <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
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

      <Footer />
    </>
  );
}
