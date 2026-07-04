import type { ChangeEvent, ReactNode } from "react";

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  icon?: ReactNode;

  value: string;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;

  required?: boolean;

  disabled?: boolean;
};

function Input({
  id,
  type,
  placeholder,
  icon,
  value,
  onChange,
  required = false,
  disabled = false,
}: InputProps) {
  return (
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
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/10 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

export default Input;