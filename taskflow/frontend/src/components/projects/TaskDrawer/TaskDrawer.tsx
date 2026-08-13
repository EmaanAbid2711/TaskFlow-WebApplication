import { useEffect, useState } from "react";

import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskInfoGrid from "./TaskInfoGrid";
import Attachments from "./Attachments";
import ActivityTimeline from "./ActivityTimeline";
import CommentBox from "./CommentBox";

import type { DrawerMode, Task } from "@/interfaces/projects";
import { useUsers } from "@/hooks/useUsers";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: DrawerMode;
  task: Task | null;
  onChangeTask: (updatedTask: Task) => void;
  onSave: (pendingAttachments: File[]) => Promise<void>;
  onDelete: () => Promise<void>;
  refreshTasks: () => Promise<Task[]>;
  canChangeAssignee: boolean;
  saving: boolean;
}

function TaskDrawer({
  open,
  onClose,
  mode,
  task,
  onChangeTask,
  onDelete,
  onSave,
  refreshTasks,
  canChangeAssignee,
  saving,
}: Props) {
  const { users } = useUsers();

  const [pendingAttachments, setPendingAttachments] = useState<File[]>([]);

  /*
   |--------------------------------------------------------------------------
   | Reset pending attachments
   |--------------------------------------------------------------------------
   */

  useEffect(() => {
    setPendingAttachments([]);
  }, [task?.id, mode]);

  if (!task) {
    return null;
  }

  const handleChange = (
    field: keyof Task,
    value: any
  ) => {
    onChangeTask({
      ...task,
      [field]: value,
    });
  };

  const handlePendingAttachmentsChange = (files: File[]) => {
    setPendingAttachments(files);
  };

  const handleSave = async () => {
    await onSave(pendingAttachments);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/40
          transition-opacity duration-300
          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed right-0 top-0
          z-50 flex h-screen
          w-full flex-col
          bg-white shadow-2xl
          transition-transform duration-300
          sm:max-w-[420px]
          lg:max-w-[580px]
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <TaskHeader
          mode={mode}
          taskId={
            mode === "create"
              ? "NEW TASK"
              : `TASK-${task.id}`
          }
          onClose={onClose}
          onSave={handleSave}
          onDelete={onDelete}
          saving={saving}
        />

        {/* Content */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-5 py-5
            md:px-6 md:py-6
          "
        >
          <div className="space-y-8">
            <TaskDescription
              task={task}
              onChange={handleChange}
            />

            <TaskInfoGrid
              task={task}
              users={users}
              onChange={handleChange}
              canChangeAssignee={canChangeAssignee}
            />

            <Attachments
              task={task}
              refreshTasks={refreshTasks}
              onChangeTask={onChangeTask}
              pendingAttachments={pendingAttachments}
              onPendingAttachmentsChange={
                handlePendingAttachmentsChange
              }
            />

            <ActivityTimeline
              task={task}
            />
          </div>
        </div>

        <CommentBox
          task={task}
          refreshTasks={refreshTasks}
          onChangeTask={onChangeTask}
        />
      </aside>
    </>
  );
}

export default TaskDrawer;