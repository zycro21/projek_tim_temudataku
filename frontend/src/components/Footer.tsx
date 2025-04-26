export default function Footer() {
  return (
    <footer className="bg-[#122b5c] text-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 font-['Inter']">
        {/* Kolom 1: Logo & Deskripsi */}
        <div className="pr-0 md:pr-8">
          <div className="mb-4 flex items-center gap-2">
            <img
              src="/img/Footer_logo.png"
              alt="TemuDataku Logo"
              className="w-[100px] sm:w-[126px] h-auto"
            />
          </div>
          <p className="text-sm leading-relaxed mb-4 max-w-[300px]">
            TemuDataku adalah platform mentoring data science terpersonalisasi
            yang menghubungkan Anda dengan mentor berpengalaman untuk
            mempercepat perjalanan belajar Anda.
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/Footer_icon1.png"
                alt="WhatsApp"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </a>
            <a
              href="https://instagram.com/temudataku"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/Footer_icon2.png"
                alt="Instagram"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </a>
            <a
              href="https://linkedin.com/company/temudataku"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/Footer_icon3.png"
                alt="LinkedIn"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </a>
          </div>
        </div>

        {/* Kolom 2: Navigasi TemuDataku */}
        <div className="md:pl-4">
          <h4 className="font-semibold mb-3 text-base sm:text-lg md:text-[24px]">
            TemuDataku
          </h4>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Bootcamp
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mentoring
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Praktik
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Hubungi Kami */}
        <div className="md:pl-2">
          <h4 className="font-semibold mb-3 text-base sm:text-lg md:text-[24px]">
            Hubungi Kami
          </h4>
          <ul className="text-sm space-y-2">
            <li>Kelurahan Karangbesuki,</li>
            <li>Kecamatan Sukun, Kota Malang</li>
            <li>081234567890</li>
            <li>temudataku@gmail.com</li>
          </ul>
        </div>

        {/* Kolom 4: Bantuan */}
        <div className="md:pl-6">
          <h4 className="font-semibold mb-3 text-base sm:text-lg md:text-[24px]">
            Bantuan
          </h4>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Syarat & Ketentuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="col-span-full text-left text-sm mt-8">
          &copy; 2025 TemuDataku. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
