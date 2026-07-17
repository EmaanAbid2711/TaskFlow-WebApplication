import { useState } from "react";
import {DndContext, PointerSensor, closestCorners, useSensor, useSensors, type DragEndEvent} from "@dnd-kit/core";
import { Plus } from "lucide-react";

import {ProjectHeader, KanbanBoard, TaskDrawer} from "@/components";
import type {DrawerMode,Task, TaskType} from "@/interfaces/projects";
import {todoTasks, inProgressTasks, reviewTasks, completedTasks} from "@/data/projectsData";

function Projects() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] =
    useState<DrawerMode>("create");

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>([
    ...todoTasks,
    ...inProgressTasks,
    ...reviewTasks,
    ...completedTasks,
  ]);

  /**
   * ------------------------------------------------------------------
   * Drag & Drop Sensors
   * ------------------------------------------------------------------
   */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  /**
   * ------------------------------------------------------------------
   * Create Empty Task
   * ------------------------------------------------------------------
   */

  const createEmptyTask = (
    status: TaskType
  ): Task => ({
    id: 0,
    title: "",
    description: "",
    status,
    priority: "Medium",
    dueDate: "",
    assignee: {
      id: "",
      name: "",
      avatar: "",
    },
    attachments: [],
    activities: [],
  });

  /**
   * ------------------------------------------------------------------
   * Add Task
   * ------------------------------------------------------------------
   */

  const handleAddTask = (
    status: TaskType
  ) => {
    setDrawerMode("create");

    setSelectedTask(
      createEmptyTask(status)
    );

    setDrawerOpen(true);
  };

  /**
   * ------------------------------------------------------------------
   * Open Task
   * ------------------------------------------------------------------
   */

  const handleTaskClick = (
    task: Task
  ) => {
    setDrawerMode("edit");

    setSelectedTask(task);

    setDrawerOpen(true);
  };

  /**
   * ------------------------------------------------------------------
   * Update Task
   * ------------------------------------------------------------------
   */

  const handleTaskChange = (
    updatedTask: Task
  ) => {
    setSelectedTask(updatedTask);
  };

  /**
   * ------------------------------------------------------------------
   * Save Task
   * ------------------------------------------------------------------
   */

  const handleSaveTask = () => {
    if (!selectedTask) return;

    if (drawerMode === "create") {
      const newTask = {
        ...selectedTask,
        id: Date.now(),
      };

      setTasks((prev) => [
        ...prev,
        newTask,
      ]);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id
            ? selectedTask
            : task
        )
      );
    }

    setDrawerOpen(false);
  };

  /**
   * ------------------------------------------------------------------
   * Delete Task
   * ------------------------------------------------------------------
   */

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    setTasks((prev) =>
      prev.filter(
        (task) =>
          task.id !== selectedTask.id
      )
    );

    setDrawerOpen(false);
  };

  /**
   * ------------------------------------------------------------------
   * Drag End
   * -----------------------------------
   */

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(active.id);

    const newStatus = over.id as TaskType;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    if (
      selectedTask &&
      selectedTask.id === taskId
    ) {
      setSelectedTask({
        ...selectedTask,
        status: newStatus,
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div
        className="
        flex min-h-screen
        flex-1 flex-col
        bg-slate-50
      "
      >
        <ProjectHeader />

        <div
          className="
          flex-1
          overflow-hidden
        "
        >
          <KanbanBoard
            tasks={tasks}
            onAddTask={handleAddTask}
            onTaskClick={handleTaskClick}
          />
        </div>

        {/* Floating Add Button */}

        <button
          onClick={() =>
            handleAddTask("todo")
          }
          className={`
          fixed bottom-5 right-5
          z-40
          flex h-14 w-14
          items-center justify-center
          rounded-xl
          bg-[#0052cc]
          text-white
          shadow-lg
          transition-all
          hover:scale-105
          md:bottom-8 md:right-8

          ${
            drawerOpen
              ? "pointer-events-none opacity-0"
              : ""
          }
        `}
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
          mode={drawerMode}
          task={selectedTask}
          onChangeTask={
            handleTaskChange
          }
          onSave={handleSaveTask}
          onDelete={
            handleDeleteTask
          }
        />
      </div>
    </DndContext>
  );
}

export default Projects;