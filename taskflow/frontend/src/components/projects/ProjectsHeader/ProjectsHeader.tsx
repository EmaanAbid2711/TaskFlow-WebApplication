import { Folder, Search, MoreVertical, Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import type { Project } from "@/interfaces/project";

interface Props {
  projects: Project[];
  selectedProject: Project | null;
  onProjectChange: (projectId: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onCreateProject: () => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

function ProjectHeader({
  projects,
  selectedProject,
  onProjectChange,
  search,
  onSearchChange,
  onCreateProject,
  onEditProject,
}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isOwner =
  selectedProject?.owner.id === user?.id;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

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
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-full border border-slate-200 bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none focus:border-[#0052cc] focus:bg-white"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Create Project */}
            <button
              onClick={onCreateProject}
              className="hidden items-center gap-2 rounded-lg bg-[#0052cc] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0043a8] sm:flex"
            >
              <Plus size={16} />
              New Project
            </button>

            {/* Profile */}
            <button
              type="button"
              onClick={() => navigate("/settings/profile")}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full"
            >
              {user?.avatar ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${user.avatar}`}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0052cc] text-sm font-semibold text-white">
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
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
          <Folder size={14} />
          <span>Projects</span>
          <span>/</span>
          <span>{selectedProject?.name}</span>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Title */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                {selectedProject?.name}
              </h1>

              {/* Project menu */}
              {selectedProject && isOwner &&(
                <div ref={menuRef} className="relative">
                  <button
                    onClick={() => setMenuOpen((previous) => !previous)}
                    className="rounded-lg p-2 hover:bg-slate-100"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-44 rounded-lg border bg-white py-2 shadow-xl">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          onEditProject();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100"
                      >
                        <Pencil size={15} />
                        Edit Project
                      </button>

                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="mt-2 text-slate-500">
              {selectedProject?.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-slate-500">
                Progress
              </p>

              <div className="flex items-center gap-3">
                <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#0052cc]"
                    style={{
                      width: `${selectedProject?.stats.progress ?? 0}%`,
                    }}
                  />
                </div>

                <span className="text-sm font-bold">
                  {selectedProject?.stats.progress ?? 0}%
                </span>
              </div>
            </div>

            <div className="border-l pl-8">
              <p className="mb-2 text-xs font-bold uppercase text-slate-500">
                Tasks
              </p>

              <p className="text-xl font-bold">
                {selectedProject?.stats.completedTasks ?? 0}
                <span className="text-base font-normal text-slate-400">
                  {" / "}
                  {selectedProject?.stats.totalTasks ?? 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Project Selector */}
        <div className="mt-6">

          <select
            value={selectedProject?.id ?? ""}
            onChange={(e) => onProjectChange(e.target.value)}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    </>
  );
}

export default ProjectHeader;