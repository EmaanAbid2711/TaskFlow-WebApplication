import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

function PasswordInput({
  label,
  id,
  placeholder,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;