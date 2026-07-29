import { ArrowRightLeft, MessageSquare} from "lucide-react";
import { formatDistanceToNow} from "date-fns";
import {useNavigate} from "react-router-dom";

import type { ActivityItem as ActivityType} from "@/interfaces/activity";
import { getAvatarUrl } from "@/lib/image";

interface Props {
  activity: ActivityType;
}

function ActivityItem({
  activity
}:Props){

  const navigate = useNavigate();

  const isComment =
    activity.type === "comment";

  const openActivity = () => {
    navigate(
      `/projects?project=${activity.project.id}&task=${activity.task.id}`
    );
  };
  return (
    <button
      onClick={openActivity}
      className="
      w-full
      text-left
      rounded-xl
      border
      bg-white
      p-5
      hover:bg-slate-50
      transition
      "
    >
      <div className="flex gap-4">
        <img  src={getAvatarUrl(activity.user.avatar ?? undefined)}
          className="
          h-10
          w-10
          rounded-full
          object-cover
          "
          alt={
            activity.user.name
          }
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              ${
                isComment
                ?
                "bg-emerald-50 text-emerald-600"
                :
                "bg-blue-50 text-[#0052cc]"
              }

              `}
            >
              {
                isComment
                ?
                <MessageSquare size={14}/>
                :
                <ArrowRightLeft size={14}/>
              }
            </div>
            <p className="text-sm">
              <span className="font-semibold">
                {
                  activity.user.name
                }
              </span>
              {" "}
              {
                activity.message
              }
            </p>
          </div>
          <p
            className="
            mt-2
            text-xs
            text-slate-400
            "
          >
            {
              activity.project.name
            }
            {" • "}
            {
              activity.task.title
            }
            {" • "}
            {
              formatDistanceToNow(
                new Date(
                  activity.createdAt
                ),
                {
                  addSuffix:true
                }
              )
            }
          </p>
        </div>
      </div>
    </button>
  );
}
export default ActivityItem;