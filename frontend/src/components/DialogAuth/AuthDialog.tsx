// frontend/src/components/DialogAuth/AuthDialog.tsx
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { LoginData, RegisterData } from "../../service/authService";
import { useNavigate } from "react-router-dom";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "register";
  onSwitchType: () => void;
}

export default function AuthDialog({ isOpen, onClose, type, onSwitchType }: AuthDialogProps) {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const navigate = useNavigate();
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  // Auth hook
  const { login, register, isLoading, error, clearError } = useAuth();

  // Memantau perubahan error untuk menampilkan toast
  useEffect(() => {
    if (error) {
      // Konversi pesan error ke toast
      if (error.toLowerCase().includes("invalid email") || 
          error.toLowerCase().includes("invalid password") ||
          error.toLowerCase().includes("invalid credentials")) {
        toast.error("Email atau kata sandi salah", {
          description: "Silakan periksa kembali data login Anda"
        });
      } else {
        toast.error("Terjadi kesalahan", {
          description: error
        });
      }
    }
  }, [error]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    clearError();
    
    // Validasi dasar
    if (!email.trim() || !password.trim()) {
      toast.error("Email dan kata sandi harus diisi");
      return;
    }

    const loginData: LoginData = { email, password };
    
    try {
      await login(loginData);
      
      // Jika tidak ada error setelah login (cek di useEffect berikutnya)
      if (!error) {
        toast.success("Login berhasil!", {
          description: "Selamat datang kembali di TemuDataku"
        });
        resetForm();
        onClose();
        navigate("/dashboard");
      }
    } catch (err) {
      // Error tambahan yang mungkin tidak tertangkap oleh useAuth
      console.error("Login error:", err);
    }
  };

  const handleRegister = async () => {
    clearError();
    
    // Validasi dasar
    if (!email.trim() || !password.trim() || !fullName.trim()) {
      toast.error("Mohon lengkapi semua data yang diperlukan");
      return;
    }
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError(true);
      toast.error("Kata sandi tidak cocok");
      return;
    }
    
    setPasswordError(false);
    
    const registerData: RegisterData = {
      email,
      password,
      confirmPassword,
      full_name: fullName,
      phone_number: phoneNumber || "08xxxxxxxxxx", // Nilai default jika kosong
      city: city || "Default City", // Nilai default jika kosong
      province: province || "Default Province" // Nilai default jika kosong
    };
    
    try {
      await register(registerData);
      
      // Jika tidak ada error setelah registrasi (cek di useEffect berikutnya)
      if (!error) {
        toast.success("Pendaftaran berhasil!", {
          description: "Silakan cek email Anda untuk verifikasi akun"
        });
        resetForm();
        onClose();
      }
    } catch (err) {
      // Error tambahan yang mungkin tidak tertangkap oleh useAuth
      console.error("Register error:", err);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setPhoneNumber("");
    setCity("");
    setProvince("");
    setPasswordError(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className="bg-white w-full max-w-5xl rounded-2xl relative flex flex-col lg:flex-row overflow-hidden max-h-[90vh] lg:max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center z-10"
        >
          <img src="/img/Auth/ic_x.png" alt="Close" className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 p-4 md:p-8">
          <img
            src="/img/Auth/img_bg_auth.png"
            alt="Authentication"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Header - Centered */}
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-[#0E1115] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
              {type === "register" ? "Buat Akun" : "Masuk"}
            </h1>
            <p className="text-[#737373] text-sm md:text-base lg:text-lg font-normal mt-2">
              Lorem ipsum is simply like this
            </p>
          </div>

          {/* Error Message - Hidden because now we use toast */}
          {/* error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
              {error}
            </div>
          ) */}

          {/* Form */}
          <div className="flex flex-col">
            {/* Email Field */}
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="email"
                className="block text-[#0E1115] font-medium mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    src="/img/Auth/ic_email.png"
                    alt="Email"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full h-12 md:h-14 pl-10 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F]"
                  placeholder="loremipsum@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Full Name - Only for Register */}
            {type === "register" && (
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="fullName"
                  className="block text-[#0E1115] font-medium mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full h-12 md:h-14 pl-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F]"
                  placeholder="Nama Lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            {/* Phone Number - Only for Register */}
            {type === "register" && (
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-[#0E1115] font-medium mb-2"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full h-12 md:h-14 pl-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F]"
                  placeholder="08xxxxxxxxxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}

            {/* City and Province in a grid for larger screens */}
            {type === "register" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-[#0E1115] font-medium mb-2"
                  >
                    Kota
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full h-12 md:h-14 pl-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F]"
                    placeholder="Kota"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="block text-[#0E1115] font-medium mb-2"
                  >
                    Provinsi
                  </label>
                  <input
                    type="text"
                    id="province"
                    className="w-full h-12 md:h-14 pl-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F]"
                    placeholder="Provinsi"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-[#0E1115] font-medium mb-2"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    src="/img/Auth/ic_lock.png"
                    alt="Password"
                    className="w-5 h-5 md:w-5 md:h-6"
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full h-12 md:h-14 pl-10 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F]"
                  placeholder="1LoremIpsum"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-[#A1A1A1]" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-[#A1A1A1]" />
                  )}
                </button>
              </div>
              <p className="text-[#737373] text-xs md:text-sm font-normal mt-1">
                Gunakan kombinasi angka, huruf besar, dan huruf kecil
              </p>
            </div>

            {/* Confirm Password Field - Only show for registration */}
            {type === "register" && (
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-[#0E1115] font-medium mb-2"
                >
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      src="/img/Auth/ic_lock.png"
                      alt="Password"
                      className="w-5 h-5 md:w-5 md:h-6"
                    />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className={`w-full h-12 md:h-14 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F] ${
                      passwordError
                        ? "border-red-500"
                        : "border-[#E0E0E0]"
                    }`}
                    placeholder="1LoremIpsum"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-[#A1A1A1]" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-[#A1A1A1]" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs md:text-sm font-normal mt-1">
                    Kata sandi tidak cocok
                  </p>
                )}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={type === "register" ? handleRegister : handleLogin}
              disabled={isLoading}
              className="w-full h-10 md:h-12 bg-[#0CAF6F] text-white font-medium rounded-md hover:bg-[#099660] transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 md:mt-4"
            >
              {isLoading
                ? "Loading..."
                : type === "register"
                ? "Daftar"
                : "Masuk"}
            </button>

            {/* Or Divider */}
            <div className="flex items-center justify-center my-4 md:my-6">
              <span className="text-[#737373] text-xs md:text-sm font-normal">
                atau
              </span>
            </div>

            {/* Google Login Button */}
            <button 
              className="w-full h-10 md:h-12 border border-[#0CAF6F] rounded-md flex items-center justify-center text-[#0CAF6F] font-medium transition hover:bg-[#f0f9f5]"
              onClick={() => toast.info("Login dengan Google akan segera tersedia")}
            >
              <img
                src="/img/Auth/ic_google.png"
                alt="Google"
                className="w-5 h-5 md:w-6 md:h-6 mr-2"
              />
              Gunakan Akun Google
            </button>

            {/* Switch between Login/Register */}
            <div className="flex justify-center mt-4 md:mt-6">
              <span className="text-[#737373] text-xs md:text-sm font-normal">
                {type === "register" ? "Sudah Punya Akun?" : "Belum Punya Akun?"}{" "}
              </span>
              <button 
                onClick={onSwitchType}
                className="text-[#0CAF6F] text-xs md:text-sm font-semibold ml-1"
              >
                {type === "register" ? "Masuk" : "Daftar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}