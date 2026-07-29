import { ArrowRightLeft, MessageSquare} from "lucide-react";
import { formatDistanceToNow} from "date-fns";

import { getAvatarUrl} from "@/lib/image";

import type {
  ActivityItem as Activity,
} from "@/interfaces/activity";

interface Props {
  activity: Activity;
}

function ActivityItem({
  activity,
}: Props) {

  const isComment =
    activity.type === "comment";

  return (

    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex gap-4">

        <img
          src={getAvatarUrl(
            activity.user.avatar ?? undefined
          )}
          alt={activity.user.name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                isComment
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-blue-50 text-[#0052cc]"
              }`}
            >

              {isComment
                ? (
                  <MessageSquare
                    size={14}
                  />
                )
                : (
                  <ArrowRightLeft
                    size={14}
                  />
                )}

            </div>

            <span className="font-semibold">

              {activity.user.name}

            </span>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-700">

            {activity.message}

          </p>

          <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-500">

            <span>

              📁 {activity.project.name}

            </span>

            <span>

              📝 {activity.task.title}

            </span>

            <span>

              {formatDistanceToNow(
                new Date(
                  activity.createdAt
                ),
                {
                  addSuffix:true,
                }
              )}

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ActivityItem;