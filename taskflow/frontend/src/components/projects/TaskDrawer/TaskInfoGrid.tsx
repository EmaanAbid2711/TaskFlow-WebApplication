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

function TaskInfoGrid({status, priority, dueDate, assignee}: TaskInfoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {/* Status */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Status
        </label>

        <div className="relative">
          <select
            defaultValue={status}
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-[#0052cc]"
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
        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Priority
        </label>

        <div className="grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">

          <button
            className={`flex items-center justify-center gap-1 rounded py-2 text-xs transition ${
              priority === "High"
                ? "bg-white shadow border font-semibold"
                : "hover:bg-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-500" />
            High
          </button>

          <button
            className={`flex items-center justify-center gap-1 rounded py-2 text-xs transition ${
              priority === "Medium"
                ? "bg-white shadow border font-semibold"
                : "hover:bg-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Medium
          </button>

          <button
            className={`flex items-center justify-center gap-1 rounded py-2 text-xs transition ${
              priority === "Low"
                ? "bg-white shadow border font-semibold"
                : "hover:bg-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            Low
          </button>

        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Due Date
        </label>

        <div className="relative">

          <input
            defaultValue={dueDate}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm outline-none focus:border-[#0052cc]"
          />

          <CalendarDays
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

      </div>

      {/* Assignee */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Assignee
        </label>

        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">

          <div className="flex min-w-0 items-center gap-2">
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="h-7 w-7 rounded-full object-cover"
            />

            <span className="truncate text-sm font-medium">
              {assignee.name}
            </span>
          </div>

          <button>
            <Plus size={15} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default TaskInfoGrid;