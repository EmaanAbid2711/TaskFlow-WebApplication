import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskInfoGrid from "./TaskInfoGrid";
import Attachments from "./Attachments";
import ActivityTimeline from "./ActivityTimeline";
import CommentBox from "./CommentBox";

import { taskDetails } from "../../../data/taskDetailsData";

interface Props {
  open: boolean;
  onClose: () => void;
}

function TaskDrawer({
  open,
  onClose,
}: Props) {
  return (
    <>

      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-[580px] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }
        `}
      >
        <TaskHeader
          taskId={taskDetails.id}
          onClose={onClose}
        />

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <TaskDescription
            title={taskDetails.title}
            description={taskDetails.description}
          />

          <TaskInfoGrid
            status={taskDetails.status}
            priority={taskDetails.priority}
            dueDate={taskDetails.dueDate}
            assignee={taskDetails.assignee}
          />

          <Attachments
            attachments={taskDetails.attachments}
          />

          <ActivityTimeline
            activities={taskDetails.activities}
          />

        </div>
        <CommentBox />
      </aside>
    </>
  );
}

export default TaskDrawer;