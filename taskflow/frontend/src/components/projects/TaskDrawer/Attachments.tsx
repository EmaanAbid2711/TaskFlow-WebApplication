import { useRef, useState } from "react";
import {FileImage, FileText, Upload, Trash2, ExternalLink, Loader2} from "lucide-react";

import { uploadTaskAttachmentApi, deleteTaskAttachmentApi} from "@/api/task.api";
import type { Task } from "@/interfaces/projects";

interface Props {
  task: Task;
  onChange: (field: keyof Task, value: any) => void;
  refreshTasks: () => Promise<void>;
}

function Attachments({ task, refreshTasks }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Upload Attachment
  |--------------------------------------------------------------------------
  */
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadTaskAttachmentApi(task.id, file);
      await refreshTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to upload attachment.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Attachment
  |--------------------------------------------------------------------------
  */
  const handleDelete = async (attachmentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attachment?"
    );
    if (!confirmed) return;

    try {
      await deleteTaskAttachmentApi(task.id, attachmentId);
      await refreshTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete attachment.");
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleUpload}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Attachments ({task.attachments.length})
        </label>

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 text-xs font-semibold text-[#0052cc] disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Upload size={13} />
          )}

          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {task.attachments.length === 0 ? (
        <p className="text-sm text-slate-400">No attachments</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {task.attachments.map((file) => {
            const isPdf = file.type === "pdf";

            return (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center gap-3 min-w-0"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded ${
                      isPdf
                        ? "bg-blue-50 text-[#0052cc]"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {isPdf ? <FileText size={20} /> : <FileImage size={20} />}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-slate-400">{file.size}</p>
                  </div>

                  <ExternalLink size={16} className="text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={() => handleDelete(file.id)}
                  className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Attachments;