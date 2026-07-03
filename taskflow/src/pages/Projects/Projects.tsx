import { Plus } from "lucide-react";

import { ProjectHeader, KanbanBoard } from "../../components";

function Projects() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col bg-white">
      <ProjectHeader />
      <KanbanBoard />

      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-lg hover:bg-[#0043a4]"
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default Projects;