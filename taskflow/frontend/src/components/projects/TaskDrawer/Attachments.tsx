import { useRef, useState } from "react";
import { FileImage, FileText, Upload, Trash2, ExternalLink, Loader2, X} from "lucide-react";

import { uploadTaskAttachmentApi, deleteTaskAttachmentApi} from "@/api/task.api";
import type { Task } from "@/interfaces/projects";
import ConfirmModal from "@/components/common/ConfirmModal/confirmmodal";

interface Props {
  task: Task;
  refreshTasks: () => Promise<Task[]>;
  onChangeTask: (task: Task) => void;

  pendingAttachments: File[];
  onPendingAttachmentsChange: (files: File[]) => void;
}

function Attachments({
  task,
  refreshTasks,
  onChangeTask,
  pendingAttachments,
  onPendingAttachmentsChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  /*
   |--------------------------------------------------------------------------
   | Update Drawer Task
   |--------------------------------------------------------------------------
   */

  const syncTask = async () => {
    const updatedTasks = await refreshTasks();

    const updatedTask = updatedTasks.find(
      (item) => item.id === task.id
    );

    if (updatedTask) {
      onChangeTask(updatedTask);
    }
  };

  /*
   |--------------------------------------------------------------------------
   | Select Attachment
   |--------------------------------------------------------------------------
   */

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    /*
     * CREATE MODE
     *
     * The task does not have a real backend ID yet.
     * Therefore, store the files temporarily.
     */

    if (!task.id) {
      onPendingAttachmentsChange([
        ...pendingAttachments,
        ...selectedFiles,
      ]);

      event.target.value = "";
      return;
    }

    /*
     * EDIT MODE
     *
     * Existing task already has an ID, so upload
     * immediately as before.
     */

    void uploadFilesToExistingTask(selectedFiles);

    event.target.value = "";
  };

  /*
   |--------------------------------------------------------------------------
   | Upload Existing Task Attachments
   |--------------------------------------------------------------------------
   */

  const uploadFilesToExistingTask = async (
    files: File[]
  ) => {
    try {
      setUploading(true);

      for (const file of files) {
        await uploadTaskAttachmentApi(task.id, file);
      }

      await syncTask();
    } catch (error) {
      console.error(error);
      alert("Failed to upload attachment");
    } finally {
      setUploading(false);
    }
  };

  /*
   |--------------------------------------------------------------------------
   | Remove Pending Attachment
   |--------------------------------------------------------------------------
   */

  const handleRemovePending = (index: number) => {
    const updatedFiles = pendingAttachments.filter(
      (_, fileIndex) => fileIndex !== index
    );

    onPendingAttachmentsChange(updatedFiles);
  };

  /*
   |--------------------------------------------------------------------------
   | Delete Existing Attachment
   |--------------------------------------------------------------------------
   */

  const handleDelete = async () => {
  if (!deleteId) {
    return;
  }

  try {
    setDeleting(true);

    await deleteTaskAttachmentApi(
      task.id,
      deleteId
    );

    await syncTask();
  } catch (error) {
    console.error(error);
    alert("Failed to delete attachment");
  } finally {
    setDeleting(false);
    setDeleteId(null);
  }
};

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Attachments (
          {task.attachments.length +
            pendingAttachments.length}
          )
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

      {/* -----------------------------------------------------------------
          Pending Attachments
         ----------------------------------------------------------------- */}

      {pendingAttachments.length > 0 && (
        <div className="space-y-2">
          {pendingAttachments.map(
            (file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-[#0052cc]">
                  {file.type === "application/pdf" ? (
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
                    {(file.size / 1024).toFixed(1)} KB
                  </p>

                  <p className="text-[11px] text-[#0052cc]">
                    Will upload when task is saved
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemovePending(index)
                  }
                  className="text-slate-400 hover:text-red-600"
                  title="Remove attachment"
                >
                  <X size={16} />
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* -----------------------------------------------------------------
          Existing Attachments
         ----------------------------------------------------------------- */}

      {task.attachments.length === 0 &&
      pendingAttachments.length === 0 ? (
        <p className="text-sm text-slate-400">
          No attachments
        </p>
      ) : (
        task.attachments.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {task.attachments.map((file) => {
              const isPdf =
                file.type === "pdf";

              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
                >
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 flex-1 items-center gap-3"
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

                    <div className="min-w-0">
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

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteId(file.id)
                    }
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )
      )}

      <div className="relative">
  <ConfirmModal
    open={deleteId !== null}
    title="Delete Attachment"
    message="Are you sure you want to delete this attachment? This action cannot be undone."
    confirmText="Delete"
    onCancel={() => {
      if (!deleting) {
        setDeleteId(null);
      }
    }}
    onConfirm={handleDelete}
  />

  {deleting && (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <div className="rounded-lg bg-white px-5 py-4 shadow-xl">
        <div className="flex items-center gap-3">
          <Loader2
            size={18}
            className="animate-spin text-[#0052cc]"
          />

          <span className="text-sm font-medium text-slate-700">
            Deleting attachment...
          </span>
        </div>
      </div>
    </div>
  )}
</div>
    </div>
  );
}

export default Attachments;