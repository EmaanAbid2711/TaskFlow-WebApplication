import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 md:px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500">
          Welcome back, check your team's latest progress.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Search..."
            className="w-64 rounded-xl bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0052cc]/20"
          />
        </div>

        <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100">
          <Bell size={18} />
        </button>

        <img
          src="https://i.pravatar.cc/100"
          alt="User"
          className="h-10 w-10 rounded-xl"
        />
      </div>
    </header>
  );
}

export default Header;