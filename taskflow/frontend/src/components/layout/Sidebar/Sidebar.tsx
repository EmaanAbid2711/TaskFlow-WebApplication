import {LayoutDashboard, FolderKanban, Users, Activity, Settings, HelpCircle, LogOut, Plus, X} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../../common/Logo/Logo";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const goTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Dark Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex w-[240px] flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          overflow-y-auto

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:sticky
          lg:top-0
          lg:h-screen
          lg:translate-x-0
          lg:flex-shrink-0
        `}
      >
        {/* TOP */}
        <div className="p-6">

          {/* Mobile Close */}
          <div className="mb-4 flex justify-end lg:hidden">
            <button onClick={onClose}>
              <X size={22} />
            </button>
          </div>
          <Logo />
          <nav className="mt-8 space-y-1">

            <button
              onClick={() => goTo("/dashboard")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition
                ${
                  location.pathname === "/dashboard"
                    ? "bg-[#0052cc] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => goTo("/projects")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition
                ${
                  location.pathname === "/projects"
                    ? "bg-[#0052cc] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <FolderKanban size={18} />
              Projects
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-slate-600 transition hover:bg-slate-100">
              <Users size={18} />
              Team
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-slate-600 transition hover:bg-slate-100">
              <Activity size={18} />
              Activity
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-slate-600 transition hover:bg-slate-100">
              <Settings size={18} />
              Settings
            </button>

          </nav>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] py-3 text-sm font-medium text-white transition hover:bg-[#0043a4]">
            <Plus size={18} />
            New Project
          </button>
        </div>

        <div className="mt-auto border-t border-slate-200 p-4">

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
            <HelpCircle size={18} />
            Help
          </button>

          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;