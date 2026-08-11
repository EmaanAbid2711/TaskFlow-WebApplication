import { useEffect, useState } from "react";
import { DndContext, PointerSensor, closestCorners, useSensor, useSensors, type DragEndEvent} from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { ProjectHeader, KanbanBoard, TaskDrawer, ProjectDrawer} from "@/components";
import type { DrawerMode, Task, TaskType } from "@/interfaces/projects";
import { useProjects } from "@/hooks/useProjects";
import { createTaskApi, updateTaskApi } from "@/api/task.api";
import { mapTask } from "@/mappers/task.mapper";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { useRecycleBin } from "@/context/RecycleBinContext";
import type { RecycleBinNavigationState } from "@/interfaces/recycleBin";

function Projects() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { refreshDashboardStats } = useDashboard();
  const [savingTask, setSavingTask] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectDrawerOpen, setProjectDrawerOpen] = useState(false);
  const [projectDrawerMode, setProjectDrawerMode] = useState<"create" | "edit">("create");
  const [search, setSearch] = useState("");
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const {
    projects,
    setProjects,
    selectedProject,
    setSelectedProject,
    tasks,
    setTasks,
    tasksLoading,
    refreshProjectStats,
    refreshCurrentProject,
    createProject,
    updateProject,
    deleteProject,
    removeTaskLocally,
  } = useProjects();

  
  const { moveTaskToRecycleBin } = useRecycleBin();
  const isOwner = selectedProject?.owner.id === user?.id;

  const canOpenTask = (task: Task) => {
    if (isOwner) {
      return true;
    }
    return task.assignee.id === user?.id;
  };

  useEffect(() => {
    const navigationState = location.state as RecycleBinNavigationState | null;
    const restoredItem = navigationState?.restoredItem;

    if (!restoredItem) {
      return;
    }

    /* Restore Project */
    if (restoredItem.type === "project") {
      const restoredProject = projects.find(
        (project) => project.id === restoredItem.item.id
      );

      if (!restoredProject) {
        return;
      }

      setProjects((previous) => {
        const withoutProject = previous.filter(
          (project) => project.id !== restoredProject.id
        );

        const position = Math.min(
          restoredItem.originalPosition,
          withoutProject.length
        );

        return [
          ...withoutProject.slice(0, position),
          restoredProject,
          ...withoutProject.slice(position),
        ];
      });

      setSelectedProject(restoredProject);
      navigate("/projects", { replace: true, state: null });
      return;
    }

    /* Restore Task */
    if (restoredItem.type !== "task") {
      return;
    }

    if (selectedProject?.id !== restoredItem.projectId) {
      return;
    }

    if (tasksLoading) {
      return;
    }

    const restoreTaskPosition = async () => {
      const refreshedTasks = await refreshCurrentProject();

      const restoredIndex = refreshedTasks.findIndex(
        (task) => task.id === restoredItem.item.id
      );

      if (restoredIndex === -1) {
        return;
      }

      const targetPosition = Math.min(
        restoredItem.originalPosition,
        refreshedTasks.length - 1
      );

      if (restoredIndex !== targetPosition) {
        setTasks((previous) => {
          const copy = [...previous];
          const [restoredTask] = copy.splice(restoredIndex, 1);
          copy.splice(targetPosition, 0, restoredTask);
          return copy;
        });
      }

      navigate("/projects", { replace: true, state: null });
    };

    restoreTaskPosition();
  }, [
    location.state,
    projects,
    tasksLoading,
    selectedProject,
    navigate,
    setProjects,
    setSelectedProject,
    setTasks,
    refreshCurrentProject,
  ]);

  /*
   * ------------------------------------------------------------
   * Open Create Project Drawer
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("new") === "true") {
      setProjectDrawerMode("create");
      setProjectDrawerOpen(true);
      navigate("/projects", { replace: true });
    }
  }, [location.search, navigate]);

  /*
   * ------------------------------------------------------------
   * Open Project + Task From URL
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const projectId = searchParams.get("projectId");
    const taskId = searchParams.get("taskId");

    if (!projectId || !taskId || projects.length === 0) {
      return;
    }

    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return;
    }

    setSelectedProject(project);
  }, [searchParams, projects, setSelectedProject]);

  /*
   * ------------------------------------------------------------
   * Open Task From URL
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const taskId = searchParams.get("taskId");

    if (!taskId || tasks.length === 0) {
      return;
    }

    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return;
    }

    setDrawerMode("edit");
    setSelectedTask(task);
    setDrawerOpen(true);

    const params = new URLSearchParams(searchParams);
    params.delete("taskId");
    params.delete("projectId");

    setSearchParams(params, { replace: true });
  }, [tasks, searchParams, setSearchParams]);

  /*
   * ------------------------------------------------------------
   * Edit Project From URL
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const edit = params.get("edit");

    if (!edit) {
      return;
    }

    const project = projects.find((p) => p.id === edit);

    if (project) {
      setSelectedProject(project);
      setProjectDrawerMode("edit");
      setProjectDrawerOpen(true);
    }

    navigate("/projects", { replace: true });
  }, [location.search, projects, navigate, setSelectedProject]);

  /*
   * ------------------------------------------------------------
   * Alternative Project + Task URL
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get("project");
    const taskId = params.get("task");

    if (!projectId || !taskId || projects.length === 0) {
      return;
    }

    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return;
    }

    setSelectedProject(project);

    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      setSelectedTask(task);
      setDrawerMode("edit");
      setDrawerOpen(true);
    }
  }, [location.search, projects, tasks, setSelectedProject]);

  /*
   * ------------------------------------------------------------
   * Save Project
   * ------------------------------------------------------------
   */
  const handleSaveProject = async (name: string, description: string) => {
    try {
      if (projectDrawerMode === "create") {
        await createProject(name, description);
      } else {
        if (!selectedProject) {
          return;
        }
        await updateProject(selectedProject.id, name, description);
      }

      await refreshDashboardStats();
      setProjectDrawerOpen(false);
    } catch (error) {
      console.error("Project save failed:", error);
    }
  };

  /*
   * ------------------------------------------------------------
   * Delete Project
   * ------------------------------------------------------------
   */
  const handleDeleteProject = async () => {
    if (!selectedProject) {
      return;
    }

    deleteProject(selectedProject.id);
    await refreshDashboardStats();
    setProjectDrawerOpen(false);
    toast.success("Project moved to the Recycle Bin.");
  };

  /*
   * ------------------------------------------------------------
   * Filter Tasks
   * ------------------------------------------------------------
   */
  const filteredTasks = tasks.filter((task) => {
    const keyword = search.toLowerCase();
    return (
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword)
    );
  });

  /*
   * ------------------------------------------------------------
   * Drag & Drop Sensors
   * ------------------------------------------------------------
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  /*
   * ------------------------------------------------------------
   * Create Empty Task
   * ------------------------------------------------------------
   */
  const createEmptyTask = (status: TaskType): Task => ({
    id: "",
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

  /*
   * ------------------------------------------------------------
   * Add Task
   * ------------------------------------------------------------
   */
  const handleAddTask = (status: TaskType) => {
    setDrawerMode("create");
    setSelectedTask(createEmptyTask(status));
    setDrawerOpen(true);
  };

  /*
   * ------------------------------------------------------------
   * Open Task
   * ------------------------------------------------------------
   */
  const handleTaskClick = (task: Task) => {
    if (!canOpenTask(task)) {
      toast.error("You can only open tasks assigned to you.");
      return;
    }

    setDrawerMode("edit");
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  /*
   * ------------------------------------------------------------
   * Task Change
   * ------------------------------------------------------------
   */
  const handleTaskChange = (updatedTask: Task) => {
    setSelectedTask(updatedTask);
  };

  /*
   * ------------------------------------------------------------
   * Save Task
   * ------------------------------------------------------------
   */
  const handleSaveTask = async () => {
    if (!selectedTask || !selectedProject) {
      return;
    }

    if (savingTask) {
      return;
    }

    setSavingTask(true);

    try {
      /* CREATE TASK */
      if (drawerMode === "create") {
        if (selectedTask.title.trim().length < 3) {
          alert("Task title must be at least 3 characters.");
          return;
        }

        const response = await createTaskApi({
          title: selectedTask.title,
          description: selectedTask.description,
          status: selectedTask.status,
          priority: selectedTask.priority,
          dueDate: selectedTask.dueDate || undefined,
          progress: selectedTask.progress,
          reviewStatus: selectedTask.reviewStatus,
          projectId: selectedProject.id,
          assigneeId: selectedTask.assignee.id || undefined,
        });

        setTasks((previous) => [...previous, mapTask(response.data)]);
        await refreshProjectStats(selectedProject.id);
        await refreshDashboardStats();
      } 
      /* UPDATE TASK */
      else {
        const response = await updateTaskApi(selectedTask.id, {
          title: selectedTask.title,
          description: selectedTask.description,
          status: selectedTask.status,
          priority: selectedTask.priority,
          dueDate: selectedTask.dueDate,
          progress: selectedTask.progress,
          reviewStatus: selectedTask.reviewStatus,
          assigneeId: selectedTask.assignee.id,
        });

        setTasks((previous) =>
          previous.map((task) =>
            task.id === selectedTask.id ? mapTask(response.data) : task
          )
        );

        await refreshProjectStats(selectedProject.id);
        await refreshDashboardStats();
      }

      setDrawerOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Task save failed:", error);
      toast.error("Failed to save task.");
    } finally {
      setSavingTask(false);
    }
  };

  /*
   * ------------------------------------------------------------
   * Delete Task
   * ------------------------------------------------------------
   */
  const handleDeleteTask = async () => {
    if (!selectedTask || !selectedProject) {
      return;
    }

    const originalPosition = tasks.findIndex(
      (task) => task.id === selectedTask.id
    );

    if (originalPosition === -1) {
      return;
    }

    try {
      moveTaskToRecycleBin(
        selectedTask,
        selectedProject.id,
        originalPosition
      );

      removeTaskLocally(selectedTask.id, selectedProject.id);
      await refreshProjectStats(selectedProject.id);
      await refreshDashboardStats();

      setDrawerOpen(false);
      setSelectedTask(null);
      toast.success("Task moved to the Recycle Bin.");
    } catch (error) {
      console.error("Failed to move task to recycle bin:", error);
      toast.error("Failed to delete task.");
    }
  };

  /*
   * ------------------------------------------------------------
   * Drag End
   * ------------------------------------------------------------
   */
  const handleDragEnd = async (event: DragEndEvent) => {
    if (!isOwner) {
      return;
    }

    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = String(active.id);
    const newStatus = over.id as TaskType;
    const oldTask = tasks.find((task) => task.id === taskId);

    if (!oldTask || !selectedProject) {
      return;
    }

    if (oldTask.status === newStatus) {
      return;
    }

    try {
      await updateTaskApi(taskId, { status: newStatus });

      setTasks((previous) =>
        previous.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      await refreshProjectStats(selectedProject.id);
      await refreshDashboardStats();
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update task status.");
    }
  };

  /*
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */
  return (
    <DndContext
      sensors={isOwner ? sensors : []}
      collisionDetection={closestCorners}
      onDragEnd={isOwner ? handleDragEnd : undefined}
    >
      <div className="flex min-h-screen flex-1 flex-col bg-slate-50">
        <ProjectHeader
          projects={projects}
          selectedProject={selectedProject}
          search={search}
          onSearchChange={setSearch}
          onCreateProject={() => {
            setProjectDrawerMode("create");
            setProjectDrawerOpen(true);
          }}
          onEditProject={() => {
            setProjectDrawerMode("edit");
            setProjectDrawerOpen(true);
          }}
          onDeleteProject={handleDeleteProject}
          onProjectChange={(projectId) => {
            const project = projects.find((p) => p.id === projectId);
            if (project) {
              setSelectedProject(project);
            }
          }}
        />

        <div className="flex-1 overflow-hidden">
          <KanbanBoard
            tasks={filteredTasks}
            onAddTask={handleAddTask}
            onTaskClick={handleTaskClick}
            canCreateTask={selectedProject?.owner.id === user?.id}
          />
        </div>

        <button
          onClick={() => {
            if (!isOwner) {
              return;
            }
            handleAddTask("todo");
          }}
          disabled={!isOwner}
          title={
            isOwner
              ? "Create Task"
              : "Only the project owner can create tasks"
          }
          className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-lg transition-all ${
            isOwner
              ? "bg-[#0052cc] hover:scale-105"
              : "cursor-not-allowed bg-slate-400"
          } md:bottom-8 md:right-8 ${
            drawerOpen ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>

        <TaskDrawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setSelectedTask(null);
          }}
          mode={drawerMode}
          task={selectedTask}
          onChangeTask={handleTaskChange}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          refreshTasks={refreshCurrentProject}
          canChangeAssignee={isOwner}
          saving={savingTask}
        />

        <ProjectDrawer
          open={projectDrawerOpen}
          mode={projectDrawerMode}
          initialName={
            projectDrawerMode === "edit" ? selectedProject?.name : ""
          }
          initialDescription={
            projectDrawerMode === "edit"
              ? selectedProject?.description ?? ""
              : ""
          }
          onClose={() => {
            setProjectDrawerOpen(false);
            const params = new URLSearchParams(searchParams);
            params.delete("new");
            setSearchParams(params, { replace: true });
          }}
          onSave={handleSaveProject}
          onDelete={
            projectDrawerMode === "edit" ? handleDeleteProject : undefined
          }
        />
      </div>
    </DndContext>
  );
}

export default Projects;