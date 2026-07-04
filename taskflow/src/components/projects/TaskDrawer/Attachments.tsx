import { FileImage, FileText, Upload } from "lucide-react";

interface Attachment {
  id: number;
  name: string;
  size: string;
  type: "pdf" | "image";
}

interface Props {
  attachments: Attachment[];
}

function Attachments({ attachments }: Props) {
  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Attachments ({attachments.length})
        </label>

        <button className="flex items-center gap-1 text-xs font-semibold text-[#0052cc] hover:text-blue-700">
          <Upload size={12} />
          Upload
        </button>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {attachments.map((file) => (
          <div
            key={file.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded
                ${
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

            <div className="overflow-hidden">
              <p className="truncate text-xs font-medium text-slate-700">
                {file.name}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {file.size}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Attachments;