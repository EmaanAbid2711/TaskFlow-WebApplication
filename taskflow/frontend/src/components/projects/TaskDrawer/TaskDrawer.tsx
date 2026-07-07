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
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300
        ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full flex-col bg-white shadow-2xl transition-transform duration-300

        sm:max-w-[420px]
        lg:max-w-[580px]

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <TaskHeader
          taskId={taskDetails.id}
          onClose={onClose}
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          <div className="space-y-8">

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
        </div>

        <CommentBox />
      </aside>
    </>
  );
}

export default TaskDrawer;