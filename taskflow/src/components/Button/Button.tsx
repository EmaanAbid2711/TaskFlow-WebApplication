import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  loading?: boolean;
};

function Button({
  children,
  type = "button",
  onClick,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0052cc] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0043b8] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Signing In..." : children}

      {!loading && <ArrowRight size={18} />}
    </button>
  );
}

export default Button;