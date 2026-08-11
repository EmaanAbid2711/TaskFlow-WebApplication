import {
  FolderKanban,
  CheckSquare,
  RotateCcw,
  Trash2,
  Clock,
} from "lucide-react";

import type {
  RecycleBinItem as RecycleBinItemType,
} from "@/interfaces/recycleBin";

interface Props {
  item: RecycleBinItemType;

  onRestore: (
    recycleId: string
  ) => void;

  onPermanentDelete: (
    recycleId: string
  ) => void;
}

function RecycleBinItem({
  item,
  onRestore,
  onPermanentDelete,
}: Props) {
  const isProject =
    item.type === "project";

  const name =
    item.type === "project"
      ? item.item.name
      : item.item.title;

  const deletedDate =
    new Date(
      item.deletedAt
    ).toLocaleString();

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div
        className="
          flex flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Information */}

        <div
          className="
            flex min-w-0
            items-start
            gap-4
          "
        >
          <div
            className="
              flex h-11 w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              bg-slate-100
              text-slate-600
            "
          >
            {isProject ? (
              <FolderKanban
                size={21}
              />
            ) : (
              <CheckSquare
                size={21}
              />
            )}
          </div>

          <div className="min-w-0">
            <div
              className="
                mb-1
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className="
                  truncate
                  font-semibold
                  text-slate-900
                "
              >
                {name}
              </h3>

              <span
                className="
                  rounded-full
                  bg-slate-100
                  px-2.5 py-1
                  text-xs
                  font-medium
                  text-slate-600
                "
              >
                {isProject
                  ? "Project"
                  : "Task"}
              </span>
            </div>

            {!isProject && (
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Project ID:{" "}
                {item.projectId}
              </p>
            )}

            <div
              className="
                mt-2
                flex items-center
                gap-1.5
                text-xs
                text-slate-400
              "
            >
              <Clock size={13} />

              Deleted{" "}
              {deletedDate}
            </div>
          </div>
        </div>

        {/* Actions */}

        <div
          className="
            flex
            flex-shrink-0
            gap-2
          "
        >
          <button
            onClick={() =>
              onRestore(
                item.recycleId
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              px-4 py-2
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <RotateCcw
              size={16}
            />

            Restore
          </button>

          <button
            onClick={() =>
              onPermanentDelete(
                item.recycleId
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-red-600
              px-4 py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
            "
          >
            <Trash2
              size={16}
            />

            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecycleBinItem;