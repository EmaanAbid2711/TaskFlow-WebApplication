import type { Deadline } from "../../../interfaces/dashboard";
import { useNavigate } from "react-router-dom";

interface DeadlineCardProps {
  deadline: Deadline;
}

function DeadlineCard({
  deadline,
}: DeadlineCardProps) {
  const navigate = useNavigate();

  const getBadgeClasses = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-50 text-red-600";

      case "orange":
        return "bg-orange-50 text-orange-600";

      case "green":
        return "bg-emerald-50 text-emerald-600";

      case "gray":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    
    <button
      onClick={() =>
        navigate(
          `/projects?project=${deadline.projectId}&task=${deadline.id}`
        )
      }
      className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-[#0052cc]/30 hover:shadow-sm"
    >
      <span
        className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold ${getBadgeClasses(
          deadline.badgeColor
        )}`}
      >
        {deadline.due}
      </span>

      <h3 className="mt-3 text-sm font-semibold text-slate-900">
        {deadline.title}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {deadline.project}
      </p>
    </button>
  );
}

export default DeadlineCard;