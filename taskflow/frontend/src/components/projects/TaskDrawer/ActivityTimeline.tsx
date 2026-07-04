import { ArrowRightLeft } from "lucide-react";

interface Activity {
  id: number;
  type: "system" | "comment";
  user?: string;
  avatar?: string;
  text: string;
  time: string;
}

interface Props {
  activities: Activity[];
}

function ActivityTimeline({ activities }: Props) {
  return (
    <div>

      <div className="mb-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <ArrowRightLeft
          size={16}
          className="text-slate-400"
        />
        <h3 className="text-sm font-semibold text-slate-700">
          Activity Timeline
        </h3>
      </div>

      <div className="relative space-y-6 border-l-2 border-slate-100 pl-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative"
          >
            {activity.type === "system" ? (
              <>

                <div className="absolute -left-[35px] flex h-5 w-5 items-center justify-center rounded-full border border-blue-200 bg-blue-50">

                  <ArrowRightLeft
                    size={10}
                    className="text-[#0052cc]"
                  />

                </div>

                <p className="text-sm text-slate-700">
                  {activity.text}
                </p>

                <span className="mt-1 block text-xs text-slate-400">
                  {activity.time}
                </span>

              </>
            ) : (
              <>

                <img
                  src={activity.avatar}
                  className="absolute -left-[40px] h-6 w-6 rounded-full border border-white"
                />

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">

                  <div className="mb-1 flex justify-between">

                    <span className="text-xs font-semibold">
                      {activity.user}
                    </span>

                    <span className="text-[10px] text-slate-400">
                      {activity.time}
                    </span>

                  </div>

                  <p className="text-xs leading-5 text-slate-600">
                    {activity.text}
                  </p>

                </div>

              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;