import { Folder, Search } from "lucide-react";

function ProjectHeader() {
  return (
    <>
      {/* Top Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

        {/* Search */}
        <div className="relative w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full rounded-full border border-slate-200 bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0052cc] focus:bg-white"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-[#0052cc] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0043a4]">
            Get Started
          </button>

          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="User"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>

      </header>

      {/* Project Header */}
      <section className="bg-white px-8 pt-6">

        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
          <Folder size={14} />
          <span>Engineering</span>
          <span>/</span>
          <span>TaskFlow</span>
        </div>

        {/* Title + Stats */}
        <div className="mb-6 flex items-center justify-between">

          <h1 className="text-[28px] font-bold text-slate-900">
            Redesign System Architecture
          </h1>

          <div className="flex items-center gap-10">

            {/* Progress */}
            <div className="text-right">

              <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Progress
              </p>

              <div className="flex items-center gap-3">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-3/4 rounded-full bg-[#0052cc]" />
                </div>
                <span className="text-sm font-bold">
                  75%
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="border-l border-slate-200 pl-8 text-right">

              <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Tasks
              </p>

              <p className="text-lg font-bold text-slate-900">
                24
                <span className="text-sm font-normal text-slate-400">
                  {" "}
                  / 32
                </span>
              </p>

            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-200">

          <button className="pb-3 text-sm font-medium text-slate-500 transition hover:text-slate-900">
            Overview
          </button>

          <button className="border-b-2 border-[#0052cc] pb-3 text-sm font-semibold text-[#0052cc]">
            Kanban
          </button>

          <button className="pb-3 text-sm font-medium text-slate-500 transition hover:text-slate-900">
            Team
          </button>

          <button className="pb-3 text-sm font-medium text-slate-500 transition hover:text-slate-900">
            Timeline
          </button>

        </div>

      </section>
    </>
  );
}

export default ProjectHeader;