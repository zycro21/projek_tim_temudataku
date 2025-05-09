import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '../hooks/useAuth';

const EmailVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { verifyEmail } = useAuth();
  
  // Mengambil token dari URL - format yang benar sesuai dengan API
  const { pathname } = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = pathname.split('/verify-email/')[1] || new URLSearchParams(useLocation().search).get('token');

  // Fungsi untuk memverifikasi email
  const handleVerification = async () => {
    if (!token) {
      setError('Token verifikasi tidak ditemukan');
      toast.error('Token verifikasi tidak ditemukan');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      await verifyEmail(token);
      setIsVerified(true);
      toast.success('Email berhasil diverifikasi!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Verification error:', err);
      const errorMessage = err?.message || 'Token verifikasi tidak valid atau sudah kedaluwarsa';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  // Memverifikasi secara otomatis jika token ada
  useEffect(() => {
    if (token && !isVerified && !isVerifying && !error) {
      handleVerification();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verifikasi Email Anda
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Terima kasih telah mendaftar di Temu Dataku.
        </p>

        {!isVerified && !error && !isVerifying && (
          <>
            <p className="text-gray-600 mb-6 text-center">
              Silakan klik tombol di bawah ini untuk memverifikasi email Anda:
            </p>

            <div className="flex justify-center mb-6">
              <button
                onClick={handleVerification}
                disabled={isVerifying}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Memverifikasi...' : 'Verifikasi Email'}
              </button>
            </div>

            <p className="text-gray-600 mb-4 text-center">
              Atau, Anda dapat menyalin dan menempelkan link berikut di browser Anda:
            </p>

            <div className="mb-6 overflow-x-auto">
              <a
                href={token ? `/verify-email/${token}` : '#'}
                className="text-blue-500 hover:underline text-sm break-all"
              >
                {token
                  ? `http://localhost:5173/verify-email/${token}`
                  : 'Token tidak tersedia'}
              </a>
            </div>

            <p className="text-gray-500 text-sm mb-6 text-center">
              Link ini akan kedaluwarsa dalam 24 jam.
            </p>
          </>
        )}

        {isVerifying && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memverifikasi email Anda...</p>
          </div>
        )}

        {isVerified && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium mb-4">
              Email Anda telah berhasil diverifikasi!
            </p>
            <p className="text-gray-600 mb-6">
              Sekarang Anda dapat login dan mulai menggunakan layanan Temu Dataku.
            </p>
            <a
              href="/"
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
            >
              Login
            </a>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-500 font-medium mb-4">
              Verifikasi Gagal
            </p>
            <p className="text-gray-600 mb-6">{error}</p>
            <p className="text-gray-600 mb-6">
              Silakan coba lagi atau hubungi support jika masalah berlanjut.
            </p>
            <a
              href="/login"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              Kembali ke Login
            </a>
          </div>
        )}

        <p className="text-gray-500 text-sm mt-8 text-center">
          Jika Anda tidak mendaftar di Temu Dataku, silakan abaikan email ini.
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center">
            <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;