import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskInfoGrid from "./TaskInfoGrid";
import Attachments from "./Attachments";
import ActivityTimeline from "./ActivityTimeline";
import CommentBox from "./CommentBox";

import type {
  DrawerMode,
  Task,
} from "@/interfaces/projects";


interface Props {

  open: boolean;

  onClose: () => void;

  mode: DrawerMode;

  task: Task | null;

  onChangeTask: (
    updatedTask: Task
  ) => void;

}



function TaskDrawer({
  open,
  onClose,
  mode,
  task,
  onChangeTask,

}: Props) {


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
            ?
            "NEW TASK"
            :
            `TASK-${task.id}`
          }

          onClose={onClose}

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

              title={task.title}

              description={task.description}

              onChange={
                handleChange
              }

            />




            <TaskInfoGrid

              task={task}

              onChange={
                handleChange
              }

            />





            <Attachments

              attachments={
                task.attachments ?? []
              }

            />





            <ActivityTimeline

              activities={
                task.activities ?? []
              }

            />



          </div>


        </div>





        <CommentBox

          userAvatar={
            task.assignee?.avatar
          }

        />



      </aside>



    </>

  );

}


export default TaskDrawer;