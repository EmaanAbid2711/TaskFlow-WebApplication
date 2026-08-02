import { useState } from "react";
import {LayoutDashboard, FolderKanban, Users, Activity, Settings, HelpCircle, LogOut, Plus, X, User, Bell, CreditCard, ChevronDown, ChevronRight} from "lucide-react";
import {useNavigate, useLocation} from "react-router-dom";

import Logo from "../../common/Logo/Logo";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const location = useLocation();

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  const goTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
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
            {/* Dashboard */}
            <button
              onClick={() =>
                goTo("/dashboard")
              }
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition
                ${
                  location.pathname ===
                  "/dashboard"
                    ? "bg-[#0052cc] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            {/* Projects */}
            <button
              onClick={() =>
                goTo("/projects")
              }
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition
                ${
                  location.pathname ===
                  "/projects"
                    ? "bg-[#0052cc] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <FolderKanban size={18} />
              Projects
            </button>

            {/* Team */}
            <button
              onClick={() => goTo("/team")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition
                ${
                  location.pathname.startsWith("/team")
                    ? "bg-[#0052cc] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Users size={18} />
              Team
            </button>

            {/* Activity */}
            <button
              onClick={() => goTo("/activity")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition
                ${
                  location.pathname === "/activity"
                    ? "bg-[#0052cc] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Activity size={18} />
              Activity
            </button>

            {/* Settings Dropdown */}
            <div>
              <button
                onClick={() =>
                  setSettingsOpen(
                    !settingsOpen
                  )
                }
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-slate-600 transition hover:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <Settings size={18} />
                  Settings
                </div>

                {settingsOpen ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight
                    size={18}
                  />
                )}
              </button>

              {settingsOpen && (
                <div className="mt-1 ml-4 space-y-1 border-l border-slate-200 pl-4">
                  {/* Profile */}
                  <button
                    onClick={() =>
                      goTo(
                        "/settings/profile"
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                      ${
                        location.pathname ===
                        "/settings/profile"
                          ? "bg-[#0052cc] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    <User size={16} />
                    Profile
                  </button>

                  {/* Account */}
                  <button
                    onClick={() =>
                      goTo(
                        "/settings/account"
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                      ${
                        location.pathname ===
                        "/settings/account"
                          ? "bg-[#0052cc] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    <Users size={16} />
                    Account
                  </button>

                  {/* Notifications */}
                  <button
                    onClick={() =>
                      goTo(
                        "/settings/notifications"
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                      ${
                        location.pathname ===
                        "/settings/notifications"
                          ? "bg-[#0052cc] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    <Bell size={16} />
                    Notifications
                  </button>

                  {/* Billing */}
                  <button
                    onClick={() =>
                      goTo(
                        "/settings/billing"
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                      ${
                        location.pathname ===
                        "/settings/billing"
                          ? "bg-[#0052cc] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    <CreditCard
                      size={16}
                    />
                    Billing
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* New Project */}
          <button
            onClick={() => {
              navigate("/projects?new=true");
              onClose();
            }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] py-3 text-sm font-medium text-white transition hover:bg-[#0043a4]"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>

        {/* Bottom */}
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