import { type ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  loadingText?: string;
}

function Button({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
  loadingText = "Please wait...",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0052CC] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0043B8] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}

export default Button;