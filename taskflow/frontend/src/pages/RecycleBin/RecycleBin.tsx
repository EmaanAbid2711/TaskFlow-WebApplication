import { useState} from "react";
import { Trash2} from "lucide-react";
import { useNavigate} from "react-router-dom";
import { toast} from "sonner";

import RecycleBinItem from "@/components/recycleBin/RecycleBinItem";
import ConfirmModal from "@/components/common/ConfirmModal/confirmmodal";
import {useRecycleBin} from "@/context/RecycleBinContext";
import type { RecycleBinItem as RecycleBinItemType} from "@/interfaces/recycleBin";

function RecycleBin() {
  const navigate =
    useNavigate();

  const {
    items,
    restoreItem,
    permanentlyDeleteItem,
  } = useRecycleBin();

  const [
    itemToDelete,
    setItemToDelete,
  ] =
    useState<RecycleBinItemType | null>(
      null
    );

  const handleRestore = (
    recycleId: string
  ) => {
    const item =
      restoreItem(
        recycleId
      );

    if (!item) {
      return;
    }

    toast.success(
      `${
        item.type === "project"
          ? "Project"
          : "Task"
      } restored successfully.`
    );

    if (
      item.type ===
      "project"
    ) {
      navigate(
        "/projects",
        {
          state: {
            restoredItem: item,
          },
        }
      );

      return;
    }

    navigate(
      `/projects?projectId=${item.projectId}`,
      {
        state: {
          restoredItem: item,
        },
      }
    );
  };

  const handlePermanentDelete =
    () => {
      if (!itemToDelete) {
        return;
      }

      permanentlyDeleteItem(
        itemToDelete.recycleId
      );

      toast.success(
        `${
          itemToDelete.type ===
          "project"
            ? "Project"
            : "Task"
        } permanently deleted from the recycle bin.`
      );

      setItemToDelete(null);
    };

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
                h-11 w-11
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <Trash2
                size={22}
              />
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

        <div
          className="
            rounded-lg
            bg-white
            px-4 py-2
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
              h-16 w-16
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
            "
          >
            <Trash2
              size={28}
            />
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
        <div
          className="
            space-y-4
          "
        >
          {items.map(
            (item) => (
              <RecycleBinItem
                key={
                  item.recycleId
                }
                item={item}
                onRestore={
                  handleRestore
                }
                onPermanentDelete={
                  (recycleId) => {
                    const target =
                      items.find(
                        (entry) =>
                          entry.recycleId ===
                          recycleId
                      );

                    if (target) {
                      setItemToDelete(
                        target
                      );
                    }
                  }
                }
              />
            )
          )}
        </div>
      )}

      {/* Permanent Delete Confirmation */}

      <ConfirmModal
        open={
          itemToDelete !== null
        }
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
        onConfirm={
          handlePermanentDelete
        }
      />
    </div>
  );
}

export default RecycleBin;