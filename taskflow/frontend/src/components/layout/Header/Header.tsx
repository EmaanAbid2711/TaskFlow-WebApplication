import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useNotificationBar } from "@/context/NotificationBarContext";
import NotificationBarDropdown from "./temp"

function Header() {
  const navigate = useNavigate();

  const { unreadCount } = useNotificationBar();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);


  //----------------------------------------------------
  // Close dropdown when clicking outside
  //----------------------------------------------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //----------------------------------------------------
  const avatarUrl = user?.avatar
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
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Welcome back, check your team's latest progress.
        </p>
      </div>

      {/* Right */}
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

        {/* Notification */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((previous) => !previous)}
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100"
          >
            <div className="relative">
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
          </button>

          {open && (
            <NotificationBarDropdown
              closeDropdown={() => setOpen(false)}
            />
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={() => navigate("/settings/profile")}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition hover:ring-2 hover:ring-[#0052cc]/20"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.name ?? "User"}
              className="h-10 w-10 rounded-xl border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052cc] text-sm font-semibold text-white">
              {initials}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;