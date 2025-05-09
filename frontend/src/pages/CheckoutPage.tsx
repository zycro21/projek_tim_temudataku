import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  return (
    <>
    <Navbar/>
      <div className="min-h-screen px-4 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Kiri: Informasi Pemesanan */}
          <div className="md:col-span-7">
            <h2 className="text-xl font-semibold mb-4">Informasi Pemesanan</h2>

            {/* Formulir Input */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full border rounded px-3 py-2 text-sm">
                  <option>Kota</option>
                  <option>Kediri</option>
                </select>
                <select className="w-full border rounded px-3 py-2 text-sm">
                  <option>Provinsi</option>
                  <option>Jawa Timur</option>
                </select>
              </div>
              <input
                type="tel"
                placeholder="No. Telepon"
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Topik"
                rows={3}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Dokumen Pendukung */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="border p-3 rounded">
                <p className="font-medium">SellingHistory.csv</p>
                <a href="#" className="text-blue-600 text-xs">
                  Click to view
                </a>
              </div>
              <div className="border p-3 rounded">
                <p className="font-medium">Panduan.pdf</p>
                <a href="#" className="text-blue-600 text-xs">
                  Click to view
                </a>
              </div>
            </div>

            {/* Syarat dan Ketentuan */}
            <div className="mt-8">
              <h3 className="font-semibold text-base mb-2">
                Syarat dan Ketentuan
              </h3>
              <div className="flex items-center gap-2 border border-blue-400 p-2 rounded-lg mb-4">
                <input
                  type="text"
                  placeholder="Kode Kupon"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <button className="bg-green-500 text-white px-4 py-1.5 rounded text-sm">
                  Gunakan Kupon
                </button>
              </div>
              <div className="h-28 overflow-y-auto border border-gray-300 p-3 rounded text-sm text-gray-700 space-y-2">
                <p>
                  1. Pembayaran yang telah dilakukan tidak dapat dikembalikan
                  dengan alasan apapun...
                </p>
                <p>
                  2. Materi mentoring hanya boleh digunakan untuk kepentingan
                  pribadi...
                </p>
                <p>
                  3. Dilarang keras merekam, mendistribusikan, atau
                  mempublikasikan materi tanpa izin resmi.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id="agree"
                  className="accent-green-500"
                />
                <label htmlFor="agree">
                  Saya setuju dengan ketentuan dan syarat
                </label>
              </div>
            </div>
          </div>

          {/* Kanan: Ringkasan & Pembayaran */}
          <div className="md:col-span-5">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Pemesanannya</h3>
              {/* Ringkasan Pesanan */}
              <div className="mb-6">
                <p className="font-medium">Mentoring 1 on 1</p>
                <p className="text-sm text-gray-600">Rp 49.000</p>
              </div>

              <div className="border-t pt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rp 49.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Diskon:</span>
                  <span>Rp 0</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>Rp 49.000</span>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="mt-6 space-y-2 text-sm">
                <p className="font-medium mb-2">Pembayaran</p>
                {[
                  "ATM Bersama",
                  "DuItku BNI",
                  "DuItku Mandiri",
                  "ShopeePay",
                  "BRI",
                  "BSI",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <input type="radio" name="payment" />
                    <label>{`Pembayaran DuItku ${item}`}</label>
                  </div>
                ))}
              </div>

              {/* Tombol Pesan */}
              <button className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CheckoutPage;
