import type { ProjectProgress } from "../../../interfaces/dashboard";

interface ProgressCardProps {
  project: ProjectProgress;
}

function ProgressCard({
  project,
}: ProgressCardProps) {
  return (
    <div>
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
  );
}

export default ProgressCard;