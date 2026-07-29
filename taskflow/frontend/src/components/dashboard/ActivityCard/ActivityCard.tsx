import {ArrowRightLeft, MessageSquare} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { getAvatarUrl } from "@/lib/image";
import type { Activity } from "@/interfaces/dashboard";

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({
  activity,
}: ActivityCardProps) {

  const isComment =
    activity.type === "comment";

  return (

    <div className="flex items-start gap-3">

      <img
        src={getAvatarUrl(activity.avatar ?? undefined)}
        alt={activity.user}
        className="h-8 w-8 rounded-full object-cover"
      />

      <div className="flex-1">

        <div className="flex items-center gap-2">

          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              isComment
                ? "bg-emerald-50 text-emerald-600"
                : "bg-blue-50 text-[#0052cc]"
            }`}
          >
            {isComment
              ? <MessageSquare size={12}/>
              : <ArrowRightLeft size={12}/>}
          </div>

          <p className="text-sm">

            <span className="font-semibold">
              {activity.user}
            </span>

            {" "}
            {activity.message}

          </p>

        </div>

        <p className="mt-1 text-xs text-slate-400">

          {activity.project}

          {" • "}

          {formatDistanceToNow(
            new Date(activity.createdAt),
            {
              addSuffix:true,
            }
          )}
        </p>
      </div>
    </div>
  );
}

export default ActivityCard;