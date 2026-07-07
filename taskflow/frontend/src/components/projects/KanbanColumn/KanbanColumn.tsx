import { Plus } from "lucide-react";

import TaskCard from "../TaskCard/TaskCard";

import type { KanbanColumnProps } from "../../../interfaces/projectProps";

function KanbanColumn({title, tasks, type}: KanbanColumnProps) {
  return (
    <div className="w-[300px] shrink-0 lg:w-72">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              type === "todo"
                ? "bg-slate-500"
                : type === "progress"
                ? "bg-blue-600"
                : type === "review"
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
          />
          <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
            {title}
          </span>

          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {tasks.length}
          </span>
        </div>

        <button className="rounded-md p-1 transition hover:bg-slate-100">
          <Plus
            size={16}
            className="text-slate-500"
          />
        </button>

      </div>

      {/* Cards */}
      <div className="space-y-4">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;