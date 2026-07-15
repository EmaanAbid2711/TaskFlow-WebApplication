import { Folder, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

function ProjectHeader() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "";

  return (
    <>
      {/* TOP HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">

          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full rounded-full border border-slate-200 bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-[#0052cc] focus:bg-white"
            />
          </div>

          {/* Right */}
          <div className="flex items-center justify-between gap-4 md:justify-end">

            <button className="rounded-lg bg-[#0052cc] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0043a4]">
              Get Started
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/settings/profile")
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-full
                transition
                hover:ring-2
                hover:ring-[#0052cc]/20
              "
            >
              {user?.avatar ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${user.avatar}`}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
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
        </div>
      </header>

      {/* PROJECT INFO */}
      <section className="border-b border-slate-200 bg-white px-4 py-6 md:px-8">

        {/* Breadcrumb */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Folder size={14} />
          <span>Engineering</span>
          <span>/</span>
          <span>TaskFlow</span>
        </div>

        {/* Title + Stats */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Redesign System Architecture
          </h1>

          {/* Stats */}
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">

            {/* Progress */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Progress
              </p>

              <div className="flex items-center gap-3">
                <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-3/4 rounded-full bg-[#0052cc]" />
                </div>

                <span className="text-sm font-bold">
                  75%
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="sm:border-l sm:border-slate-200 sm:pl-8">

              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Tasks
              </p>

              <p className="text-xl font-bold text-slate-900">
                24
                <span className="text-base font-normal text-slate-400">
                  {" "}
                  / 32
                </span>
              </p>

            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max gap-8 border-b border-slate-200">

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
        </div>
      </section>
    </>
  );
}

export default ProjectHeader;