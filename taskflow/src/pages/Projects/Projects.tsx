import {ProjectHeader, KanbanBoard} from "../../components";

function Projects() {
  return (
      <div className="flex flex-1 flex-col bg-white min-h-screen">
        <ProjectHeader />
        <KanbanBoard />
      </div>
  );
}

export default Projects;