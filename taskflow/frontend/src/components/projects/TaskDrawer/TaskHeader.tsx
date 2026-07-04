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
    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

      {/* Left */}
      <div className="flex items-center gap-3">

        <button
          onClick={onClose}
          className="text-slate-400 transition hover:text-slate-700"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500">
          <FileText size={14} className="text-blue-600" />
          {taskId}
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button className="text-slate-400 hover:text-slate-700">
          <Share2 size={18} />
        </button>

        <button className="text-slate-400 hover:text-red-500">
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}

export default TaskHeader;