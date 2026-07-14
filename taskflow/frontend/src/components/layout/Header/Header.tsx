import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const avatarUrl =
    user?.avatar
      ? `${import.meta.env.VITE_API_URL}${user.avatar}`
      : null;

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

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
        {/* Search */}
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

        {/* Notifications */}
        <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100">
          <Bell size={18} />
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() =>
            navigate("/settings/profile")
          }
          className="transition hover:scale-105"
          title="Profile"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.name ?? "User"}
              className="h-10 w-10 rounded-xl border border-slate-200 object-cover"
            />
          ) : (
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#0052cc]
                text-sm
                font-semibold
                text-white
              "
            >
              {initials}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;