import { useState, useEffect} from "react";
import {DndContext, PointerSensor, closestCorners, useSensor, useSensors, type DragEndEvent} from "@dnd-kit/core";
import { Plus } from "lucide-react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {ProjectHeader, KanbanBoard, TaskDrawer, ProjectDrawer} from "@/components";
import type {DrawerMode,Task, TaskType} from "@/interfaces/projects";
import { useProjects } from "@/hooks/useProjects";
import {createTaskApi, updateTaskApi, deleteTaskApi, getProjectTasksApi} from "@/api/task.api";
import {mapTask, mapTasks} from "@/mappers/task.mapper";
import { useAuth } from "@/context/AuthContext";

function Projects() {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [projectDrawerOpen, setProjectDrawerOpen] =
  useState(false);

  const [projectDrawerMode,setProjectDrawerMode] =
  useState<"create"|"edit">( "create" );

  const [search, setSearch] =
  useState("");

  const [searchParams, setSearchParams] =
  useSearchParams();

  const [drawerMode, setDrawerMode] =
    useState<DrawerMode>("create");

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const {
      projects,
      selectedProject,
      setSelectedProject,
      tasks,
      setTasks,
      refreshProjectStats,
      createProject,
      updateProject,
      deleteProject,
  } = useProjects();

const isOwner =
  selectedProject?.owner.id === user?.id;

useEffect(() => {
  const params =
    new URLSearchParams(location.search);

  if (params.get("new") === "true") {

    setProjectDrawerMode(
      "create"
    );

    setProjectDrawerOpen(true);

    navigate(
      "/projects",
      {
        replace: true,
      }
    );

  }

}, [
  location.search,
  navigate,
]);

useEffect(() => {
  if (
    searchParams.get("new") === "true"
  ) {
    setProjectDrawerOpen(true);
  }
}, [searchParams]);


useEffect(()=>{ const params =
 new URLSearchParams(
  location.search
 );
 const edit =
 params.get("edit");
 if(edit){
   const project =
   projects.find(
    p=>p.id===edit
   );
   if(project){
    setSelectedProject(
      project
    );
    setProjectDrawerOpen(
      true
    );
   }
   navigate(
    "/projects",
    {
      replace:true
    }
   );
 }
},[
 location.search,
 projects,
 navigate
]);

const handleSaveProject = async (
    name:string,
    description:string
)=>{

    try{

        if(projectDrawerMode==="create"){

            await createProject(
                name,
                description
            );

        }

        else{

            if(!selectedProject)
                return;

            await updateProject(
                selectedProject.id,
                name,
                description
            );

        }

        setProjectDrawerOpen(false);

    }

    catch(error){

        console.log(error);

    }

}

const handleDeleteProject =
async () => {

  if(!selectedProject)
    return;

  await deleteProject(
    selectedProject.id
  );

  setProjectDrawerOpen(false);
};


  const refreshCurrentProject =
async (): Promise<Task[]> => {

  if (!selectedProject) {
    return [];
  }

  const response =
    await getProjectTasksApi(
      selectedProject.id
    );


  const updatedTasks =
    mapTasks(response.data);


  setTasks(updatedTasks);


  return updatedTasks;
};


  const filteredTasks = tasks.filter((task) => {

  const keyword =
    search.toLowerCase();

  return (

    task.title
      .toLowerCase()
      .includes(keyword)

    ||

    task.description
      .toLowerCase()
      .includes(keyword)

  );

});

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

  const handleSaveTask = async () => {

    if (!selectedTask || !selectedProject) {
      return;
    }

    try{
      // CREATE
      if(drawerMode==="create"){

        if(!selectedProject)
          return;

        if (
          selectedTask.title.trim().length < 3
        ) {
          alert("Task title must be at least 3 characters.");
          return;
        }

        const response =
          await createTaskApi({
            title:selectedTask.title,
            description:
              selectedTask.description,
            status:
              selectedTask.status,

            priority:
              selectedTask.priority,

            dueDate:
              selectedTask.dueDate || undefined,
            progress:
              selectedTask.progress,
            reviewStatus:
              selectedTask.reviewStatus,

            projectId:
              selectedProject.id,

            assigneeId:
              selectedTask.assignee.id || undefined,

          });



        setTasks(prev=>[
          ...prev,
          mapTask(response.data)
        ]);
        await refreshProjectStats(selectedProject.id);

      }



      // UPDATE
      else{


        const response =
          await updateTaskApi(

            selectedTask.id,

            {

              title:
                selectedTask.title,


              description:
                selectedTask.description,


              status:
                selectedTask.status,


              priority:
                selectedTask.priority,


              dueDate:
                selectedTask.dueDate,


              progress:
                selectedTask.progress,


              reviewStatus:
                selectedTask.reviewStatus,


              assigneeId:
                selectedTask.assignee.id

            }

          );

        setTasks(prev=>
          prev.map(task=>
            task.id===selectedTask.id
            ?
            mapTask(response.data)
            :
            task
          )
        );
        await refreshProjectStats(selectedProject.id);


      }



      setDrawerOpen(false);



    }
    catch(error){

      console.log(
        "Task save error",
        error
      );

    }

  };

  /**
   * ------------------------------------------------------------------
   * Delete Task
   * ------------------------------------------------------------------
   */

  const handleDeleteTask = async()=>{
   if(!selectedTask)
    return;

   try{
     await deleteTaskApi(
      selectedTask.id
     );
     setTasks(prev=>
      prev.filter(
        task=>
        task.id!==selectedTask.id
      )
     );
     if (selectedProject) { await refreshProjectStats(selectedProject.id); }
     setDrawerOpen(false);
   }
   catch(error){
    console.log(
      error
    );
   }
  };

  // Drag End

  const handleDragEnd = async(
     event:DragEndEvent
    )=>{
     const {
      active,
      over
     } = event;
     if(!over)
      return;
     const taskId =
     String(active.id);

     const newStatus =
     over.id as TaskType;

     const oldTask =
     tasks.find(
      t=>t.id===taskId
     );
   
     if(!oldTask)
      return;

    if (!selectedProject)
    return;
    
     try{
   
     await updateTaskApi(
    
      taskId,
    
      {
        status:newStatus
      }
    
     );
   
     setTasks(prev=>  
     prev.map(task=>
     task.id===taskId
     ?
     {
      ...task,
      status:newStatus
     }
     :task
     )
     );
     await refreshProjectStats(selectedProject.id);
     }
     catch(error){ 
     console.log(
      "Status update failed",
      error
     );
   
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
        <ProjectHeader
          projects={projects}
          selectedProject={selectedProject}
          search={search}
          onSearchChange={setSearch}
          onCreateProject={() => {
            setProjectDrawerMode(
              "create"
            );
            setProjectDrawerOpen(true);
          }}
          onEditProject={() => {
            setProjectDrawerMode(
              "edit"
            );
            setProjectDrawerOpen(true);
          }}
          onDeleteProject={
            handleDeleteProject
          }
          onProjectChange={(projectId)=>{
            const project =
              projects.find(
                p=>p.id===projectId
              );
            if(project){
              setSelectedProject(
                project
              );
            }
          }}
        />

        <div
          className="
          flex-1
          overflow-hidden
        "
        >
          <KanbanBoard
            tasks={filteredTasks}
            onAddTask={handleAddTask}
            onTaskClick={handleTaskClick}
            canCreateTask={
              selectedProject?.owner.id ===
              user?.id
            }
          />
        </div>

        {/* Floating Add Button */}

        <button
        onClick={() => {
          if (!isOwner) return;
          handleAddTask("todo");
        }}
        disabled={!isOwner}
        title={
          isOwner
            ? "Create Task"
            : "Only the project owner can create tasks"
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
          ${
            isOwner
              ? "bg-[#0052cc] hover:scale-105"
              : "bg-slate-400 cursor-not-allowed"
          }
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
          refreshTasks={refreshCurrentProject}
        />

        <ProjectDrawer
        open={projectDrawerOpen}
        mode={projectDrawerMode}
        initialName={
          projectDrawerMode === "edit"
            ? selectedProject?.name
            : ""
        }
        initialDescription={
          projectDrawerMode === "edit"
            ? selectedProject?.description ?? ""
            : ""
        }

          onClose={()=>{
            setProjectDrawerOpen(false);
          
            searchParams.delete("new");
          
            setSearchParams(searchParams);
          }}
        
          onSave={handleSaveProject}
        
          onDelete={
            projectDrawerMode === "edit"
              ? handleDeleteProject
              : undefined
          }
      />
      </div>
    </DndContext>
  );
}

export default Projects;