import { useState } from "react";
import { Plus } from "lucide-react";

import {ProjectHeader, KanbanBoard, TaskDrawer} from "@/components";
import type {TaskType, Task, DrawerMode} from "@/interfaces/projects";

function Projects() {
  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [drawerMode, setDrawerMode] =
    useState<DrawerMode>("create");

  const [selectedColumn, setSelectedColumn] =
    useState<TaskType>("todo");

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const handleAddTask = (
    status: TaskType
  ) => {
    setDrawerMode("create");

    setSelectedTask(null);

    setSelectedColumn(status);

    setDrawerOpen(true);
  };

  const handleTaskClick = (
    task: Task
  ) => {
    setDrawerMode("edit");

    setSelectedTask(task);

    setDrawerOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-slate-50">
      <ProjectHeader />
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
        />
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => handleAddTask("todo")}
        className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#0043a4] md:bottom-8 md:right-8 ${
          drawerOpen
            ? "pointer-events-none opacity-0"
            : ""
        }`}
      >
        <Plus
          size={24}
          strokeWidth={2.5}
        />
      </button>

      <TaskDrawer
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      />

    </div>
  );
}

export default Projects;