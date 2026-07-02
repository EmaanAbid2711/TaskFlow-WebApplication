import {FileText, CheckCircle2, UserPlus} from "lucide-react";

import type { Activity } from "../../../interfaces/dashboard";

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({
  activity,
}: ActivityCardProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "file":
        return <FileText size={16} />;

      case "check":
        return <CheckCircle2 size={16} />;

      case "user":
        return <UserPlus size={16} />;

      default:
        return <FileText size={16} />;
    }
  };

  const getIconClasses = (icon: string) => {
    switch (icon) {
      case "file":
        return "bg-blue-50 text-[#0052cc]";

      case "check":
        return "bg-emerald-50 text-emerald-600";

      case "user":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-blue-50 text-[#0052cc]";
    }
  };

  return (
    <div className="flex items-start gap-3">

      {/* Icon */}
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${getIconClasses(
          activity.icon
        )}`}
      >
        {getIcon(activity.icon)}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">
            {activity.user}
          </span>{" "}
          {activity.action}{" "}
          <span className="font-medium text-[#0052cc]">
            {activity.project}
          </span>
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {activity.time}
        </p>
      </div>

    </div>
  );
}

export default ActivityCard;