// frontend/src/components/DialogAuth/FormField.tsx
import React from "react";
import { FormFieldProps } from "./types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PasswordFieldProps extends FormFieldProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  icon,
  error,
  errorMessage,
}) => {
  return (
    <div className="mb-4 md:mb-6">
      <label
        htmlFor={id}
        className="block text-[#0E1115] font-medium mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src={icon}
              alt={label}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </div>
        )}
        <input
          type={type}
          id={id}
          className={`w-full h-12 md:h-14 ${icon ? 'pl-10' : 'pl-3'} border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F] ${
            error ? "border-red-500" : "border-[#E0E0E0]"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && errorMessage && (
        <p className="text-red-500 text-xs md:text-sm font-normal mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  icon,
  error,
  errorMessage,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <div className="mb-4 md:mb-6">
      <label
        htmlFor={id}
        className="block text-[#0E1115] font-medium mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src={icon}
              alt={label}
              className="w-5 h-5 md:w-5 md:h-6"
            />
          </div>
        )}
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className={`w-full h-12 md:h-14 ${icon ? 'pl-10' : 'pl-3'} border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CAF6F] ${
            error ? "border-red-500" : "border-[#E0E0E0]"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
      {error && errorMessage && (
        <p className="text-red-500 text-xs md:text-sm font-normal mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};