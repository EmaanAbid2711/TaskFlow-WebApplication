import { useRef, useState } from "react";
import {FileImage, FileText, Loader2, Upload, ExternalLink} from "lucide-react";

import type { Task } from "@/interfaces/projects";
import { uploadTaskAttachmentApi } from "@/api/task.api";

interface Props {
  task: Task;

  onChange: (
    field: keyof Task,
    value: any
  ) => void;

  onRefresh: () => Promise<void>;
}

function Attachments({
  task,
  onRefresh,
}: Props) {

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    try {

      setUploading(true);

      await uploadTaskAttachmentApi(
        task.id,
        file
      );

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to upload attachment.");

    } finally {

      setUploading(false);

      event.target.value = "";

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
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="flex items-center gap-1 text-xs font-semibold text-[#0052cc] disabled:opacity-50"
        >

          {uploading ? (
            <Loader2
              size={13}
              className="animate-spin"
            />
          ) : (
            <Upload size={13} />
          )}

          {uploading
            ? "Uploading..."
            : "Upload"}

        </button>

      </div>

      {task.attachments.length === 0 ? (

        <p className="text-sm text-slate-400">
          No attachments
        </p>

      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {task.attachments.map((file) => {

            const isPdf =
              file.type === "pdf";

            const url = file.url;

            return (

              <a
                key={file.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded ${
                    isPdf
                      ? "bg-blue-50 text-[#0052cc]"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >

                  {isPdf ? (
                    <FileText size={20} />
                  ) : (
                    <FileImage size={20} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {file.size}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-slate-400"
                />
              </a>
            );
          })}

        </div>

      )}

    </div>
  );
}
export default Attachments;