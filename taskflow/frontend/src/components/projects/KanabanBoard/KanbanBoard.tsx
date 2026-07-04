import KanbanColumn from "../KanbanColumn/KanbanColumn";
import {todoTasks, inProgressTasks, reviewTasks, completedTasks} from "../../../data/projectsData";

function KanbanBoard() {
  return (
    <div className="flex gap-5 overflow-x-auto px-8 py-6">

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
  );
}

export default KanbanBoard;