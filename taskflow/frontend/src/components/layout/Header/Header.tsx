import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useNotificationBar } from "@/context/NotificationBarContext";

import NotificationBarDropdown from "./NotifyBarDropdown";
import SearchDropdown from "./SearchDropdown";

import { useSearch } from "@/context/SearchContext";

function Header() {
  const navigate = useNavigate();

  const { unreadCount } = useNotificationBar();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { search } = useSearch();
  const [searchText, setSearchText] = useState("");

  const searchResults = search(searchText);

  const openSearchResult = (item: any) => {
    navigate(item.route);
    setSearchText("");
  };

  //----------------------------------------------------
  // Close notification dropdown when clicking outside
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
  // Avatar
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

  //----------------------------------------------------
  // Render
  //----------------------------------------------------

  return (
    <header
      className="
        relative
        flex
        min-h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-4
        sm:px-6
        md:px-8
      "
    >
      {/* Left */}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-slate-900 sm:text-2xl">
          Dashboard Overview
        </h1>

        <p className="mt-1 hidden text-xs text-slate-500 sm:block sm:text-sm">
          Welcome back, check your team's latest progress.
        </p>
      </div>

      {/* Right */}
      <div className="ml-4 flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="
              w-64
              rounded-xl
              bg-slate-100
              py-2
              pl-10
              pr-4
              text-sm
              outline-none
              focus:ring-2
              focus:ring-[#0052cc]/20
            "
          />

          {searchText && (
            <SearchDropdown
              results={searchResults}
              onSelect={openSearchResult}
            />
          )}
        </div>

        {/* Notification */}
        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label="Notifications"
            aria-expanded={open}
            className="
              relative
              rounded-xl
              border
              border-slate-200
              p-2
              transition
              hover:bg-slate-100
            "
          >
            <div className="relative">
              <Bell size={22} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
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
          type="button"
          onClick={() => navigate("/settings/profile")}
          aria-label="Open profile"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-full
            transition
            hover:ring-2
            hover:ring-[#0052cc]/20
            sm:h-10
            sm:w-10
          "
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.name ?? "User"}
              className="
                h-9
                w-9
                rounded-xl
                border
                border-slate-200
                object-cover
                sm:h-10
                sm:w-10
              "
            />
          ) : (
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#0052cc]
                text-sm
                font-semibold
                text-white
                sm:h-10
                sm:w-10
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