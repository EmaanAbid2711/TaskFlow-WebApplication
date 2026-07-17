import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskInfoGrid from "./TaskInfoGrid";
import Attachments from "./Attachments";
import ActivityTimeline from "./ActivityTimeline";
import CommentBox from "./CommentBox";
import type {DrawerMode, Task} from "@/interfaces/projects";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: DrawerMode;
  task: Task | null;
  onChangeTask: (
    updatedTask: Task
  ) => void;
  onSave: () => void;
  onDelete: () => void;
}

function TaskDrawer({
  open,
  onClose,
  mode,
  task,
  onChangeTask,
  onDelete,
  onSave,

}: Props) {


  if (!task) {
    return null;
  }

  const handleChange = (
    field: keyof Task,
    value: any
  ) => {
    let activityText = "";
    switch(field) {
      case "title":
        activityText = "Task title updated";
        break;

      case "description":
        activityText = "Task description updated";
        break;

      case "status":
        activityText =
          `Status changed to ${value}`;
        break;

      case "priority":
        activityText =
          `Priority changed to ${value}`;
        break;

      case "dueDate":
        activityText =
          "Due date updated";
        break;

      case "assignee":
        activityText =
          `Assigned to ${value.name}`;
        break;

      default:
        break;
    }

    const newActivity =
      activityText
        ? {
            id: Date.now(),
            type:"system" as const,
            text: activityText,
            time:new Date().toLocaleString(),
          }
        : null;

    onChangeTask({

      ...task,

      [field]: value,


      activities:
        newActivity
          ? [
              ...task.activities,
              newActivity,
            ]
          :
            task.activities,

    });

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
          ?
          "visible opacity-100"
          :
          "invisible opacity-0"
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
          ?
          "translate-x-0"
          :
          "translate-x-full"
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
          onSave={onSave}
          onDelete={onDelete}
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
              onChange={
                handleChange
              }
            />

            <Attachments
              task={task}
              onChange={handleChange}
            />

            <ActivityTimeline
              task={task}
            />
          </div>
        </div>

        <CommentBox
          task={task}
          onChange={handleChange}
        />

      </aside>
    </>
  );
}

export default TaskDrawer;