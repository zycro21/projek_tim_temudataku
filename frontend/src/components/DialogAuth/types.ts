// frontend/src/components/DialogAuth/types.ts
export interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  error?: boolean;
  errorMessage?: string;
}

