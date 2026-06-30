import { type ReactNode } from "react";

type InputProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  icon?: ReactNode;
};

function Input({
  label,
  id,
  type,
  placeholder,
  icon,
}: InputProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10"
        />
      </div>
    </div>
  );
}

export default Input;