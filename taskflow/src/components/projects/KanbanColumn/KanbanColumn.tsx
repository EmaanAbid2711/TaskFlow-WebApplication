import { Plus } from "lucide-react";

import TaskCard from "../TaskCard/TaskCard";
import type { KanbanColumnProps } from "../../../interfaces/projectProps";


function KanbanColumn({
  title,
  tasks,
  type,
}: KanbanColumnProps) {
  return (
    <div className="w-72 shrink-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full
              ${
                type === "todo"
                  ? "bg-slate-500"
                  : type === "progress"
                  ? "bg-blue-600"
                  : type === "review"
                  ? "bg-amber-600"
                  : "bg-emerald-500"
              }
            `}
          />

          <span className="text-xs font-bold uppercase tracking-wide">
            {title}
          </span>

          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {tasks.length}
          </span>
        </div>
        <Plus className="w-4 h-4 text-slate-400 cursor-pointer" />
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