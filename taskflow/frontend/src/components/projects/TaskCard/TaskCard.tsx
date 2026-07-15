import {Calendar, RefreshCw, Eye, CircleCheck} from "lucide-react";

import type { TaskCardProps } from "../../../interfaces/projectProps";

function TaskCard({task, type, onClick,}: TaskCardProps) {
  return (
    <div onClick={() => onClick(task)}
      className={`cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        type === "completed" ? "bg-slate-50" : ""
      }`}
    >
      {/* Priority Badge */}
      {task.priority && (
        <span
          className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
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
        className={`mt-3 break-words text-sm font-semibold leading-6 ${
          type === "completed"
            ? "text-slate-400 line-through"
            : "text-slate-800"
        }`}
      >
        {task.title}
      </h4>

      {/* Progress Bar */}
      {type === "progress" && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#0052cc] transition-all"
              style={{
                width: `${task.progress}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {task.progress}% Complete
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

        {/* TODO */}
        {type === "todo" && (
          <>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={13} />
              <span>{task.date}</span>
            </div>

            <img
              src={task.assignee}
              alt="Assignee"
              className="h-7 w-7 rounded-full object-cover"
            />
          </>
        )}

        {/* IN PROGRESS */}
        {type === "progress" && (
          <>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#0052cc]">
              <RefreshCw
                size={12}
                className="animate-spin"
              />
              Active
            </div>

            <div className="flex -space-x-2">
              {task.assignees?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Member ${index + 1}`}
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </>
        )}

        {/* REVIEW */}
        {type === "review" && (
          <>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Eye size={13} />
              <span>{task.status}</span>
            </div>

            <img
              src={task.assignee}
              alt="Reviewer"
              className="h-7 w-7 rounded-full object-cover"
            />
          </>
        )}

        {/* COMPLETED */}
        {type === "completed" && (
          <>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CircleCheck size={13} />
              Finished
            </div>

            <img
              src={task.assignee}
              alt="Completed"
              className="h-7 w-7 rounded-full object-cover opacity-60"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;