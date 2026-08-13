import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import RecycleBinItem from "@/components/recycleBin/RecycleBinItem";
import ConfirmModal from "@/components/common/ConfirmModal/confirmmodal";

import { useRecycleBin } from "@/context/RecycleBinContext";

import type {
  RecycleBinItem as RecycleBinItemType,
} from "@/interfaces/recycleBin";

function RecycleBin() {
  const navigate = useNavigate();

  const {
    projects,
    tasks,
    loading,
    error,
    restoreProject,
    restoreTask,
    permanentlyDeleteProject,
    permanentlyDeleteTask,
    refreshRecycleBin,
  } = useRecycleBin();

  const [
    itemToDelete,
    setItemToDelete,
  ] = useState<RecycleBinItemType | null>(
    null
  );

  // --------------------------------------------------------------------------
  // Combine Projects + Tasks
  // --------------------------------------------------------------------------

  const items = useMemo<RecycleBinItemType[]>(
    () => [
      ...projects.map((project) => ({
        recycleId: project.id,
        type: "project" as const,
        item: project,
        deletedAt: project.deletedAt,
      })),

      ...tasks.map((task) => ({
        recycleId: task.id,
        type: "task" as const,
        item: task,
        projectId: task.project.id,
        deletedAt: task.deletedAt,
      })),
    ],
    [projects, tasks]
  );

  // --------------------------------------------------------------------------
  // Restore
  // --------------------------------------------------------------------------

  const handleRestore = async (
    recycleId: string
  ) => {
    const target = items.find(
      (item) => item.recycleId === recycleId
    );

    if (!target) {
      return;
    }

    try {
      if (target.type === "project") {
        await restoreProject(target.item.id);

        toast.success(
          "Project restored successfully."
        );

        navigate("/projects", {
          state: {
            restoredItem: target,
          },
        });

        return;
      }

      await restoreTask(target.item.id);

      toast.success(
        "Task restored successfully."
      );

      navigate(
        `/projects?projectId=${target.projectId}`,
        {
          state: {
            restoredItem: target,
          },
        }
      );
    } catch (error) {
      console.error(
        "Failed to restore item:",
        error
      );

      toast.error(
        "Failed to restore item."
      );
    }
  };

  // --------------------------------------------------------------------------
  // Permanent Delete
  // --------------------------------------------------------------------------

  const handlePermanentDelete = async () => {
    if (!itemToDelete) {
      return;
    }

    try {
      if (
        itemToDelete.type === "project"
      ) {
        await permanentlyDeleteProject(
          itemToDelete.item.id
        );

        toast.success(
          "Project permanently deleted."
        );
      } else {
        await permanentlyDeleteTask(
          itemToDelete.item.id
        );

        toast.success(
          "Task permanently deleted."
        );
      }

      setItemToDelete(null);
    } catch (error) {
      console.error(
        "Failed to permanently delete item:",
        error
      );

      toast.error(
        "Failed to permanently delete item."
      );
    }
  };

  // --------------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex-1
          bg-slate-50
          p-5
          md:p-8
        "
      >
        <div
          className="
            flex
            min-h-[420px]
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
          "
        >
          <div className="text-center">
            <div
              className="
                mx-auto
                h-8
                w-8
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-slate-700
              "
            />

            <p
              className="
                mt-4
                text-sm
                text-slate-500
              "
            >
              Loading recycle bin...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Error State
  // --------------------------------------------------------------------------

  if (error && items.length === 0) {
    return (
      <div
        className="
          min-h-screen
          flex-1
          bg-slate-50
          p-5
          md:p-8
        "
      >
        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-red-200
            bg-white
            px-6
            text-center
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            <Trash2 size={28} />
          </div>

          <h2
            className="
              mt-5
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Failed to load Recycle Bin
          </h2>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
            "
          >
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              void refreshRecycleBin();
            }}
            className="
              mt-5
              rounded-lg
              bg-slate-900
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Main UI
  // --------------------------------------------------------------------------

  return (
    <div
      className="
        min-h-screen
        flex-1
        bg-slate-50
        p-5
        md:p-8
      "
    >
      {/* Header */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <Trash2 size={22} />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                Recycle Bin
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Restore deleted projects
                and tasks or permanently
                remove them.
              </p>
            </div>
          </div>
        </div>

        {/* Item Count */}

        <div
          className="
            rounded-lg
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            shadow-sm
            ring-1
            ring-slate-200
          "
        >
          {items.length}{" "}
          {items.length === 1
            ? "item"
            : "items"}
        </div>
      </div>

      {/* Empty State */}

      {items.length === 0 ? (
        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-6
            text-center
          "
        >
          <div
            className="
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
            "
          >
            <Trash2 size={28} />
          </div>

          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Recycle Bin is empty
          </h2>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
            "
          >
            Deleted projects and tasks
            will appear here. You can
            restore them or permanently
            remove them.
          </p>
        </div>
      ) : (
        /* Recycle Bin Items */

        <div className="space-y-4">
          {items.map((item) => (
            <RecycleBinItem
              key={item.recycleId}
              item={item}
              onRestore={(recycleId) => {
                void handleRestore(
                  recycleId
                );
              }}
              onPermanentDelete={(
                recycleId
              ) => {
                const target = items.find(
                  (entry) =>
                    entry.recycleId ===
                    recycleId
                );

                if (target) {
                  setItemToDelete(
                    target
                  );
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Permanent Delete Confirmation */}

      <ConfirmModal
        open={itemToDelete !== null}
        title="Delete Permanently?"
        message={
          itemToDelete
            ? `Are you sure you want to permanently delete this ${
                itemToDelete.type ===
                "project"
                  ? "project"
                  : "task"
              }? It will be removed from the Recycle Bin and cannot be restored.`
            : ""
        }
        confirmText="Delete Permanently"
        cancelText="Cancel"
        onCancel={() =>
          setItemToDelete(null)
        }
        onConfirm={() => {
          void handlePermanentDelete();
        }}
      />
    </div>
  );
}

export default RecycleBin;