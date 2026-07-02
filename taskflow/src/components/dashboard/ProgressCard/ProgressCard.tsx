import type { ProjectProgress } from "../../../interfaces/dashboard";

interface ProgressCardProps {
  projects: ProjectProgress[];
}

function ProgressCard({ projects }: ProgressCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Heading */}
      <h2 className="mb-5 text-sm font-semibold text-slate-900">
        Project Progress
      </h2>

      {/* Progress List */}
      <div className="space-y-5">
        {projects.map((project) => (
          <div key={project.id}>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {project.name}
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${project.progress}%`,
                  backgroundColor: project.color,
                }}
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default ProgressCard;