import { CalendarDays, ChevronDown, Plus } from "lucide-react";

interface Assignee {
  name: string;
  avatar: string;
}

interface TaskInfoGridProps {
  status: string;
  priority: string;
  dueDate: string;
  assignee: Assignee;
}

function TaskInfoGrid({status, priority, dueDate, assignee,
}: TaskInfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">

      {/* Status */}
      <div>

        <label className="mb-1.5 block text-xs font-semibold text-slate-500">
          Status
        </label>

        <div className="relative">

          <select
            defaultValue={status}
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-[#0052cc]"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Completed</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

        </div>

      </div>

      {/* Priority */}
      <div>

        <label className="mb-1.5 block text-xs font-semibold text-slate-500">
          Priority
        </label>

        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">

          <button
            className={`flex flex-1 items-center justify-center gap-1 rounded py-1 text-xs transition ${
              priority === "High"
                ? "border border-slate-200 bg-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            High
          </button>

          <button
            className={`flex flex-1 items-center justify-center gap-1 rounded py-1 text-xs transition ${
              priority === "Medium"
                ? "border border-slate-200 bg-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Medium
          </button>

          <button
            className={`flex flex-1 items-center justify-center gap-1 rounded py-1 text-xs transition ${
              priority === "Low"
                ? "border border-slate-200 bg-white font-semibold shadow-sm"
                : "text-slate-500 hover:bg-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-sky-500"></span>
            Low
          </button>

        </div>
      </div>

      {/* Due Date */}
      <div>

        <label className="mb-1.5 block text-xs font-semibold text-slate-500">
          Due Date
        </label>

        <div className="relative">

          <input
            type="text"
            defaultValue={dueDate}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm text-slate-700 outline-none focus:border-[#0052cc]"
          />

          <CalendarDays
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

        </div>

      </div>

      {/* Assignee */}
      <div>

        <label className="mb-1.5 block text-xs font-semibold text-slate-500">
          Assignee
        </label>

        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">

          <div className="flex items-center gap-2">

            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="h-6 w-6 rounded-full object-cover"
            />

            <span className="text-sm font-medium text-slate-700">
              {assignee.name}
            </span>

          </div>

          <button className="text-slate-400 hover:text-slate-700">
            <Plus size={14} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default TaskInfoGrid;