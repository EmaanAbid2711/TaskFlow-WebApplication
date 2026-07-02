import {Calendar, RefreshCw, Eye, CircleCheck} from "lucide-react";

import type { TaskCardProps } from "../../../interfaces/projectProps";

function TaskCard({ task, type }: TaskCardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${
        type === "completed" ? "bg-slate-50" : ""
      }`}
    >
      {/* Badge */}
      {task.priority && (
        <span
          className={`inline-block rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide
          ${
            task.priority === "High"
              ? "bg-rose-100 text-rose-700"
              : task.priority === "Medium"
              ? "bg-amber-100 text-amber-700"
              : "bg-sky-100 text-sky-700"
          }`}
        >
          {task.priority}
        </span>
      )}

      {/* Title */}
      <h4
        className={`mt-2 text-sm font-semibold leading-5 ${
          type === "completed"
            ? "line-through text-slate-400"
            : "text-slate-800"
        }`}
      >
        {task.title}
      </h4>

      {/* Progress */}
      {type === "progress" && (
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">

        {/* Todo */}
        {type === "todo" && (
          <>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={13} />
              {task.date}
            </div>

            <img
              src={task.assignee}
              alt=""
              className="h-5 w-5 rounded-full object-cover"
            />
          </>
        )}

        {/* Progress */}
        {type === "progress" && (
          <>
            <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">
              <RefreshCw size={12} className="animate-spin" />
              Active
            </div>

            <div className="flex -space-x-2">
              {task.assignees?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="h-5 w-5 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </>
        )}

        {/* Review */}
        {type === "review" && (
          <>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Eye size={13} />
              {task.status}
            </div>

            <img
              src={task.assignee}
              alt=""
              className="h-5 w-5 rounded-full object-cover"
            />
          </>
        )}

        {/* Completed */}
        {type === "completed" && (
          <>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CircleCheck size={13} />
              Finished
            </div>

            <img
              src={task.assignee}
              alt=""
              className="h-5 w-5 rounded-full object-cover opacity-60"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;