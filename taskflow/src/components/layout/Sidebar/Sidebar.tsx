import { LayoutDashboard, FolderKanban, Users, Activity, Settings, HelpCircle, LogOut, Plus} from "lucide-react";

import Logo from "../../common/Logo/Logo";

function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white lg:flex">
      <div className="p-6">
        <Logo />
        <nav className="mt-8 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg bg-[#0052cc] px-3 py-3 text-sm font-medium text-white">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
            <FolderKanban size={18} />
            Projects
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
            <Users size={18} />
            Team
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
            <Activity size={18} />
            Activity
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
            <Settings size={18} />
            Settings
          </button>
        </nav>

        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] py-3 text-sm font-medium text-white transition hover:bg-[#0043a4]">
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          <HelpCircle size={18} />
          Help
        </button>

        <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;