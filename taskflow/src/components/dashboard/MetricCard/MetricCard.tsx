import {Folder, ClipboardList, CheckCircle2, Clock} from "lucide-react";

import type { Metric } from "../../../interfaces/dashboard";

interface MetricCardProps {
  metric: Metric;
}

function MetricCard({ metric }: MetricCardProps) {
  const getIcon = () => {
    switch (metric.icon) {
      case "folder":
        return <Folder size={20} />;

      case "clipboard":
        return <ClipboardList size={20} />;

      case "check":
        return <CheckCircle2 size={20} />;

      case "clock":
        return <Clock size={20} />;

      default:
        return <Folder size={20} />;
    }
  };

  const getIconBackground = () => {
    switch (metric.icon) {
      case "folder":
        return "bg-blue-50 text-[#0052cc]";

      case "clipboard":
        return "bg-slate-100 text-slate-600";

      case "check":
        return "bg-emerald-50 text-emerald-600";

      case "clock":
        return "bg-orange-50 text-orange-600";

      default:
        return "bg-blue-50 text-[#0052cc]";
    }
  };

  const getBadgeColor = () => {
    switch (metric.badgeColor) {
      case "green":
        return "bg-emerald-50 text-emerald-600";

      case "orange":
        return "bg-orange-50 text-orange-600";

      case "red":
        return "bg-red-50 text-red-600";

      case "gray":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${getIconBackground()}`}
        >
          {getIcon()}
        </div>
        <span
          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${getBadgeColor()}`}
        >
          {metric.badge}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-slate-500">
          {metric.title}
        </p>
        <h3 className="mt-1 text-3xl font-bold text-slate-900">
          {metric.value}
        </h3>
      </div>

    </div>
  );
}

export default MetricCard;