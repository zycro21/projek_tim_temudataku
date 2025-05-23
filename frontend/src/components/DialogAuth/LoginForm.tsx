// frontend/src/components/DialogAuth/LoginForm.tsx
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleLogin: () => Promise<void>;
  isLoading: boolean;
  onSwitchType: () => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
  handleLogin,
  isLoading,
  onSwitchType
}: LoginFormProps) => {
  return (
    <>
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

      {/* Action Button */}
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full h-10 md:h-12 bg-[#0CAF6F] text-white font-medium rounded-md hover:bg-[#099660] transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 md:mt-4"
      >
        {isLoading ? "Loading..." : "Masuk"}
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
          Belum Punya Akun?{" "}
        </span>
        <button 
          onClick={onSwitchType}
          className="text-[#0CAF6F] text-xs md:text-sm font-semibold ml-1"
        >
          Daftar
        </button>
      </div>
    </>
  );
};

export default LoginForm;