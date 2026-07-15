import KanbanColumn from "../KanbanColumn/KanbanColumn";
import {todoTasks, inProgressTasks, reviewTasks, completedTasks} from "../../../data/projectsData";
import type {KanbanBoardProps} from "../../../interfaces/projectProps";

function KanbanBoard({
  onAddTask,
}: KanbanBoardProps) {
  return (
    <div className="h-full overflow-x-auto overflow-y-hidden">
      <div className="flex min-w-max gap-5 px-4 py-6 md:px-8">

        <KanbanColumn
          title="Todo"
          tasks={todoTasks}
          type="todo"
          onAddTask={onAddTask}
        />

        <KanbanColumn
          title="In Progress"
          tasks={inProgressTasks}
          type="progress"
          onAddTask={onAddTask}
        />

        <KanbanColumn
          title="Review"
          tasks={reviewTasks}
          type="review"
          onAddTask={onAddTask}
        />

        <KanbanColumn
          title="Completed"
          tasks={completedTasks}
          type="completed"
          onAddTask={onAddTask}
        />

      </div>
    </div>
  );
}

export default KanbanBoard;