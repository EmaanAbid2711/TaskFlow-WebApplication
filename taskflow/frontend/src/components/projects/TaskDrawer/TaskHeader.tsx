import {X, Share2, Trash2, FileText} from "lucide-react";

interface Props {
  taskId: string;
  onClose: () => void;
}

function TaskHeader({
  taskId,
  onClose,
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

        <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1">
          <FileText
            size={14}
            className="text-[#0052cc]"
          />

          <span className="truncate text-xs font-semibold text-slate-600">
            {taskId}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 md:gap-2">

        <button className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
          <Share2 size={18} />
        </button>

        <button className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600">
          <Trash2 size={18} />
        </button>

      </div>
    </header>
  );
}

export default TaskHeader;