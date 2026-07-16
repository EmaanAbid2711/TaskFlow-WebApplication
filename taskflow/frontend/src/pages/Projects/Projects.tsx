import {useState} from "react";
import {Plus} from "lucide-react";

import {ProjectHeader, KanbanBoard, TaskDrawer} from "@/components";
import type {DrawerMode, Task, TaskType} from "@/interfaces/projects";
import {todoTasks, inProgressTasks, reviewTasks, completedTasks} from "@/data/projectsData";

function Projects() {

const [drawerOpen, setDrawerOpen]=useState(false);

const [ drawerMode, setDrawerMode]=useState<DrawerMode>("create");

const [ selectedTask, setSelectedTask]=useState<Task | null>(null);

const [tasks, setTasks] = useState<Task[]>([
  ...todoTasks,
  ...inProgressTasks,
  ...reviewTasks,
  ...completedTasks,
]);

const createEmptyTask = (
status: TaskType
): Task => ({

id:0,
title:"",
description:"",
status,
priority:"Medium",
dueDate:"",
assignee:{
id:"",
name:"",
avatar:""
},
attachments:[],
activities:[]
});


const handleAddTask = (
status: TaskType
)=>{

setDrawerMode(
"create"
);

setSelectedTask(
createEmptyTask(status)
);

setDrawerOpen(true);
};

const handleTaskClick = (
task: Task
)=>{

setDrawerMode(
"edit"
);

setSelectedTask(
task
);

setDrawerOpen(true);
};


const handleTaskChange = (
updatedTask: Task
)=>{
setSelectedTask(
updatedTask
);

};

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


return (


<div className="
flex min-h-screen
flex-1 flex-col
bg-slate-50
">
<ProjectHeader />

<div className="
flex-1 overflow-hidden
">

<KanbanBoard
tasks={tasks}
onAddTask={
handleAddTask
}

onTaskClick={
handleTaskClick
}
/>

</div>

{/* Floating Add Button */}
<button
onClick={()=>
handleAddTask(
"todo"
)

}


className={`
fixed bottom-5 right-5
z-40 flex h-14 w-14
items-center justify-center
rounded-xl bg-[#0052cc]
text-white shadow-lg
transition-all
hover:scale-105
md:bottom-8 md:right-8

${
drawerOpen
?
"pointer-events-none opacity-0"
:
""
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
  onClose={() => setDrawerOpen(false)}
  mode={drawerMode}
  task={selectedTask}
  onChangeTask={handleTaskChange}
  onSave={handleSaveTask}
  onDelete={handleDeleteTask}
/>

</div>
);
}

export default Projects;