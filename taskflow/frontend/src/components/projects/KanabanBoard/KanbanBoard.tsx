import KanbanColumn from "../KanbanColumn/KanbanColumn";
import type { KanbanBoardProps } from "@/interfaces/projectProps";

function KanbanBoard({
  tasks,
  onAddTask,
  onTaskClick,
}: KanbanBoardProps) {
  return (
    <div className="h-full overflow-x-auto overflow-y-hidden">
      <div className="flex min-w-max gap-5 px-4 py-6 md:px-8">
        <KanbanColumn
          title="Todo"
          type="todo"
          tasks={tasks.filter(
            (task) => task.status === "todo"
          )}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
        />

        <KanbanColumn
          title="In Progress"
          type="progress"
          tasks={tasks.filter(
            (task) => task.status === "progress"
          )}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
        />

        <KanbanColumn
          title="Review"
          type="review"
          tasks={tasks.filter(
            (task) => task.status === "review"
          )}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
        />

        <KanbanColumn
          title="Completed"
          type="completed"
          tasks={tasks.filter(
            (task) => task.status === "completed"
          )}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
        />
      </div>
    </div>
  );
}

export default KanbanBoard;