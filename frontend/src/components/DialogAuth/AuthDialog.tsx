// frontend/src/components/DialogAuth/AuthDialog.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { LoginData, RegisterData } from "../../service/authService";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
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
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  // Navigation
  const navigate = useNavigate();
  
  // Auth hook
  const { login, register, isLoading, error, clearError, user } = useAuth();

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

  // Memantau perubahan user untuk navigasi berdasarkan role
  useEffect(() => {
    if (user && type === "login") {
      // Cek role user (case insensitive)
      const userRoles = user.roles?.map(role => role.toUpperCase()) || [];
      
      // Menentukan navigasi berdasarkan role
      if (userRoles.includes("ADMIN")) {
        // Navigasi ke dashboard admin
        navigate("/dashboard-admin");
      } else if (userRoles.includes("MENTOR")) {
        // Navigasi ke dashboard mentor
        navigate("/dashboard-mentor");
      } else {
        // Navigasi ke dashboard mentee (default untuk regular user)
        navigate("/dashboard");
      }
    }
  }, [user, navigate, type]);

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
        
        // Navigasi berdasarkan role akan ditangani oleh useEffect
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
        <div 
          className="w-full lg:w-1/2 px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 flex flex-col overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#C4C4C4FF #f1f1f1'
          }}
        >
          {/* Header - Centered */}
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-[#0E1115] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
              {type === "register" ? "Buat Akun" : "Masuk"}
            </h1>
            <p className="text-[#737373] text-sm md:text-base lg:text-lg font-normal mt-2">
              Lorem ipsum is simply like this
            </p>
          </div>

          {/* Form Components */}
          <div className="flex flex-col">
            {type === "login" ? (
              <LoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                handleLogin={handleLogin}
                isLoading={isLoading}
                onSwitchType={onSwitchType}
              />
            ) : (
              <RegisterForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                fullName={fullName}
                setFullName={setFullName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                city={city}
                setCity={setCity}
                province={province}
                setProvince={setProvince}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                showConfirmPassword={showConfirmPassword}
                toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                passwordError={passwordError}
                handleRegister={handleRegister}
                isLoading={isLoading}
                onSwitchType={onSwitchType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}