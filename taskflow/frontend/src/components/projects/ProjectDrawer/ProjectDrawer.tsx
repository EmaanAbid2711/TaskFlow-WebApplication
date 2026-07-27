import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  mode: "create" | "edit";

  initialName?: string;
  initialDescription?: string;

  onClose: () => void;

  onSave: (
    name: string,
    description: string
  ) => Promise<void>;

  onDelete?: () => Promise<void>;
}

function ProjectDrawer({
  open,
  mode,
  initialName = "",
  initialDescription = "",
  onClose,
  onSave,
  onDelete,
}: Props) {

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {

    if (open) {

      setName(initialName);

      setDescription(initialDescription);

    }

  }, [
    open,
    initialName,
    initialDescription,
  ]);

  const handleSave =
    async () => {

      if (
        name.trim().length < 3
      ) {

        alert(
          "Project name must be at least 3 characters."
        );

        return;

      }

      try {

        setSaving(true);

        await onSave(
          name,
          description
        );

      }

      finally {

        setSaving(false);

      }

    };

  const handleDelete =
async () => {

  if (!onDelete)
    return;
  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this project?"
    );

  if(!confirmDelete)
    return;

  try {
    setDeleting(true);
    await onDelete();
  }
  finally {
    setDeleting(false);
  }
};

  return (
    <>
      {/* Overlay */}

      <div
        className={`
        fixed inset-0 z-40
        bg-black/40
        transition

        ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
        onClick={onClose}
      />

      {/* Drawer */}

      <div
        className={`
        fixed right-0 top-0
        z-50
        flex h-full w-full
        max-w-md
        flex-col
        bg-white
        shadow-2xl
        transition-transform

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }
      `}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-xl font-semibold">

            {
              mode === "create"
                ? "Create Project"
                : "Edit Project"
            }

          </h2>

          <button
            onClick={onClose}
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Project Name

            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              border
              px-4
              py-3
              outline-none
              focus:border-[#0052cc]
            "
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Description

            </label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              border
              px-4
              py-3
              outline-none
              focus:border-[#0052cc]
            "
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-between border-t p-6">
  {
    mode === "edit" && (
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="
        rounded-lg
        bg-red-600
        hover:bg-red-700
        disabled:opacity-50
        px-5
        py-2
        text-white
        "
      >

        {
          deleting
          ?
          "Deleting..."
          :
          "Delete Project"
        }

      </button>

    )
  }
  <div className="flex gap-3">

    <button
      onClick={onClose}
      className="
      rounded-lg
      border
      px-5
      py-2
      "
    >
      Cancel
    </button>


    <button
      disabled={saving}
      onClick={handleSave}
      className="
      rounded-lg
      bg-[#0052cc]
      px-5
      py-2
      text-white
      "
    >
      {
        saving
        ?
        "Saving..."
        :
        mode==="create"
        ?
        "Create Project"
        :
        "Save Changes"
      }

    </button>
  </div>
</div>

      </div>
    </>
  );
}

export default ProjectDrawer;