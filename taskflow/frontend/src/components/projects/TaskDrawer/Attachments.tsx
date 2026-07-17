import { FileImage, FileText, Upload } from "lucide-react";
import type { Task } from "@/interfaces/projects";

interface Props {
  task: Task;
  onChange: (field: keyof Task, value: any) => void;
}

function Attachments({ task, onChange }: Props) {
  const handleFakeUpload = () => {
    const file = {
      id: Date.now(),
      name: "New Attachment.png",
      size: "120 KB",
      type: "image" as const,
    };

    const activity = {
      id: Date.now(),
      type: "system" as const,
      text: `Attachment uploaded: ${file.name}`,
      time: new Date().toLocaleString(),
    };

    onChange("attachments", [...task.attachments, file]);
    onChange("activities", [...task.activities, activity]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Attachments ({task.attachments.length})
        </label>

        <button
          onClick={handleFakeUpload}
          className="flex items-center gap-1 text-xs font-semibold text-[#0052cc]"
        >
          <Upload size={12} />
          Upload
        </button>
      </div>

      {task.attachments.length === 0 ? (
        <p className="text-sm text-slate-400">No attachments</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {task.attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded ${
                  file.type === "pdf"
                    ? "bg-blue-50 text-[#0052cc]"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {file.type === "pdf" ? (
                  <FileText size={20} />
                ) : (
                  <FileImage size={20} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-slate-400">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Attachments;