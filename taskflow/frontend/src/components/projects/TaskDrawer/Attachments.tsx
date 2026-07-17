import { useRef, useState } from "react";
import { FileText, Upload, X} from "lucide-react";

import type { Attachment, Task } from "@/interfaces/projects";

interface Props {
  task: Task;
  onChange: (
    field: keyof Task,
    value: any
  ) => void;
}

function Attachments({ task, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [dragActive, setDragActive] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files)
      .filter(
        (file) =>
          file.type.startsWith("image/") ||
          file.type === "application/pdf"
      )
      .map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type === "application/pdf" ? "pdf" : "image",
        url: URL.createObjectURL(file),
      }));

    onChange("attachments", [
      ...task.attachments,
      ...newAttachments,
    ]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: number) => {
    const attachment = task.attachments.find((a) => a.id === id);

    if (attachment?.url.startsWith("blob:")) {
      URL.revokeObjectURL(attachment.url);
    }

    onChange(
      "attachments",
      task.attachments.filter((a) => a.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Attachments ({task.attachments.length})
        </label>
      </div>

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed p-6 text-center transition-all ${
          dragActive
            ? "border-[#0052cc] bg-[#eef4ff]"
            : "border-slate-300 bg-slate-50 hover:border-slate-400"
        }`}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
          <Upload className="text-[#0052cc]" size={22} />
        </div>

        <p className="text-sm font-semibold text-slate-700">
          Drag & drop files here
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Supports images and PDF files
        </p>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0052cc] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0043a4]"
        >
          <Upload size={16} />
          Browse Files
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />
      </div>

      {task.attachments.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {task.attachments.map((file) => (
            <div
              key={file.id}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              {file.type === "image" ? (
                <div className="relative h-36 w-full">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                    Image
                  </div>
                </div>
              ) : (
                <div className="flex h-36 items-center justify-center bg-blue-50">
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <FileText className="text-[#0052cc]" size={32} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#0052cc]">
                      PDF Document
                    </span>
                  </div>
                </div>
              )}

              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{file.size}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(file.id)}
                    className="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Attachments;