import {X, Trash2, FileText, Loader2 } from "lucide-react";

import type { DrawerMode } from "@/interfaces/projects";

interface Props {
  mode: DrawerMode;
  taskId: string;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  saving: boolean;
}

function TaskHeader({
  mode,
  taskId,
  onClose,
  onSave,
  onDelete,
  saving,
}: Props) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-6">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">

        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        <div className="min-w-0">

          <h2 className="text-lg font-semibold text-slate-900">
            {mode === "create"
              ? "Create Task"
              : "Edit Task"}
          </h2>

          <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 w-fit">

            <FileText
              size={14}
              className="text-[#0052cc]"
            />

            <span className="truncate text-xs font-semibold text-slate-600">
              {taskId}
            </span>

          </div>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          disabled={saving}
          className={`
            flex items-center gap-2
            rounded-lg
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            ${
              saving
                ? "cursor-wait bg-blue-400"
                : "bg-[#0052cc] hover:bg-blue-700"
            }
          `}
        >
          {saving && (
            <Loader2
              size={16}
              className="animate-spin"
            />
          )}
        
          {saving ? "Saving..." : "Save"}
        </button>

        {mode === "edit" && (
          <button
            onClick={onDelete}
            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        )}

        <button
          onClick={onClose}
          className="rounded-md p-2 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      
      </div>
    </header>
  );
}

export default TaskHeader;