import KanbanColumn from "../KanbanColumn/KanbanColumn";

import {todoTasks, inProgressTasks, reviewTasks, completedTasks} from "../../../data/projectsData";

function KanbanBoard() {
  return (
    <div className="h-full overflow-x-auto overflow-y-hidden">
      <div className="flex min-w-max gap-5 px-4 py-6 md:px-8">

        <KanbanColumn
          title="Todo"
          tasks={todoTasks}
          type="todo"
        />

        <KanbanColumn
          title="In Progress"
          tasks={inProgressTasks}
          type="progress"
        />

        <KanbanColumn
          title="Review"
          tasks={reviewTasks}
          type="review"
        />

        <KanbanColumn
          title="Completed"
          tasks={completedTasks}
          type="completed"
        />

      </div>
    </div>
  );
}

export default KanbanBoard;