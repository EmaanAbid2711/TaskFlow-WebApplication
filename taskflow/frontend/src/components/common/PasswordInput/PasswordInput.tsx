import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = {
  id: string;
  placeholder: string;

  value: string;

  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  required?: boolean;

  disabled?: boolean;
};

function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <Lock
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;