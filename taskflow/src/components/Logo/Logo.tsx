import { ShieldCheck } from "lucide-react";

function Logo() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-sm">
        <ShieldCheck size={24} />
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
        TaskFlow
      </h1>

      <p className="text-sm text-slate-500">
        Precision engineering for high-performance teams.
      </p>
    </div>
  );
}

export default Logo;